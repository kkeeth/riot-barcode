import "@riotjs/hot-reload";
import { component } from "riot";
import RiotBarcode from "./riot-barcode.riot";

component(RiotBarcode)(document.getElementById("app"), {
  defaultProps: {
    format: "CODE128",
    renderer: "img",
    width: 2,
    height: 100,
    displayValue: true,
    fontOptions: "",
    font: "monospace",
    textAlign: "center",
    textPosition: "bottom",
    textMargin: 2,
    fontSize: 20,
    background: "#ffffff",
    lineColor: "#000000",
    margin: 10,
    value: "https://github.com/kkeeth",
  },
});
