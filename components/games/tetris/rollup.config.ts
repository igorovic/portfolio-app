import typescript from "@rollup/plugin-typescript";
import type { RollupOptions } from "rollup";
const config: RollupOptions = {
  input: "components/games/tetris/src/engine.ts",
  output: {
    file: "public/tetris/engine.js",
    format: "esm",
  },
  plugins: [
    typescript({ compilerOptions: { target: "es2016", module: "esnext" } }),
  ],
};

export default config;
