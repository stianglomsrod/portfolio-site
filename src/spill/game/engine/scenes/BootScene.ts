// === REUSABLE ENGINE — BootScene: generic asset preload + animations ===
import Phaser from "phaser";
import type { ContentPack } from "../types";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload(): void {
    const pack = this.registry.get("pack") as ContentPack;
    for (const [key, url] of Object.entries(pack.assets.images)) {
      this.load.image(key, url);
    }
    for (const [key, spec] of Object.entries(pack.assets.spritesheets)) {
      this.load.spritesheet(key, spec.url, {
        frameWidth: spec.frameWidth,
        frameHeight: spec.frameHeight,
      });
    }
  }

  create(): void {
    const pack = this.registry.get("pack") as ContentPack;
    const player = pack.meta.theme.playerSpriteKey;

    // Player walk cycles: sheet is 3 cols (idle, stepA, stepB) × 4 rows
    // (down, left, right, up).
    const rows: Record<string, number> = { down: 0, left: 1, right: 2, up: 3 };
    for (const [dir, r] of Object.entries(rows)) {
      const base = r * 3;
      if (!this.anims.exists(`${player}-walk-${dir}`)) {
        this.anims.create({
          key: `${player}-walk-${dir}`,
          frames: [
            { key: player, frame: base + 1 },
            { key: player, frame: base },
            { key: player, frame: base + 2 },
            { key: player, frame: base },
          ],
          frameRate: 8,
          repeat: -1,
        });
      }
    }

    if (
      this.textures.exists("flutterfly") &&
      !this.anims.exists("flutterfly-flap")
    ) {
      this.anims.create({
        key: "flutterfly-flap",
        frames: [
          { key: "flutterfly", frame: 0 },
          { key: "flutterfly", frame: 1 },
        ],
        frameRate: 4,
        repeat: -1,
      });
    }

    if (this.textures.exists("water") && !this.anims.exists("water")) {
      const waterTex = this.textures.get("water");
      // Only animate if the spritesheet actually has a second frame. getFrameNames()
      // excludes Phaser's internal "__BASE" frame, so length >= 2 means frames 0 AND 1
      // exist. A single-cell sheet (frameTotal === 2 incl. __BASE) is left static.
      if (waterTex.getFrameNames().length >= 2) {
        this.anims.create({
          key: "water",
          frames: [
            { key: "water", frame: 0 },
            { key: "water", frame: 1 },
          ],
          frameRate: 2,
          repeat: -1,
        });
      }
    }

    const phase = this.registry.get("phase") as string | undefined;
    this.scene.start("WorldScene", {
      mapId: this.registry.get("startMap"),
      spawn: this.registry.get("startSpawn"),
      autostart: phase === "playing",
    });
  }
}
