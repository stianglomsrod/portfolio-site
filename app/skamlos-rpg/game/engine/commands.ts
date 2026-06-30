// === REUSABLE ENGINE — command router (UI commands → runtime actions) ===
import type { GameBridge } from "./bridge";
import type { GameRuntime } from "./runtime";

export interface CommandHooks {
  /** Reboot the Phaser scene back to the start screen (used by "Spill på nytt"). */
  restart: () => void;
}

export function wireCommands(
  runtime: GameRuntime,
  bridge: GameBridge,
  hooks: CommandHooks,
): () => void {
  const unsub: Array<() => void> = [];

  unsub.push(
    bridge.on("cmd:start", () => {
      bridge.emit("phase", "playing");
      runtime.pushState();
      runtime.pushObjective();
    }),
  );

  unsub.push(bridge.on("cmd:setLang", (lang) => runtime.setLang(lang)));

  unsub.push(
    bridge.on("cmd:minigameComplete", (id) => {
      const def = runtime.pack.minigames.find((m) => m.id === id);
      runtime.setFlag(`minigame:done:${id}`);
      def?.setsFlags?.forEach((f) => runtime.setFlag(f));
      if (def?.completesQuest) runtime.completeQuest(def.completesQuest);
      bridge.emit("closeMinigame");
    }),
  );

  unsub.push(bridge.on("cmd:minigameCancel", () => bridge.emit("closeMinigame")));

  unsub.push(
    bridge.on("cmd:restart", () => {
      runtime.reset();
      bridge.emit("phase", "start");
      hooks.restart();
    }),
  );

  return () => unsub.forEach((fn) => fn());
}
