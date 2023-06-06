import React from "react";
import { render } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader", () => {
  it("should render the loader component", () => {
    const { getByTestId } = render(<Loader />);
    const loaderComponent = getByTestId("loader");
    expect(loaderComponent).toBeInTheDocument();
  });
});
