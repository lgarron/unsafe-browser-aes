import { build } from "esbuild";

build({
  entryPoints: ["src/lib/index.ts"],
  outdir: "./dist/lib/unsafe-browser-aes/esm",
  format: "esm",
  target: "es2020",
  bundle: true,
  splitting: true,
});
