"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CtaPrompt, GameBridge, StateSnapshot } from "../engine/bridge";
import type { GameRuntime } from "../engine/runtime";
import type {
  Artifact,
  ContentPack,
  DialogueLine,
  Lang,
  Loc,
  Skill,
} from "../engine/types";
import styles from "../../skamlos-rpg.module.css";
import { playBell } from "./bell";
import { audio } from "../engine/audio";
import StartScreen from "./StartScreen";
import Hud from "./Hud";
import GameBox from "./GameBox";
import Toasts, { type ToastItem } from "./Toasts";
import RewardBanner from "./RewardBanner";
import PauseMenu from "./PauseMenu";
import MinigameModal from "./MinigameModal";
import EndgameScreen from "./EndgameScreen";

interface Props {
  bridge: GameBridge | null;
  runtime: GameRuntime | null;
  pack: ContentPack;
}

type DialogueState = {
  id: string;
  lines: DialogueLine[];
  index: number;
} | null;

export default function GameUI({ bridge, runtime, pack }: Props) {
  const [phase, setPhase] = useState<"start" | "playing">("start");
  const [lang, setLang] = useState<Lang>(runtime?.state.lang ?? "no");
  const [objective, setObjective] = useState<Loc | null>(null);
  const [prompt, setPrompt] = useState<CtaPrompt | null>(null);
  const [subtitle, setSubtitle] = useState<{ text: Loc; n: number } | null>(
    null,
  );
  const [dialogue, setDialogue] = useState<DialogueState>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [reward, setReward] = useState<{
    skills: Skill[];
    artifacts: Artifact[];
  } | null>(null);
  const [minigameId, setMinigameId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuFocus, setMenuFocus] = useState<string | null>(null);
  const [endgameOpen, setEndgameOpen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [snapshot, setSnapshot] = useState<StateSnapshot | null>(null);
  const [muted, setMuted] = useState(() => {
    try {
      audio.loadPrefs();
    } catch {}
    return audio.getMuted();
  });

  const toggleMute = () => {
    const next = !muted;
    audio.setMuted(next);
    setMuted(next);
  };

  const toastId = useRef(0);
  const subId = useRef(0);

  const hasProgress =
    !!runtime &&
    (runtime.state.completedQuests.length > 0 ||
      runtime.state.currentMap !== pack.meta.startMap);

  const pushToast = useCallback((text: Loc, kind: ToastItem["kind"]) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, text, kind }]);
    window.setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3600,
    );
  }, []);

  // Stop background music whenever the player leaves the game — client-side
  // navigation (unmount), tab close, or backgrounding — so audio never lingers.
  useEffect(() => {
    const stop = () => audio.bgm.stop();
    window.addEventListener("pagehide", stop);
    return () => {
      window.removeEventListener("pagehide", stop);
      audio.bgm.stop();
    };
  }, []);

  useEffect(() => {
    if (!bridge) return;
    const offs: Array<() => void> = [];
    offs.push(bridge.on("phase", (p) => setPhase(p)));
    offs.push(bridge.on("objective", (o) => setObjective(o)));
    offs.push(bridge.on("prompt", (p) => setPrompt(p)));
    offs.push(
      bridge.on("subtitle", (text) => {
        const n = ++subId.current;
        setSubtitle({ text, n });
        window.setTimeout(
          () => setSubtitle((s) => (s && s.n === n ? null : s)),
          4000,
        );
      }),
    );
    offs.push(
      bridge.on("dialogue", ({ id, lines }) =>
        setDialogue({ id, lines, index: 0 }),
      ),
    );
    offs.push(bridge.on("toast", ({ text, kind }) => pushToast(text, kind)));
    offs.push(
      bridge.on("reward", (r) => {
        audio.sfx("reward");
        setReward(r);
        window.setTimeout(() => setReward(null), 6500);
      }),
    );
    offs.push(bridge.on("openMinigame", (id) => setMinigameId(id)));
    offs.push(bridge.on("closeMinigame", () => setMinigameId(null)));
    offs.push(
      bridge.on("state", (s) => {
        setSnapshot(s);
        setLang(s.lang);
        setObjective(s.objective);
      }),
    );
    offs.push(
      bridge.on("bell", () => {
        audio.sfx("bell");
        playBell();
      }),
    );
    offs.push(
      bridge.on("endgame", () => {
        setEndgameOpen(true);
        bridge.emit("cmd:pause");
      }),
    );
    return () => offs.forEach((fn) => fn());
  }, [bridge, pushToast]);

  // Panel hotkeys (Q/K) and Escape-to-close. Movement is paused while a panel
  // Esc / Q / K open the pause-menu. Movement is paused while it is open.
  useEffect(() => {
    if (!bridge) return;
    const onKey = (e: KeyboardEvent) => {
      if (phase !== "playing") return;
      if (dialogue || minigameId) return;
      const key = e.key.toLowerCase();
      if (key === "escape" || key === "q" || key === "k") {
        e.preventDefault();
        setMenuOpen((m) => {
          const v = !m;
          bridge.emit(v ? "cmd:pause" : "cmd:resume");
          return v;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bridge, phase, dialogue, minigameId]);

  function openMenu(focusId?: unknown) {
    setMenuFocus(typeof focusId === "string" ? focusId : null);
    setMenuOpen(true);
    bridge?.emit("cmd:pause");
  }
  function closeMenu() {
    setMenuOpen(false);
    setMenuFocus(null);
    bridge?.emit("cmd:resume");
  }

  // Controls are taught briefly at the start, then fade (best practice). They
  // also live permanently in the pause menu, so the text box never has to.
  useEffect(() => {
    if (phase !== "playing" || !showControls) return;
    const move = [
      "w",
      "a",
      "s",
      "d",
      "arrowup",
      "arrowdown",
      "arrowleft",
      "arrowright",
    ];
    const onMove = (e: KeyboardEvent) => {
      if (move.includes(e.key.toLowerCase())) setShowControls(false);
    };
    const timer = window.setTimeout(() => setShowControls(false), 8000);
    window.addEventListener("keydown", onMove);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onMove);
    };
  }, [phase, showControls]);

  function advanceDialogue() {
    audio.sfx("blip");
    setDialogue((d) => {
      if (!d) return null;
      if (d.index + 1 < d.lines.length) return { ...d, index: d.index + 1 };
      bridge?.emit("cmd:closeDialogue");
      return null;
    });
  }

  if (!bridge || !runtime) return null;

  return (
    <div className={styles.ui}>
      {phase === "playing" && (
        <Hud
          lang={lang}
          objective={objective}
          snapshot={snapshot}
          muted={muted}
          onOpenMenu={openMenu}
          onToggleMute={toggleMute}
          onToggleLang={() =>
            bridge.emit("cmd:setLang", lang === "no" ? "en" : "no")
          }
        />
      )}

      <Toasts items={toasts} lang={lang} />
      {reward && (
        <RewardBanner
          reward={reward}
          lang={lang}
          onOpen={openMenu}
          onClose={() => setReward(null)}
        />
      )}

      {phase === "playing" && showControls && !menuOpen && (
        <div className={styles.controlsBanner}>
          {lang === "no"
            ? "Beveg: WASD / piltaster   ·   Undersøk: E   ·   Meny: Esc"
            : "Move: WASD / arrows   ·   Interact: E   ·   Menu: Esc"}
        </div>
      )}

      {phase === "playing" && (
        <GameBox
          dialogue={
            dialogue
              ? {
                  line: dialogue.lines[dialogue.index],
                  hasNext: dialogue.index + 1 < dialogue.lines.length,
                }
              : null
          }
          subtitle={subtitle?.text ?? null}
          cta={prompt}
          lang={lang}
          onAdvance={advanceDialogue}
          onInteract={() => bridge.emit("cmd:interact")}
        />
      )}

      {menuOpen && (
        <PauseMenu
          pack={pack}
          snapshot={snapshot}
          lang={lang}
          focus={menuFocus}
          onResume={closeMenu}
          onRestart={() => bridge.emit("cmd:restart")}
        />
      )}

      {minigameId && (
        <MinigameModal
          pack={pack}
          startId={minigameId}
          lang={lang}
          onComplete={(lastId) => bridge.emit("cmd:minigameComplete", lastId)}
          onCancel={() => bridge.emit("cmd:minigameCancel")}
        />
      )}

      {endgameOpen && (
        <EndgameScreen
          pack={pack}
          snapshot={snapshot}
          lang={lang}
          onReplay={() => {
            setEndgameOpen(false);
            bridge.emit("cmd:restart");
          }}
        />
      )}

      {phase === "start" && (
        <StartScreen
          pack={pack}
          lang={lang}
          hasProgress={hasProgress}
          onPlay={() => bridge.emit("cmd:start")}
          onRestart={() => bridge.emit("cmd:restart")}
          onToggleLang={() =>
            bridge.emit("cmd:setLang", lang === "no" ? "en" : "no")
          }
        />
      )}
    </div>
  );
}
