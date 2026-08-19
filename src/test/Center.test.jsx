import {render, screen} from "@testing-library/react";
import {describe, expect, test} from "vitest";
import Center from "../components/Center";

describe("Center", () => {
  test("renders its children", () => {
    render(
      <Center>
        <span>Hallo</span>
      </Center>,
    );

    expect(screen.getByText("Hallo")).toBeInTheDocument();
    expect(screen.getByText("Hallo").parentElement).toHaveClass(
      "flex",
      "justify-center",
      "items-center",
      "w-full",
    );
  });
});
