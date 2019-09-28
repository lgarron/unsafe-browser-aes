import {terser} from "rollup-plugin-terser";
import * as typescript from "typescript";
import typescript2 from "rollup-plugin-typescript2";
import tslint from "rollup-plugin-tslint";

const pkg = require("./package.json");
const umdName = pkg.umdName || pkg.name;
const externals = pkg.externalDependencies || [];
const umdGlobals = pkg.umdGlobals || [];

const plugins = [
  tslint({
    exclude: [
      "node_modules/**",
    ],
  }),
  typescript2({
    typescript: typescript,
  }),
];

if (!process.env.ROLLUP_WATCH) {
  plugins.push(terser({
    keep_classnames: true,
  }));
}

const mod = {
  external: externals,
  input: "src/index.ts",
  output: [
    {
      dir: "dist/cjs",
      format: "cjs",
      sourcemap: true,
    },
  ],
  plugins,
};

const umd = {
  external: externals,
  input: "src/index.ts",
  output: [
    {
      file: pkg.umd,
      format: "umd",
      globals: umdGlobals,
      name: umdName,
      sourcemap: true,
    },
  ],
  plugins,
};

const configs = [mod];
if (!process.env.ROLLUP_WATCH) {
  configs.push(umd);
}

export default configs;
