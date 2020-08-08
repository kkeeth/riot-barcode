import RiotBarcode from "../src/riot-barcode.riot";

import { expect } from "chai";
import { component } from "riot";

describe("RiotBarcode component's Unit Test", () => {
  const mountBarcode = component(RiotBarcode);

  it("The component is properly rendered", () => {
    const div = document.createElement("div");
    const component = mountBarcode(div);

    expect(component.$("svg").innerHTML).to.match(/<rect/);
  });
});
