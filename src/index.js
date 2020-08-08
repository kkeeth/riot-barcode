import "@riotjs/hot-reload";
import { component } from "riot";
import RiotBarcode from "./riot-barcode.riot";

component(RiotBarcode)(document.getElementById("app"), {
  defaultProps: {
    format: "CODE128",
    renderer: "svg",
    width: 2,
    height: 100,
    displayValue: true,
    fontOptions: "",
    font: "Futura",
    textAlign: "center",
    textPosition: "bottom",
    textMargin: 5,
    fontSize: 50,
    background: "#ffffff",
    lineColor: "#000000",
    margin: 10,
    value: "JsBarcode for RiotJS",
  },
});
