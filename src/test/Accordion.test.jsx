import Accordion from "../components/ui/Accordion";
import {render, screen} from "@testing-library/react";
import {vi} from "vitest";
import userEvent from "@testing-library/user-event";
import AccordionItem from "../components/ui/AccordionItem";

/**
 * Integration tests for Accordion and AccordionItem components
 */
describe("Accordion component", () => {
  test("renders all accordion items", () => {
    const data = [
      {
        title: "Hilfe und Support",
        content: "Content 1",
        toc: "Hilfe und Support",
      },
      {
        title: "Allgemeine Fragen",
        content: "Content 2",
        toc: "Allgemeine Fragen",
      },
    ];
    const itemRefs = {current: []};
    const openIndex = 0;
    const onClick = vi.fn();

    render(
      <Accordion
        data={data}
        itemRefs={itemRefs}
        openIndex={openIndex}
        onClick={onClick}
      />,
    );

    expect(screen.getByText("Hilfe und Support")).toBeInTheDocument();
    expect(screen.getByText("Allgemeine Fragen")).toBeInTheDocument();
  });

  test("calls onClick when an accordion item is clicked", async () => {
    const user = userEvent.setup();
    const data = [
      {
        title: "Hilfe und Support",
        content: "Content 1",
        toc: "Hilfe und Support",
      },
      {
        title: "Allgemeine Fragen",
        content: "Content 2",
        toc: "Allgemeine Fragen",
      },
    ];
    const itemRefs = {current: []};
    const openIndex = 0;
    const onClick = vi.fn();

    render(
      <Accordion
        data={data}
        itemRefs={itemRefs}
        openIndex={openIndex}
        onClick={onClick}
      />,
    );

    await user.click(screen.getByText("Allgemeine Fragen"));
    expect(onClick).toHaveBeenCalledWith(1);
  });

  test("renders content of the open accordion item", () => {
    const data = [
      {
        title: "Hilfe und Support",
        content: "Content 1",
        toc: "Hilfe und Support",
      },
      {
        title: "Allgemeine Fragen",
        content: "Content 2",
        toc: "Allgemeine Fragen",
      },
    ];
    const itemRefs = {current: []};
    const openIndex = 0;
    const onClick = vi.fn();

    render(
      <Accordion
        data={data}
        itemRefs={itemRefs}
        openIndex={openIndex}
        onClick={onClick}
      />,
    );

    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
  });
});
