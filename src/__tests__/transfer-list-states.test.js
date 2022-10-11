import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import TransferListStates from "../components/transferlist-list-states";

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

it("renders with or without a name", () => {
    act(() => {
        render(<TransferListStates loading={false} inactiveStates={[]} setInactiveStates={() => {}} activeStates={[]} setActiveStates={() => {}} />, container);
    });
    expect(container.textContent).toBe("States><Chosen");
    
    act(() => {
        render(<TransferListStates loading={true} inactiveStates={['c', 'a', 'b']} setInactiveStates={() => {}} activeStates={[]} setActiveStates={() => {}} />, container);
    });
    expect(container.textContent).toBe("States><Chosen");

    act(() => {
        render(<TransferListStates loading={false} inactiveStates={['c', 'a', 'b']} setInactiveStates={() => {}} activeStates={[]} setActiveStates={() => {}} />, container);
    });
    expect(container.textContent).toBe("Statesabc><Chosen");

    act(() => {
        render(<TransferListStates loading={false} inactiveStates={[]} setInactiveStates={() => {}} activeStates={['c', 'a', 'b']} setActiveStates={() => {}} />, container);
    });
    expect(container.textContent).toBe("States><Chosenabc");

    act(() => {
        render(<TransferListStates loading={false} inactiveStates={['d', 'b']} setInactiveStates={() => {}} activeStates={['c', 'a']} setActiveStates={() => {}} />, container);
    });
    expect(container.textContent).toBe("Statesbd><Chosenac");

    act(() => {
        render(<TransferListStates loading={false} inactiveStates={['1', '5', '7']} setInactiveStates={() => {}} activeStates={['5', '2']} setActiveStates={() => {}} />, container);
    });
    expect(container.textContent).toBe("States157><Chosen25");
});
