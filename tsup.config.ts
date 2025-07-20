// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  outDir: "dist",
  splitting: false,
  sourcemap: false,
  clean: true,
  target: "node18",
  shims: false,
  minify: true,
  banner: {
    js: "#!/usr/bin/env node",
  },
});
