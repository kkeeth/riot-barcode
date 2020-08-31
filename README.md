<p align="center">
  <img src="https://raw.githubusercontent.com/kkeeth/riot-barcode/master/assets/img/barcode.png" alt="barcode" width="600">
  <br />
  <br />
<a href="https://badge.fury.io/js/riot-barcode"><img src="https://badge.fury.io/js/riot-barcode.svg" alt="npm version" /></a>
<a href="https://travis-ci.org/kkeeth/riot-barcode"><img src="https://travis-ci.org/kkeeth/riot-barcode.svg" alt="Build Status" /></a>
<img src="https://img.shields.io/badge/node-%3E%3D%2012.18.3-brightgreen.svg?style=social" alt="nodejs version" />
<a href="https://github.com/kkeeth/riot-barcode/blob/master/LICENSE"><img src="http://img.shields.io/badge/license-MIT-blue.svg?style=flat" alt="MIT LICENSE" /></a>

</p>

`riot-barcode` is a simple **barcode generator** for [riotjs](https://riot.js.org/) by using [JsBarcode](https://lindell.me/JsBarcode/) library. For detailed specifications, please refer to [this document](https://github.com/lindell/JsBarcode/blob/master/README.md#supported-barcodes).

Please see the demo: [https://kkeeth.github.io/riot-barcode/](https://kkeeth.github.io/riot-barcode/)

## Useage

#### ▼ CDN

If you want to use riot-barcode with a CDN service, etc., load the JS file in the html file, and place the tag `<riot-barcode />` in the component you want to use.

See also the [example directory](https://github.com/kkeeth/riot-barcode/tree/master/example) in the github repository.

- index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>riot-barcode</title>
    <script src="riot+compiler.js"></script>
    <script src="riot-barcode.js"></script>
  </head>
  <body>
    <div is="app"></div>

    <script defer src="app.riot" type="riot"></script>
    <script>
      riot.compile().then(() => {
        riot.mount("[is='app']");
      });
    </script>
  </body>
</html>
```

- app.riot

```html
<app>
  <p>
    Please input any text:
    <input
      type="text"
      oninput="{ handleChange }"
      value="{ state.inputValue }"
    />
  </p>
  <riot-barcode value="{ state.inputValue }" />

  <script>
    const initialValue = "JsBarcode for RiotJS";

    export default {
      state: {
        inputValue: initialValue,
      },
      handleChange(e) {
        this.update({
          inputValue: e.target.value ? e.target.value : initialValue,
        });
      },
    };
  </script>
</app>
```

There are several CDN services available, but I'm including two for your reference.

- [JSDELIVR](https://cdn.jsdelivr.net/npm/riot-barcode@0.0.4/dist/riot-barcode.min.js)
- [UNPKG](https://unpkg.com/riot-barcode/dist/riot-barcode.min.js)

#### ▼ Bundler

Use whatever bandoliers you want(e.g. webpack, rollup, parcel ... etc). For your reference, here's the code for using `webpack`.

- install

```bash
$ npm install -S riot-barcode
```

- index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Riot App</title>
  </head>
  <body>
    <div is="app" data-riot-component></div>

    <script defer src="dist/bundle.js"></script>
  </body>
</html>
```

- app.riot

```html
<app>
  <riot-barcode value="your any text" />
</app>
```

- app.js (your main js file)

```js
import "@riotjs/hot-reload";
import { component } from "riot";
import "riot-barcode";
import App from "./app.riot";

component(App)(document.querySelector("[data-riot-component]"));
```

- webpack.config.js

```js
const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.riot$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "@riotjs/webpack-loader",
            options: {
              hot: true,
            },
          },
        ],
      },
    ],
  },
};
```

# License

[MIT](https://github.com/kkeeth/riot-barcode/blob/master/LICENSE) License

# Any issue or want more features? Contact me!

This module has been tested under limited scenarios. If you find any issue please feel free to report via one of the below platforms:

- GitHub: <a href="https://github.com/kkeeth/riot-barcode/issues">riot-barcode</a><br>
- Email: zensin0082@gmail.com<br>
- Twitter: <a href="https://twitter.com/kuwahara_jsri" target="_blank">@kuwahara_jsri</a>
