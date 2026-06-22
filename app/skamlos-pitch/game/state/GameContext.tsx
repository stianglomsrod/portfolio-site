"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  type Dispatch,
} from "react";
import { useLanguage } from "../../../components/LanguageContext";
import type { ActiveTarget, GameState, Lang } from "./types";
import { gameReducer, initialState, type Action } from "./gameReducer";

interface GameContextValue {
  state: GameState;
  dispatch: Dispatch<Action>;
  activeTarget: ActiveTarget | null;
  setActiveTarget: (t: ActiveTarget | null) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
}

export type { GameContextValue };

const GameContext = createContext<GameContextValue | null>(null);

/**
 * Builds the shared game controller value. Created once in <Game> and provided
 * to BOTH the DOM UI tree and (again) inside the react-three-fiber <Canvas>,
 * because React context does not cross the R3F renderer boundary on its own.
 */
export function useGameController(): GameContextValue {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [activeTarget, setActiveTargetRaw] = useState<ActiveTarget | null>(
    null,
  );
  const { lang, setLang } = useLanguage();

  // Only update when the focused target id actually changes, to avoid churn
  // from the per-frame proximity scan.
  const setActiveTarget = useCallback((t: ActiveTarget | null) => {
    setActiveTargetRaw((prev) => {
      if (prev?.id === t?.id && prev?.locked === t?.locked) return prev;
      return t;
    });
  }, []);

  return useMemo(
    () => ({ state, dispatch, activeTarget, setActiveTarget, lang, setLang }),
    [state, dispatch, activeTarget, setActiveTarget, lang, setLang],
  );
}

export { GameContext };

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx)
    throw new Error("useGame must be used within a GameContext provider");
  return ctx;
}
