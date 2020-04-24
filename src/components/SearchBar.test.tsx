import React from "react";
import SearchBar from "./SearchBar";
import { render } from "@testing-library/react";

describe("SearchBar", () => {
  test("Default view", () => {
    const noop = () => {};
    const component = render(<SearchBar setQuery={noop} />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
