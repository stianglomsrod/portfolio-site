// === REUSABLE ENGINE — WorldScene: renders any MapDef, drives play ===
import Phaser from "phaser";
import type { GameBridge } from "../bridge";
import type { GameRuntime } from "../runtime";
import { buildSolidGrid, tileCenter, validateMap } from "../systems/grid";
import type { ContentPack, Dir, Interactable, MapDef, Npc } from "../types";

interface WorldData {
  mapId: string;
  spawn: string;
  autostart?: boolean;
}

type Target =
  | { kind: "interactable"; data: Interactable; x: number; y: number }
  | { kind: "npc"; data: Npc; x: number; y: number };

const SPEED = 116;
const IDLE_FRAME: Record<Dir, number> = { down: 0, left: 3, right: 6, up: 9 };

export class WorldScene extends Phaser.Scene {
  private runtime!: GameRuntime;
  private pack!: ContentPack;
  private bridge!: GameBridge;
  private map!: MapDef;
  private size = 32;

  private player!: Phaser.Physics.Arcade.Sprite;
  private shadow!: Phaser.GameObjects.Ellipse;
  private facing: Dir = "down";
  private solids!: Phaser.Physics.Arcade.StaticGroup;
  private targets: Target[] = [];
  private current: Target | null = null;
  private lastPromptId: string | null = null;

  private paused = true;
  private started = false;
  private transitioning = false;
  private cueFired = false;
  private reducedMotion = false;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<
    "up" | "down" | "left" | "right",
    Phaser.Input.Keyboard.Key
  >;
  private interactKey!: Phaser.Input.Keyboard.Key;
  private unsub: Array<() => void> = [];

  constructor() {
    super("WorldScene");
  }

  init(): void {
    this.transitioning = false;
    this.cueFired = false;
    this.started = false;
    this.targets = [];
    this.current = null;
    this.lastPromptId = null;
  }

