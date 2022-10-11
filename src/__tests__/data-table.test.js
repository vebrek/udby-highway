import React from "react";
import { render, unmountComponentAtNode, screen } from "react-dom";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";

import DataTable from "../components/data_table";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Test datatable with and without data", () => {
    act(() => {
        render(<DataTable data={[]} isLoading={true} />, container);
    });
    expect(container.textContent).toBe("Columns0FiltersExportSeqFirst nameRows per page:100–0 of 0");

    act(() => {
        render(<DataTable data={[]} isLoading={false} />, container);
    });
    expect(container.textContent).toBe("Columns0FiltersExportNo rowsSeqFirst nameRows per page:100–0 of 0");
});
