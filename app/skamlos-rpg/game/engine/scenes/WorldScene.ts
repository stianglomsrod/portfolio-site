// === REUSABLE ENGINE — WorldScene: renders any MapDef, drives play ===
import Phaser from "phaser";
import type { CtaPrompt, GameBridge } from "../bridge";
import type { GameRuntime } from "../runtime";
import { buildSolidGrid, tileCenter, validateMap } from "../systems/grid";
import type {
  ContentPack,
  Dir,
  Exit,
  Interactable,
  MapDef,
  Npc,
  QuestGuide,
  Vec2,
} from "../types";

interface WorldData {
  mapId: string;
  spawn: string;
  autostart?: boolean;
}

type Target =
  | { kind: "interactable"; data: Interactable; x: number; y: number }
  | { kind: "npc"; data: Npc; x: number; y: number }
  | { kind: "exit"; data: Exit; x: number; y: number };

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
  private avatar!: Phaser.GameObjects.Image;
  private avatarRing!: Phaser.GameObjects.Arc;
  private avatarBaseScale = 1;
  private bobPhase = 0;
  private facing: Dir = "down";
  private solids!: Phaser.Physics.Arcade.StaticGroup;
  private solidGrid: boolean[][] = [];
  private targets: Target[] = [];
  private current: Target | null = null;
  private lastPromptId: string | null = null;
  private npcSprites: Phaser.GameObjects.Sprite[] = [];
  private wanderers: Phaser.GameObjects.Image[] = [];
  private hints = new Map<Target, Phaser.GameObjects.Text>();

  private guideMarker!: Phaser.GameObjects.Text;
  private edgeArrow!: Phaser.GameObjects.Image;

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
    this.npcSprites = [];
    this.wanderers = [];
    this.hints = new Map();
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
    this.registerExits();
    this.createOverlays();
    this.setupInput();
    this.registerBridge();

    this.cameras.main.fadeIn(220);

    {
      (window as unknown as { __skamlos?: unknown }).__skamlos = {
        scene: this,
        runtime: this.runtime,
        pos: () => ({ x: this.player?.x, y: this.player?.y, tile: this.runtime.state.player }),
        keys: () => ({
          down: this.cursors?.down?.isDown,
          right: this.cursors?.right?.isDown,
          enabled: this.input?.keyboard?.enabled,
          paused: this.paused,
          started: this.started,
        }),
      };
    }

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
        if (spec.anim && this.anims.exists(spec.anim)) {
          const sprite = this.add.sprite(x * s + s / 2, y * s + s / 2, spec.asset, 0);
          sprite.setDepth(-1000);
          if (!this.reducedMotion) sprite.anims.play(spec.anim);
        } else {
          const img = this.add.image(x * s + s / 2, y * s + s / 2, spec.asset);
          img.setDepth(-1000);
        }
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
      const src = this.textures.get(b.textureKey).getSourceImage();
      const baseY = b.y * s + (((src as { height?: number })?.height ?? b.hTiles * s));
      img.setDepth(baseY - 2);
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
    const draw = (
      text: string,
      px: number,
      py: number,
      small: boolean,
    ) => {
      const t = this.add.text(px, py, text, {
        fontFamily: "monospace",
        fontSize: small ? "11px" : "13px",
        color: "#fdf6e8",
        fontStyle: "bold",
      });
      t.setOrigin(0.5, 0.5);
      t.setResolution(3);
      t.setStroke("#2b2018", 4);
      t.setShadow(0, 1, "#00000066", 2);
      t.setDepth(50_000);
    };
    // Building name plates: centred above each building (clamped on-screen).
    for (const b of this.map.buildings ?? []) {
      if (!b.label) continue;
      const text = typeof b.label === "string" ? b.label : (b.label[lang] ?? b.label.no);
      const cx = (b.x + b.wTiles / 2) * s;
      const cy = Math.max(b.y * s - 9, 11);
      draw(text, cx, cy, true);
    }
    // Free-standing labels from map data.
    for (const l of this.map.labels ?? []) {
      const text = typeof l.text === "string" ? l.text : (l.text[lang] ?? l.text.no);
      draw(text, l.x * s, l.y * s, !!l.small);
    }
  }

  private buildCollision(): void {
    const s = this.size;
    this.solids = this.physics.add.staticGroup();
    // Conservative full grid for spawn-safety + guide resolution only.
    this.solidGrid = buildSolidGrid(this.map, this.pack);

    const addBody = (cx: number, cy: number, w: number, h: number) => {
      const r = this.add.rectangle(cx, cy, w, h, 0, 0);
      this.physics.add.existing(r, true);
      this.solids.add(r);
    };

    // Ground-layer solids (walls, water): full tile.
    for (let y = 0; y < this.map.height; y++) {
      const row = this.map.ground[y] ?? "";
      for (let x = 0; x < this.map.width; x++) {
        const id = this.resolveTile(row[x]);
        const spec = id ? this.pack.tiles[id] : undefined;
        if (spec?.solid) addBody(x * s + s / 2, y * s + s / 2, s, s);
      }
    }

    // Decor-layer solids (props): small, FORGIVING base hitboxes so the player
    // brushes past trees/bushes instead of getting wedged on them.
    if (this.map.decor) {
      for (let y = 0; y < this.map.height; y++) {
        const row = this.map.decor[y] ?? "";
        for (let x = 0; x < this.map.width; x++) {
          const id = this.resolveTile(row[x]);
          const spec = id ? this.pack.tiles[id] : undefined;
          if (!spec?.solid) continue;
          if (spec.tall) addBody(x * s + s / 2, (y + 1) * s - 5, 12, 8); // trunk base
          else addBody(x * s + s / 2, y * s + s * 0.66, 18, 12); // bush/rock base
        }
      }
    }

    // Buildings: a single thin wall at the IMAGE base (matches the visible
    // bottom of the facade), so the player can walk on the road behind the
    // upper part of a building and never clips through the wall.
    for (const b of this.map.buildings ?? []) {
      const src = this.textures.get(b.textureKey).getSourceImage();
      const W = (src as { width?: number })?.width ?? b.wTiles * s;
      const H = (src as { height?: number })?.height ?? b.hTiles * s;
      const baseY = b.y * s + H;
      const wallH = Math.min(16, H);
      addBody(b.x * s + W / 2, baseY - wallH / 2, W - 8, wallH);
    }
  }

  /* ---------- actors ---------- */

  private spawnPlayer(spawnId: string): void {
    let spawn = this.map.spawns[spawnId] ??
      this.runtime.state.player ?? { x: 2, y: 2 };
    spawn = this.safeSpawn(spawn);
    const c = tileCenter(spawn.x, spawn.y, this.size);
    const key = this.pack.meta.theme.playerSpriteKey;

    this.shadow = this.add.ellipse(c.x, c.y + 12, 22, 9, 0x000000, 0.25);
    this.shadow.setDepth(c.y - 1);

    // Invisible physics body drives movement/collision; the visible "character"
    // is the player's real avatar photo (a fun bouncing head).
    this.player = this.physics.add.sprite(c.x, c.y, key, IDLE_FRAME.down);
    this.player.setVisible(false);
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setSize(16, 14);
    body.setOffset(8, 16);
    this.player.setCollideWorldBounds(true);
    this.facing = this.runtime.state.facing ?? "down";
    this.runtime.setPlayer(spawn.x, spawn.y, this.facing);
    this.runtime.persist();
    this.physics.add.collider(this.player, this.solids);
    this.cameras.main.startFollow(this.player, true, 0.16, 0.16);
    this.cameras.main.setDeadzone(this.size * 0.5, this.size * 0.5);

    const D = 30;
    this.avatarRing = this.add.circle(c.x, c.y, D / 2 + 2, 0x2b2018);
    const avatarKey = this.ensureSmoothAvatar();
    this.avatar = this.add.image(c.x, c.y, avatarKey ?? key);
    if (avatarKey) this.avatar.setDisplaySize(D, D);
    this.avatarBaseScale = this.avatar.scaleX;
    this.bobPhase = 0;
  }

  /** The real avatar photo is a large image squeezed into ~30px. Under the
   *  game's global nearest-neighbour (pixelArt) filter it aliases into dark
   *  speckles ("four dots" on the face). We pre-downscale it once into a canvas
   *  texture with the browser's high-quality smoothing, so it stays a crisp,
   *  real photo cheerfully juxtaposed on the pixel-art world. */
  private ensureSmoothAvatar(): string | null {
    if (!this.textures.exists("avatar")) return null;
    const key = "avatar-smooth";
    if (this.textures.exists(key)) return key;
    const src = this.textures.get("avatar").getSourceImage() as
      | HTMLImageElement
      | HTMLCanvasElement;
    const size = 72;
    const tex = this.textures.createCanvas(key, size, size);
    if (!tex) return "avatar";
    const ctx = tex.getContext();
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(src, 0, 0, size, size);
      tex.refresh();
    }
    tex.setFilter(Phaser.Textures.FilterMode.LINEAR);
    return key;
  }

  /** If a spawn lands on a solid tile, nudge to the nearest free tile. */
  private safeSpawn(spawn: Vec2): Vec2 {
    const g = this.solidGrid;
    const inb = (x: number, y: number) =>
      y >= 0 && x >= 0 && y < this.map.height && x < this.map.width;
    if (inb(spawn.x, spawn.y) && !g[spawn.y]?.[spawn.x]) return spawn;
    for (let r = 1; r < 6; r++) {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const x = spawn.x + dx;
          const y = spawn.y + dy;
          if (inb(x, y) && !g[y]?.[x]) return { x, y };
        }
      }
    }
    return spawn;
  }

  private spawnInteractables(): void {
    const s = this.size;
    for (const id of this.map.interactables) {
      const data = this.pack.interactables.find((i) => i.id === id);
      if (!data) continue;
      if (data.showWhen && !this.runtime.met(data.showWhen)) continue;
      const c = tileCenter(data.position.x, data.position.y, s);
      let sprite: Phaser.GameObjects.Image | null = null;
      if (data.spriteKey && this.textures.exists(data.spriteKey)) {
        sprite = this.add.image(
          c.x,
          data.tall ? (data.position.y + 1) * s : c.y,
          data.spriteKey,
        );
        sprite.setOrigin(0.5, data.tall ? 1 : 0.5);
        sprite.setDepth(data.tall ? (data.position.y + 1) * s : c.y);
      }
      const target: Target = { kind: "interactable", data, x: c.x, y: c.y };
      this.targets.push(target);
      if (sprite && data.wander && !this.reducedMotion) {
        this.startWander(sprite, target, data.position);
      } else if (data.kind !== "door") {
        // Subtle "you can interact here" glint above stations/props.
        this.addInteractHint(target, c.x, c.y - s * 0.62);
      }
    }
  }

  /** A small, gently-pulsing glint that marks a prop as interactable from a
   *  distance (before the player is close enough for the bottom-box prompt). */
  private addInteractHint(target: Target, x: number, y: number): void {
    const glint = this.add
      .text(x, y, "✦", {
        fontFamily: "monospace",
        fontSize: "13px",
        color: "#ffe1a8",
      })
      .setOrigin(0.5)
      .setResolution(3)
      .setAlpha(0.5)
      .setDepth(59_000);
    this.hints.set(target, glint);
    if (this.reducedMotion) return;
    this.tweens.add({
      targets: glint,
      y: y - 3,
      alpha: 0.85,
      duration: 1300,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });
  }

  /** Ambient wander for a prop (e.g. the rubber duck): amble to a nearby free
   *  tile, then do a little peck or hop, pause, and repeat. The interaction
   *  target follows the sprite so it stays talk-to-able while it moves. */
  private startWander(
    sprite: Phaser.GameObjects.Image,
    target: Target,
    origin: Vec2,
  ): void {
    const s = this.size;
    const pickTile = (): { x: number; y: number } => {
      for (let tries = 0; tries < 8; tries++) {
        const tx = origin.x + Phaser.Math.Between(-2, 2);
        const ty = origin.y + Phaser.Math.Between(-2, 2);
        if (
          ty >= 0 &&
          tx >= 0 &&
          ty < this.map.height &&
          tx < this.map.width &&
          !this.solidGrid[ty]?.[tx]
        ) {
          return tileCenter(tx, ty, s);
        }
      }
      return tileCenter(origin.x, origin.y, s);
    };
    const sync = () => {
      target.x = sprite.x;
      target.y = sprite.y;
      sprite.setDepth(sprite.y);
    };
    const idle = (done: () => void) => {
      if (Math.random() < 0.5) {
        this.tweens.add({
          targets: sprite,
          scaleY: 0.78,
          duration: 130,
          yoyo: true,
          repeat: 1,
          ease: "Quad.out",
          onComplete: done,
        });
      } else {
        const y0 = sprite.y;
        this.tweens.add({
          targets: sprite,
          y: y0 - 6,
          duration: 170,
          yoyo: true,
          ease: "Quad.out",
          onComplete: done,
        });
      }
    };
    this.wanderers.push(sprite);
    const step = () => {
      if (!sprite.active) return;
      // Freeze while a dialogue or menu is open (e.g. talking to the duck).
      if (this.paused) {
        this.time.delayedCall(500, step);
        return;
      }
      const dest = pickTile();
      if (dest.x < sprite.x - 1) sprite.setFlipX(true);
      else if (dest.x > sprite.x + 1) sprite.setFlipX(false);
      this.tweens.add({
        targets: sprite,
        x: dest.x,
        y: dest.y,
        duration: Phaser.Math.Between(1800, 3000),
        ease: "Sine.inOut",
        onUpdate: sync,
        onComplete: () =>
          idle(() =>
            this.time.delayedCall(Phaser.Math.Between(1600, 4200), step),
          ),
      });
    };
    this.time.delayedCall(Phaser.Math.Between(800, 2000), step);
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
      // Idle blink anim (2-frame sheet) makes NPCs feel alive.
      const animKey = `${data.spriteKey}-idle`;
      if (!this.anims.exists(animKey) && this.textures.get(data.spriteKey).frameTotal > 2) {
        this.anims.create({
          key: animKey,
          frames: [
            { key: data.spriteKey, frame: 0 },
            { key: data.spriteKey, frame: 0 },
            { key: data.spriteKey, frame: 0 },
            { key: data.spriteKey, frame: 0 },
            { key: data.spriteKey, frame: 1 },
          ],
          frameRate: 3,
          repeat: -1,
        });
      }
      if (this.anims.exists(animKey)) sprite.anims.play(animKey);
      if (!this.reducedMotion) {
        this.tweens.add({
          targets: sprite,
          scaleY: 1.04,
          duration: 1100,
          yoyo: true,
          repeat: -1,
          ease: "Sine.inOut",
          delay: Math.random() * 600,
        });
      }
      this.npcSprites.push(sprite);
      this.targets.push({ kind: "npc", data, x: c.x, y: c.y });
    }
  }

  /* ---------- exits & gates ---------- */

  private registerExits(): void {
    const s = this.size;
    for (const exit of this.map.exits) {
      // Doors are interaction targets (press E / Space), never silent auto-walk.
      const cx = (exit.at.x + exit.at.w / 2) * s;
      const cy = (exit.at.y + exit.at.h / 2) * s;
      this.targets.push({ kind: "exit", data: exit, x: cx, y: cy });
    }
  }

  /* ---------- in-world guidance overlays ---------- */

  private createOverlays(): void {
    // WoW-style quest marker (yellow ! to go, yellow ? to deliver), hovering.
    this.guideMarker = this.add
      .text(0, 0, "!", {
        fontFamily: "monospace",
        fontSize: "26px",
        color: "#ffd23c",
        fontStyle: "bold",
      })
      .setOrigin(0.5)
      .setResolution(3)
      .setStroke("#5a3a08", 5)
      .setShadow(0, 2, "#00000088", 3)
      .setDepth(60_000)
      .setVisible(false);

    // Off-screen edge arrow pointing toward the active objective.
    this.edgeArrow = this.add
      .image(0, 0, "arrow")
      .setScrollFactor(0)
      .setDepth(60_001)
      .setVisible(false);
  }

  private enterExit(exit: Exit): void {
    if (this.paused || this.transitioning) return;
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
    this.bridge.emit("prompt", null);
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
    this.wanderers.forEach((w) =>
      this.tweens.getTweensOf(w).forEach((t) => t.pause()),
    );
  }

  private resume(): void {
    if (!this.started) return;
    this.paused = false;
    if (this.input.keyboard) this.input.keyboard.enabled = true;
    this.wanderers.forEach((w) =>
      this.tweens.getTweensOf(w).forEach((t) => t.resume()),
    );
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
      this.runDialogue(target.data.dialogue, target.data.name, target.data.portrait);
      return;
    }
    if (target.kind === "exit") {
      this.enterExit(target.data);
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
      case "endgame":
        if (a.quest) this.runtime.completeQuest(a.quest);
        this.bridge.emit("endgame");
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
    portrait?: string,
  ): void {
    const tree = this.pack.dialogue[treeId];
    if (!tree || tree.length === 0) return;
    const lines = tree.map((l) => ({
      ...(speaker ? { speaker } : {}),
      ...(portrait ? { portrait } : {}),
      ...l,
    }));
    this.bridge.emit("dialogue", { id: treeId, lines });
  }

  private setPrompt(id: string | null, cta?: CtaPrompt): void {
    if (id === this.lastPromptId) return;
    this.lastPromptId = id;
    this.bridge.emit("prompt", id && cta ? cta : null);
  }

  /* ---------- update loop ---------- */

  update(time: number): void {
    if (!this.player) return;
    if (this.paused || this.transitioning) {
      this.player.setVelocity(0, 0);
      this.guideMarker.setVisible(false);
      this.edgeArrow.setVisible(false);
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
    } else {
      this.player.setVelocity(0, 0);
    }

    // Bouncy avatar: a hop + squash/stretch while moving, a gentle bob at rest.
    const px = this.player.x;
    const py = this.player.y;
    let bob = 0;
    let sx = 1;
    let sy = 1;
    if (this.reducedMotion) {
      bob = 0;
    } else if (moving) {
      this.bobPhase += (this.game.loop.delta || 16) * 0.014;
      bob = Math.abs(Math.sin(this.bobPhase)) * 6;
      const sq = Math.cos(this.bobPhase) * 0.08;
      sx = 1 + sq;
      sy = 1 - sq;
    } else {
      bob = (Math.sin(time * 0.004) + 1) * 0.9;
    }
    const base = this.avatarBaseScale;
    this.avatar.setPosition(px, py - 7 - bob);
    this.avatar.setScale(base * sx, base * sy);
    this.avatar.setDepth(py + 1);
    this.avatarRing.setPosition(px, py - 7 - bob);
    this.avatarRing.setScale(sx, sy);
    this.avatarRing.setDepth(py);
    this.shadow.setPosition(px, py + 12);
    this.shadow.setDepth(py - 1);
    this.shadow.setScale(1 - bob * 0.03);

    this.runtime.setPlayer(
      Math.floor(px / this.size),
      Math.floor(py / this.size),
      this.facing,
    );

    this.updateTarget();
    this.updateGuide(time);
  }

  private updateTarget(): void {
    const range = this.size * 1.6;
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
    // Hide the ambient glint on whatever you're standing next to — the bottom
    // prompt is already showing there, so the hint is redundant up close.
    if (this.hints.size) {
      for (const [tgt, glint] of this.hints) glint.setVisible(tgt !== best);
    }
    if (!best) {
      this.setPrompt(null);
      return;
    }
    let id: string;
    let cta: CtaPrompt;
    if (best.kind === "npc") {
      id = `npc:${best.data.id}`;
      cta = { name: best.data.name, verb: { no: "Snakk", en: "Talk" } };
    } else if (best.kind === "exit") {
      id = `exit:${best.data.id}`;
      cta = { name: best.data.name, verb: best.data.prompt ?? { no: "Gå", en: "Go" } };
    } else {
      id = best.data.id;
      cta = { name: best.data.name, verb: best.data.prompt };
    }
    this.setPrompt(id, cta);
  }

  /** Resolve a quest guide's target id (interactable/npc/exit/building) to px. */
  private resolveGuidePos(g: QuestGuide): Vec2 | null {
    const s = this.size;
    if (g.at) return tileCenter(g.at.x, g.at.y, s);
    if (!g.target) return null;
    for (const t of this.targets) {
      if (t.kind === "interactable" && t.data.id === g.target) return { x: t.x, y: t.y };
      if (t.kind === "npc" && t.data.id === g.target) return { x: t.x, y: t.y };
      if (t.kind === "exit" && t.data.id === g.target) return { x: t.x, y: t.y };
    }
    const b = this.map.buildings?.find((bb) => bb.id === g.target);
    if (b) {
      const src = this.textures.get(b.textureKey).getSourceImage();
      const W = (src as { width?: number })?.width ?? b.wTiles * s;
      const H = (src as { height?: number })?.height ?? b.hTiles * s;
      return { x: b.x * s + W / 2, y: b.y * s + H + 4 };
    }
    return null;
  }

  private updateGuide(time: number): void {
    const q = this.runtime.activeQuest();
    const guide = q?.guides?.find((g) => g.map === this.map.id);
    let pos = guide ? this.resolveGuidePos(guide) : null;
    let kind: QuestGuide["kind"] = guide?.kind ?? "go";
    // When the active objective lives on another map, an interior should still
    // point the player at the way out instead of showing nothing.
    if (!pos && q && this.map.kind === "interior" && this.map.exits.length) {
      const ex = this.map.exits[0].at;
      pos = tileCenter(ex.x + (ex.w - 1) / 2, ex.y + (ex.h - 1) / 2, this.size);
      kind = "go";
    }
    if (!pos) {
      this.guideMarker.setVisible(false);
      this.edgeArrow.setVisible(false);
      return;
    }
    const cam = this.cameras.main;
    const view = cam.worldView;
    const margin = this.size;
    const onScreen =
      pos.x > view.x + margin &&
      pos.x < view.right - margin &&
      pos.y > view.y + margin &&
      pos.y < view.bottom - margin;
    if (onScreen) {
      // Once the player is standing at the target, the bottom-box CTA takes
      // over, so hide the hovering marker to avoid doubled cues.
      const atTarget =
        !!this.current &&
        Phaser.Math.Distance.Between(this.player.x, this.player.y, pos.x, pos.y) <
          this.size * 1.7;
      if (atTarget) {
        this.guideMarker.setVisible(false);
        this.edgeArrow.setVisible(false);
        return;
      }
      const bob = Math.sin(time * 0.005) * 4;
      this.guideMarker.setText(kind === "deliver" ? "?" : "!");
      this.guideMarker.setColor("#ffd23c");
      this.guideMarker.setPosition(pos.x, pos.y - this.size * 1.15 + bob);
      this.guideMarker.setVisible(true);
      this.edgeArrow.setVisible(false);
    } else {
      this.guideMarker.setVisible(false);
      const ang = Math.atan2(
        pos.y - (view.y + view.height / 2),
        pos.x - (view.x + view.width / 2),
      );
      const rx = cam.width / 2 - 28;
      const ry = cam.height / 2 - 28;
      this.edgeArrow.setPosition(
        cam.width / 2 + Math.cos(ang) * rx,
        cam.height / 2 + Math.sin(ang) * ry,
      );
      this.edgeArrow.setRotation(ang + Math.PI / 2);
      this.edgeArrow.setVisible(true);
    }
  }
}
