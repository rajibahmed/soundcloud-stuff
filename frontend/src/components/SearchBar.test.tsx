import React from "react";
import SearchBar from "./SearchBar";
import { render } from "@testing-library/react";

test("Link changes the class when hovered", () => {
  const noop = () => {};
  const component = render(<SearchBar setQuery={noop} />);

  expect(component.asFragment()).toMatchSnapshot();
});
