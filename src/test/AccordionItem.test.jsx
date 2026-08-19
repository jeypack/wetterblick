import React from "react";
import {render, screen} from "@testing-library/react";
import {vi} from "vitest";
import userEvent from "@testing-library/user-event";
import AccordionItem from "../components/ui/AccordionItem";

describe("AccordionItem", () => {
  test("renders title and content correctly", () => {
    const title = "Test Title";
    const content = "Test Content";
    const isOpen = true;
    const onClick = vi.fn();
    const ref = React.createRef();

    render(
      <AccordionItem
        title={title}
        content={content}
        isOpen={isOpen}
        onClick={onClick}
        ref={ref}
      />,
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  test("calls onClick when button is clicked", async () => {
    const user = userEvent.setup();
    const title = "Test Title";
    const content = "Test Content";
    const isOpen = false;
    const onClick = vi.fn();
    const ref = React.createRef();

    render(
      <AccordionItem
        title={title}
        content={content}
        isOpen={isOpen}
        onClick={onClick}
        ref={ref}
      />,
    );

    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("renders content only when isOpen is true", () => {
    const title = "Test Title";
    const content = "Test Content";
    const isOpen = false;
    const onClick = vi.fn();
    const ref = React.createRef();

    render(
      <AccordionItem
        title={title}
        content={content}
        isOpen={isOpen}
        onClick={onClick}
        ref={ref}
      />,
    );

    expect(screen.queryByText(content)).not.toBeInTheDocument();
  });
});
