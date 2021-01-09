import { registerPostprocessor } from "@riotjs/compiler";
import babel from "@babel/core";

registerPostprocessor((code, { options }) => {
  return babel.transform(code, {
    sourceMaps: false,
    // retainLines: true,
    sourceFileName: options.file,
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            ie: 11,
            edge: true
          },
          loose: true,
          useBuiltIns: "usage"
        }
      ],
    ],
    plugins: ["@babel/plugin-transform-runtime"]
  });
});

export default {
  riot: {
    template: "babel"
  }
};
