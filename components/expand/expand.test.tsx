import React, { useState } from "react";
import { render, act } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import {
  Expand,
  EXPAND_CONTENT_TEST_ID,
  EXPAND_WRAPPER_TEST_ID,
} from "./expand";

const Dummy = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const onClick = () => {
    setExpanded((state) => !state);
  };

  return (
    <div>
      <button onClick={onClick}>click</button>
      <Expand expanded={expanded}>Text to expand</Expand>
    </div>
  );
};

describe("<Expand />", () => {
  const user = userEvent.setup();
  it("should expand and collapse", async () => {
    render(<Dummy />);
    const element = screen.getByTestId(EXPAND_CONTENT_TEST_ID);
    element.getBoundingClientRect = jest.fn().mockReturnValue({
      x: 0,
      y: 0,
      bottom: 0,
      height: 100,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    });
    const button = screen.getByText("click");

    await act(async () => await user.click(button));

    expect(screen.getByTestId(EXPAND_WRAPPER_TEST_ID)).toHaveStyle(
      "height: 100px;"
    );

    await waitFor(
      () =>
        expect(screen.getByTestId(EXPAND_WRAPPER_TEST_ID)).toHaveStyle(
          "height: auto;"
        ),
      {
        timeout: 2000,
      }
    );

    await act(async () => await user.click(button));

    await waitFor(
      () =>
        expect(screen.getByTestId(EXPAND_WRAPPER_TEST_ID)).toHaveStyle(
          "height: 0px;"
        ),
      {
        timeout: 500,
      }
    );
  });
});
