"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GameBridge, StateSnapshot } from "../engine/bridge";
import type { GameRuntime } from "../engine/runtime";
import type { Artifact, ContentPack, DialogueLine, Lang, Loc, Skill } from "../engine/types";
import styles from "../../skamlos-rpg.module.css";
import { playBell } from "./bell";
import StartScreen from "./StartScreen";
import Hud from "./Hud";
import DialogueBox from "./DialogueBox";
import Subtitle from "./Subtitle";
import Toasts, { type ToastItem } from "./Toasts";
import RewardBanner from "./RewardBanner";
import QuestLog from "./QuestLog";
import SkillLog from "./SkillLog";
import MinigameModal from "./MinigameModal";

interface Props {
  bridge: GameBridge | null;
  runtime: GameRuntime | null;
  pack: ContentPack;
}

type DialogueState = { id: string; lines: DialogueLine[]; index: number } | null;
type Panel = "quest" | "skill" | null;

export default function GameUI({ bridge, runtime, pack }: Props) {
  const [phase, setPhase] = useState<"start" | "playing">("start");
  const [lang, setLang] = useState<Lang>(runtime?.state.lang ?? "no");
  const [objective, setObjective] = useState<Loc | null>(null);
  const [prompt, setPrompt] = useState<Loc | null>(null);
  const [subtitle, setSubtitle] = useState<{ text: Loc; n: number } | null>(null);
  const [dialogue, setDialogue] = useState<DialogueState>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [reward, setReward] = useState<{ skills: Skill[]; artifacts: Artifact[] } | null>(null);
  const [minigameId, setMinigameId] = useState<string | null>(null);
  const [panel, setPanel] = useState<Panel>(null);
  const [snapshot, setSnapshot] = useState<StateSnapshot | null>(null);

  const toastId = useRef(0);
  const subId = useRef(0);

  const hasProgress =
    !!runtime &&
    (runtime.state.completedQuests.length > 0 ||
      runtime.state.currentMap !== pack.meta.startMap);

  const pushToast = useCallback((text: Loc, kind: ToastItem["kind"]) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, text, kind }]);
    window.setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3600);
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
        window.setTimeout(() => setSubtitle((s) => (s && s.n === n ? null : s)), 4000);
      }),
    );
    offs.push(bridge.on("dialogue", ({ id, lines }) => setDialogue({ id, lines, index: 0 })));
    offs.push(bridge.on("toast", ({ text, kind }) => pushToast(text, kind)));
    offs.push(
      bridge.on("reward", (r) => {
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
    offs.push(bridge.on("bell", () => playBell()));
    return () => offs.forEach((fn) => fn());
  }, [bridge, pushToast]);

  // Panel hotkeys (Q/K) and Escape-to-close. Movement is paused while a panel
  // is open via cmd:pause/cmd:resume.
  useEffect(() => {
    if (!bridge) return;
    const onKey = (e: KeyboardEvent) => {
      if (phase !== "playing") return;
      const key = e.key.toLowerCase();
      if (dialogue || minigameId) return;
      if (key === "q") togglePanel("quest");
      else if (key === "k") togglePanel("skill");
      else if (key === "escape" && panel) closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bridge, phase, panel, dialogue, minigameId]);

  function togglePanel(next: Panel) {
    setPanel((cur) => {
      const value = cur === next ? null : next;
      if (value) bridge?.emit("cmd:pause");
      else bridge?.emit("cmd:resume");
      return value;
    });
  }
  function closePanel() {
    setPanel(null);
    bridge?.emit("cmd:resume");
  }

  function advanceDialogue() {
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
          prompt={prompt}
          snapshot={snapshot}
          onOpenQuest={() => togglePanel("quest")}
          onOpenSkill={() => togglePanel("skill")}
          onToggleLang={() => bridge.emit("cmd:setLang", lang === "no" ? "en" : "no")}
        />
      )}

      {subtitle && <Subtitle key={subtitle.n} text={subtitle.text} lang={lang} />}

      <Toasts items={toasts} lang={lang} />
      {reward && <RewardBanner reward={reward} lang={lang} />}

      {dialogue && (
        <DialogueBox
          line={dialogue.lines[dialogue.index]}
          hasNext={dialogue.index + 1 < dialogue.lines.length}
          lang={lang}
          onAdvance={advanceDialogue}
        />
      )}

      {panel === "quest" && (
        <QuestLog pack={pack} snapshot={snapshot} lang={lang} onClose={closePanel} />
      )}
      {panel === "skill" && (
        <SkillLog pack={pack} snapshot={snapshot} lang={lang} onClose={closePanel} />
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

      {phase === "start" && (
        <StartScreen
          pack={pack}
          lang={lang}
          hasProgress={hasProgress}
          onPlay={() => bridge.emit("cmd:start")}
          onRestart={() => bridge.emit("cmd:restart")}
          onToggleLang={() => bridge.emit("cmd:setLang", lang === "no" ? "en" : "no")}
        />
      )}
    </div>
  );
}
