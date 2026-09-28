import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  outDir: "dist",
  clean: true,
  target: "node18",
  external: ["mongoose", "@terrastruct/d2"],
  splitting: false,
  minify: false,

  // Sourcemaps are deliberately not published: they were ~65% of the install
  // footprint, and this build is already readable.
  sourcemap: false,
  shims: false,
  // NOTE: no `banner` here. This package has no `bin` entry, so the previous
  // `#!/usr/bin/env node` shebang was being written into dist/index.js and
  // dist/index.mjs of a plain library, which trips up bundlers.
});
