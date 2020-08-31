import RiotBarcode from "../src/riot-barcode.riot";

import { expect } from "chai";
import { component } from "riot";

describe("RiotBarcode component's Unit Test", () => {
  const mountedBarcode = component(RiotBarcode);

  it("The component is properly rendered", () => {
    const div = document.createElement("div");
    const component = mountedBarcode(div);

    expect(component.$("svg").innerHTML).to.match(/<rect/);
  });

  it("The component is rendered 'img' tag", () => {
    const div = document.createElement("div");
    div.setAttribute("renderer", "img");
    const component = mountedBarcode(div);

    expect(component.$("img").innerHTML).to.be.equal("");
  });
});
