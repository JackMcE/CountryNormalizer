import { $ } from "bun";

await Bun.build({
  entrypoints: ["./index.ts"],
  outdir: "./dist",
  target: "node",
  format: "esm",
});

await $`tsc --project tsconfig.build.json`;
