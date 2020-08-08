import riot from "rollup-plugin-riot";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.js",
  output: {
    file: "bin/riot-barcode.js",
    format: "iife",
  },
  plugins: [riot(), nodeResolve(), commonjs()],
};
