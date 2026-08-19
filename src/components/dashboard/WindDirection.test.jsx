import {render, screen} from "@testing-library/react";
import WindDirection from "./WindDirection";

describe("WindDirection component", () => {
  test("renders the arrow SVG correctly", () => {
    render(<WindDirection angle={45} size={100} className="test-class" />);
    const svgElement = screen
      .getByTestId("wind-direction-svg")
      .getElementsByTagName("svg")[0];
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("width", "30");
    expect(svgElement).toHaveAttribute("height", "40");
    expect(svgElement).toHaveAttribute("viewBox", "0 0 30 40");
  });

  test("rotates arrow based on angle prop", () => {
    render(<WindDirection angle={90} />);
    const arrowElement = screen.getByTestId("wind-direction-svg");
    expect(arrowElement).toHaveStyle("transform: rotate(90deg)");
  });

  /* .querySelector("line") */

  test("displays correct direction based on angle prop", () => {
    render(<WindDirection angle={90} />);
    const directionElement = screen.getByText("E");
    expect(directionElement).toBeInTheDocument();
  });

  test("rounds angle to nearest wind direction", () => {
    render(<WindDirection angle={80} />);

    expect(screen.getByText("E")).toBeInTheDocument();
  });
});
