import React from "react";
import { render, unmountComponentAtNode, screen } from "react-dom";
import { act } from "react-dom/test-utils";

import ToggleMapLayer from "../components/toggle-map-layer";

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

it("Test ToggleMapLayer with different inputs", () => {
    act(() => {
        render(<ToggleMapLayer />, container);
    });
    expect(container.querySelector['data-testid']).toBe(undefined);

    act(() => {
        render(<ToggleMapLayer showHeatmap={false} setShowHeatMap={() => {}} />, container);
    });
    expect(container.querySelector('[data-testid]').getAttribute('data-testid')).toBe("BubbleChartIcon");

    act(() => {
        render(<ToggleMapLayer showHeatmap={true} setShowHeatMap={() => {}} />, container);
    });
    expect(container.querySelector('[data-testid]').getAttribute('data-testid')).toBe("RoomIcon");
    
});
