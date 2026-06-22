"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// The WebGL game is heavy and depends on `window`/WebGL, so it must only ever
// load on the client. `ssr:false` is illegal in a Server Component under Next
// 16, which is exactly why this wrapper exists.
const Game = dynamic(() => import("./game/Game"), {
  ssr: false,
  loading: () => null,
});

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return (
      !!window.WebGLRenderingContext &&
      (!!canvas.getContext("webgl") || !!canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function SkamlosPitchClient() {
  // null = not yet probed (render nothing to avoid hydration mismatch).
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // WebGL support can only be probed on the client after mount; this single
    // post-mount state set is intentional (not a cascading render).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(hasWebGL());
  }, []);

  if (supported === null) return null;
  return <Game webglSupported={supported} />;
}
