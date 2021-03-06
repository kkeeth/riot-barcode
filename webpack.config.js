const path = require("path");

module.exports = (env, argv) => {
  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename:
        argv.mode === "production" ? "riot-barcode.min.js" : "riot-barcode.js",
      libraryTarget: "umd",
    },
    devServer: {
      open: true,
      compress: argv.mode === "production" ? true : false,
      port: 5555,
    },
    externals: [{ riot: "riot", JsBarcode: "jsbarcode" }],
    module: {
      rules: [
        {
          test: /\.riot$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "@riotjs/webpack-loader",
              options: {
                type: "es6", // transpile the riot tags using babel
                hot: true,
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          enforce: "pre",
          use: [
            {
              loader: "eslint-loader",
              options: {
                fix: true,
                emitWarning: true,
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                ],
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { url: false }
            }
          ],
        },
      ],
    },
  };
};