  create(data: WorldData): void {
    this.runtime = this.registry.get("runtime") as GameRuntime;
    this.pack = this.registry.get("pack") as ContentPack;
    this.bridge = this.registry.get("bridge") as GameBridge;
    this.reducedMotion = !!this.registry.get("reducedMotion");

    const map = this.pack.maps.find((m) => m.id === data.mapId);
    if (!map) return;
    this.map = map;
    this.size = map.tileSize;
    this.runtime.setMap(map.id);

    if (process.env.NODE_ENV !== "production") {
      const issues = validateMap(map, this.pack);
      if (issues.length)
        console.warn("[skamlos-rpg] map issues:\n" + issues.join("\n"));
    }

    const worldW = map.width * this.size;
    const worldH = map.height * this.size;
    this.physics.world.setBounds(0, 0, worldW, worldH);
    this.cameras.main.setBounds(0, 0, worldW, worldH);
    this.cameras.main.setBackgroundColor(map.bg);

    this.renderGround();
    this.renderDecor();
    this.renderBuildings();
    this.renderDecoSprites();
    this.buildCollision();
    this.renderLabels();
    this.spawnInteractables();
    this.spawnNpcs();
    this.spawnPlayer(data.spawn);
    this.setupExits();
    this.setupInput();
    this.registerBridge();

    this.cameras.main.fadeIn(220);

    const phase = this.registry.get("phase") as string | undefined;
    if (data.autostart || phase === "playing") {
      this.beginPlay();
    } else {
      this.paused = true;
      if (this.input.keyboard) this.input.keyboard.enabled = false;
    }

    this.runtime.pushState();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.cleanup());
  }

  /* ---------- rendering ---------- */

  private resolveTile(ch: string): string | undefined {
    if (!ch || ch === " ") return undefined;
    return this.map.legend[ch];
  }

  private renderGround(): void {
    const s = this.size;
    for (let y = 0; y < this.map.height; y++) {
      const row = this.map.ground[y] ?? "";
      for (let x = 0; x < this.map.width; x++) {
        const tileId = this.resolveTile(row[x]);
        if (!tileId) continue;
        const spec = this.pack.tiles[tileId];
        if (!spec) continue;
        const img = this.add.image(x * s + s / 2, y * s + s / 2, spec.asset);
        img.setDepth(-1000);
      }
    }
  }

  private renderDecor(): void {
    const s = this.size;
    if (!this.map.decor) return;
    for (let y = 0; y < this.map.height; y++) {
      const row = this.map.decor[y] ?? "";
      for (let x = 0; x < this.map.width; x++) {
        const tileId = this.resolveTile(row[x]);
        if (!tileId) continue;
        const spec = this.pack.tiles[tileId];
        if (!spec) continue;
        if (spec.tall) {
          const img = this.add.image(x * s + s / 2, (y + 1) * s, spec.asset);
          img.setOrigin(0.5, 1);
          img.setDepth((y + 1) * s);
        } else if (spec.solid) {
          const img = this.add.image(x * s + s / 2, y * s + s / 2, spec.asset);
          img.setDepth(y * s + s / 2);
        } else {
          const img = this.add.image(x * s + s / 2, y * s + s / 2, spec.asset);
          img.setDepth(-500);
        }
      }
    }
  }

  private renderBuildings(): void {
    const s = this.size;
    for (const b of this.map.buildings ?? []) {
      const img = this.add.image(b.x * s, b.y * s, b.textureKey);
      img.setOrigin(0, 0);
      img.setDepth((b.y + b.hTiles) * s - 2);
    }
  }

  private renderDecoSprites(): void {
    const s = this.size;
    for (const d of this.map.decoSprites ?? []) {
      if (!this.textures.exists(d.key)) continue;
      const sprite = this.add.sprite(
        d.x * s + s / 2,
        d.tall ? (d.y + 1) * s : d.y * s + s / 2,
        d.key,
        0,
      );
      sprite.setOrigin(0.5, d.tall ? 1 : 0.5);
      sprite.setDepth(d.tall ? (d.y + 1) * s : d.y * s + s / 2);
      if (d.anim && this.anims.exists(d.anim)) sprite.anims.play(d.anim);
    }
  }

  private renderLabels(): void {
    const s = this.size;
    const lang = this.runtime.state.lang;
    const labels = [...(this.map.labels ?? [])];
    for (const b of this.map.buildings ?? []) {
      if (b.label)
        labels.push({ text: b.label, x: b.x + b.wTiles / 2, y: b.y - 0.4 });
    }
    for (const l of labels) {
      const text =
        typeof l.text === "string" ? l.text : (l.text[lang] ?? l.text.no);
      const t = this.add.text(l.x * s, l.y * s, text, {
        fontFamily: "monospace",
        fontSize: l.small ? "11px" : "13px",
        color: "#fdf6e8",
        fontStyle: "bold",
      });
      t.setOrigin(0.5, 0.5);
      t.setResolution(3);
      t.setStroke("#2b2018", 4);
      t.setShadow(0, 1, "#00000066", 2);
      t.setDepth(50_000);
    }
  }

  private buildCollision(): void {
    const grid = buildSolidGrid(this.map, this.pack);
    this.solids = this.physics.add.staticGroup();
    const s = this.size;
    for (let y = 0; y < this.map.height; y++) {
      for (let x = 0; x < this.map.width; x++) {
        if (!grid[y][x]) continue;
        const cell = this.add.rectangle(
          x * s + s / 2,
          y * s + s / 2,
          s,
          s,
          0x000000,
          0,
        );
        this.physics.add.existing(cell, true);
        this.solids.add(cell);
      }
    }
  }

  /* ---------- actors ---------- */

  private spawnPlayer(spawnId: string): void {
    const spawn = this.map.spawns[spawnId] ??
      this.runtime.state.player ?? { x: 2, y: 2 };
    const c = tileCenter(spawn.x, spawn.y, this.size);
    const key = this.pack.meta.theme.playerSpriteKey;

    this.shadow = this.add.ellipse(c.x, c.y + 10, 20, 8, 0x000000, 0.22);
    this.shadow.setDepth(c.y - 1);

    this.player = this.physics.add.sprite(c.x, c.y, key, IDLE_FRAME.down);
    this.player.setDepth(c.y);
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setSize(15, 12);
    body.setOffset(8.5, 18);
    this.player.setCollideWorldBounds(true);
    this.facing = this.runtime.state.facing ?? "down";
    this.player.setFrame(IDLE_FRAME[this.facing]);

    this.physics.add.collider(this.player, this.solids);
    this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
    this.cameras.main.setDeadzone(this.size * 3, this.size * 2.2);
  }

  private spawnInteractables(): void {
    const s = this.size;
    for (const id of this.map.interactables) {
      const data = this.pack.interactables.find((i) => i.id === id);
      if (!data) continue;
      if (data.showWhen && !this.runtime.met(data.showWhen)) continue;
      const c = tileCenter(data.position.x, data.position.y, s);
      if (data.spriteKey && this.textures.exists(data.spriteKey)) {
        const img = this.add.image(
          c.x,
          data.tall ? (data.position.y + 1) * s : c.y,
          data.spriteKey,
        );
        img.setOrigin(0.5, data.tall ? 1 : 0.5);
        img.setDepth(data.tall ? (data.position.y + 1) * s : c.y);
      }
      this.targets.push({ kind: "interactable", data, x: c.x, y: c.y });
    }
  }

  private spawnNpcs(): void {
    const s = this.size;
    for (const id of this.map.npcs) {
      const data = this.pack.npcs.find((n) => n.id === id);
      if (!data) continue;
      if (data.showWhen && !this.runtime.met(data.showWhen)) continue;
      const c = tileCenter(data.position.x, data.position.y, s);
      const sprite = this.add.sprite(c.x, c.y, data.spriteKey, 0);
      sprite.setDepth(c.y);
      this.targets.push({ kind: "npc", data, x: c.x, y: c.y });
    }
  }

  /* ---------- exits & gates ---------- */

  private setupExits(): void {
    const s = this.size;
    for (const exit of this.map.exits) {
      const zone = this.add.zone(
        exit.at.x * s,
        exit.at.y * s,
        exit.at.w * s,
        exit.at.h * s,
      );
      zone.setOrigin(0, 0);
      this.physics.add.existing(zone, true);
      this.physics.add.overlap(this.player, zone, () => this.tryExit(exit.id));
    }
  }

  private tryExit(exitId: string): void {
    if (this.paused || this.transitioning) return;
    const exit = this.map.exits.find((e) => e.id === exitId);
    if (!exit) return;

    // The classroom bell rings if the player heads for the door early.
    this.ensureCueFired();

    const blocked = this.runtime.evaluateGate(exit.lock);
    if (blocked) {
      this.emitLocked(blocked.lockedText);
      return;
    }
    this.doTransition(exit.to.map, exit.to.spawn);
  }

  private lockedAt = 0;
  private emitLocked(text: { no: string; en?: string }): void {
    const now = this.time.now;
    if (now - this.lockedAt < 1400) return;
    this.lockedAt = now;
    this.bridge.emit("subtitle", text);
    if (!this.reducedMotion) this.cameras.main.shake(120, 0.004);
  }

  private doTransition(mapId: string, spawn: string): void {
    this.transitioning = true;
    this.player.setVelocity(0, 0);
    this.runtime.setPlayer(0, 0, this.facing);
    this.cameras.main.fadeOut(200);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.runtime.setMap(mapId);
        this.scene.restart({ mapId, spawn, autostart: true });
      },
    );
  }

  /* ---------- input & bridge ---------- */

  private setupInput(): void {
    const kb = this.input.keyboard!;
    this.cursors = kb.createCursorKeys();
    this.wasd = {
      up: kb.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: kb.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: kb.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: kb.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
    this.interactKey = kb.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    kb.addCapture([
      Phaser.Input.Keyboard.KeyCodes.UP,
      Phaser.Input.Keyboard.KeyCodes.DOWN,
      Phaser.Input.Keyboard.KeyCodes.LEFT,
      Phaser.Input.Keyboard.KeyCodes.RIGHT,
      Phaser.Input.Keyboard.KeyCodes.SPACE,
      Phaser.Input.Keyboard.KeyCodes.E,
    ]);
    kb.on("keydown-SPACE", () => this.tryInteract());
    kb.on("keydown-E", () => this.tryInteract());
  }

  private registerBridge(): void {
    const pauseEvents = ["dialogue", "openMinigame"] as const;
    const resumeEvents = ["cmd:closeDialogue", "closeMinigame"] as const;
    for (const ev of pauseEvents)
      this.unsub.push(this.bridge.on(ev, () => this.pause()));
    for (const ev of resumeEvents)
      this.unsub.push(this.bridge.on(ev, () => this.resume()));
    this.unsub.push(this.bridge.on("cmd:pause", () => this.pause()));
    this.unsub.push(this.bridge.on("cmd:resume", () => this.resume()));
    this.unsub.push(this.bridge.on("cmd:start", () => this.beginPlay()));
    this.unsub.push(this.bridge.on("cmd:interact", () => this.tryInteract()));
  }

  private cleanup(): void {
    this.unsub.forEach((fn) => fn());
    this.unsub = [];
    this.input.keyboard?.removeAllListeners();
  }

  /* ---------- play lifecycle ---------- */

  private beginPlay(): void {
    if (this.started) {
      this.resume();
      return;
    }
    this.started = true;
    this.paused = false;
    if (this.input.keyboard) this.input.keyboard.enabled = true;
    this.registry.set("phase", "playing");

    const ambientSeen = `seen:ambient:${this.map.id}`;
    if (this.map.ambient && !this.runtime.state.flags[ambientSeen]) {
      this.runtime.setFlag(ambientSeen, true);
      this.bridge.emit("subtitle", this.map.ambient);
    }
    this.runtime.pushObjective();
    this.scheduleCue();
  }

  private pause(): void {
    this.paused = true;
    if (this.player?.body) this.player.setVelocity(0, 0);
    if (this.input.keyboard) this.input.keyboard.enabled = false;
    this.setPrompt(null);
  }

  private resume(): void {
    if (!this.started) return;
    this.paused = false;
    if (this.input.keyboard) this.input.keyboard.enabled = true;
  }

  /* ---------- the timed cue (school bell) ---------- */

  private scheduleCue(): void {
    const cue = this.map.cue;
    if (!cue) return;
    const seen = `seen:cue:${this.map.id}`;
    if (this.runtime.state.flags[seen]) {
      this.cueFired = true;
      return;
    }
    this.time.delayedCall(cue.delayMs, () => this.ensureCueFired());
  }

  private ensureCueFired(): void {
    const cue = this.map.cue;
    if (!cue || this.cueFired) return;
    const seen = `seen:cue:${this.map.id}`;
    if (this.runtime.state.flags[seen]) {
      this.cueFired = true;
      return;
    }
    if (
      cue.whenActiveQuest &&
      this.runtime.activeQuest()?.id !== cue.whenActiveQuest
    ) {
      // The gated quest is no longer active; skip the cue silently.
      this.cueFired = true;
      this.runtime.setFlag(seen, true);
      return;
    }
    this.cueFired = true;
    this.runtime.setFlag(seen, true);
    if (cue.bell) {
      if (!this.reducedMotion) this.cameras.main.flash(260, 255, 244, 214);
      this.bridge.emit("bell");
    }
    if (cue.line) this.bridge.emit("subtitle", cue.line);
    if (cue.completeQuest) this.runtime.completeQuest(cue.completeQuest);
  }

  /* ---------- interaction ---------- */

  private tryInteract(): void {
    if (this.paused || this.transitioning || !this.current) return;
    const target = this.current;
    if (target.kind === "npc") {
      this.runDialogue(target.data.dialogue, target.data.name);
      return;
    }
    this.runAction(target.data);
  }

  private runAction(data: Interactable): void {
    const a = data.action;
    switch (a.type) {
      case "dialogue":
        this.runDialogue(a.tree);
        break;
      case "inspect":
        this.bridge.emit("dialogue", {
          id: `inspect:${data.id}`,
          lines: [{ text: a.text }],
        });
        break;
      case "startMinigame":
        this.bridge.emit("openMinigame", a.minigame);
        break;
      case "completeQuest":
        this.runtime.completeQuest(a.quest);
        break;
      case "startQuest":
        this.runtime.setFlag(`started:${a.quest}`, true);
        break;
      case "signpost": {
        const hint = this.runtime.activeQuest()?.nextHint;
        if (hint)
          this.bridge.emit("dialogue", {
            id: "signpost",
            lines: [{ text: hint }],
          });
        break;
      }
    }
  }

  private runDialogue(
    treeId: string,
    speaker?: { no: string; en?: string },
  ): void {
    const tree = this.pack.dialogue[treeId];
    if (!tree || tree.length === 0) return;
    const lines = speaker ? tree.map((l) => ({ speaker, ...l })) : tree;
    this.bridge.emit("dialogue", { id: treeId, lines });
  }

  private setPrompt(
    id: string | null,
    text?: { no: string; en?: string },
  ): void {
    if (id === this.lastPromptId) return;
    this.lastPromptId = id;
    this.bridge.emit("prompt", id && text ? text : null);
  }

  /* ---------- update loop ---------- */

  update(): void {
    if (!this.player) return;
    if (this.paused || this.transitioning) {
      this.player.setVelocity(0, 0);
      return;
    }

    let vx = 0;
    let vy = 0;
    if (this.cursors.left.isDown || this.wasd.left.isDown) vx -= 1;
    if (this.cursors.right.isDown || this.wasd.right.isDown) vx += 1;
    if (this.cursors.up.isDown || this.wasd.up.isDown) vy -= 1;
    if (this.cursors.down.isDown || this.wasd.down.isDown) vy += 1;

    const moving = vx !== 0 || vy !== 0;
    if (moving) {
      const len = Math.hypot(vx, vy) || 1;
      this.player.setVelocity((vx / len) * SPEED, (vy / len) * SPEED);
      if (vx < 0) this.facing = "left";
      else if (vx > 0) this.facing = "right";
      else if (vy < 0) this.facing = "up";
      else if (vy > 0) this.facing = "down";
      this.player.anims.play(
        `${this.pack.meta.theme.playerSpriteKey}-walk-${this.facing}`,
        true,
      );
    } else {
      this.player.setVelocity(0, 0);
      this.player.anims.stop();
      this.player.setFrame(IDLE_FRAME[this.facing]);
    }

    this.player.setDepth(this.player.y);
    this.shadow.setPosition(this.player.x, this.player.y + 10);
    this.shadow.setDepth(this.player.y - 1);
    this.runtime.setPlayer(
      Math.floor(this.player.x / this.size),
      Math.floor(this.player.y / this.size),
      this.facing,
    );

    this.updateTarget();
  }

  private updateTarget(): void {
    const range = this.size * 1.35;
    let best: Target | null = null;
    let bestDist = range;
    for (const tgt of this.targets) {
      const d = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        tgt.x,
        tgt.y,
      );
      if (d < bestDist) {
        best = tgt;
        bestDist = d;
      }
    }
    this.current = best;
    if (!best) {
      this.setPrompt(null);
      return;
    }
    const prompt =
      best.kind === "npc"
        ? { no: `Snakk med ${best.data.name.no}` }
        : best.data.prompt;
    this.setPrompt(
      best.kind === "npc" ? `npc:${best.data.id}` : best.data.id,
      prompt,
    );
  }
}
