import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // The react-three-fiber world layer drives the camera every frame inside
    // `useFrame`. Mutating the camera (a value returned from the `useThree`
    // hook) per frame is the idiomatic R3F pattern, but it conflicts with the
    // React-Compiler immutability rule. Scope the exception to this layer only.
    files: ["app/skamlos-pitch/game/world/**/*.tsx"],
    rules: {
      "react-hooks/immutability": "off",
    },
  },
]);

export default eslintConfig;
