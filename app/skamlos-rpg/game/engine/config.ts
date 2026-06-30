// === REUSABLE ENGINE — Phaser game config factory ===
import Phaser from "phaser";

export interface MakeConfigOptions {
  parent: HTMLElement;
  width: number;
  height: number;
  backgroundColor: string;
  scenes: Phaser.Types.Scenes.SceneType[];
  reducedMotion: boolean;
}

export function makeConfig(
  opts: MakeConfigOptions,
): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent: opts.parent,
    width: opts.width,
    height: opts.height,
    backgroundColor: opts.backgroundColor,
    pixelArt: true,
    roundPixels: true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: "arcade",
      arcade: { gravity: { x: 0, y: 0 }, debug: false },
    },
    fps: { target: 60 },
    scene: opts.scenes,
    callbacks: {},
    audio: { noAudio: true }, // bell is synthesised via WebAudio in the DOM layer
    banner: false,
  };
}
