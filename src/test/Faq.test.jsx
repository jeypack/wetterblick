import Accordion from "../components/ui/Accordion";
import {render, screen} from "@testing-library/react";
import {vi} from "vitest";
import userEvent from "@testing-library/user-event";
import AccordionItem from "../components/ui/AccordionItem";
import PageTitle from "../components/PageTitle";

/**
 * Integration tests for the Faq component
 */
describe("Faq component", () => {

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

  test("opens the correct accordion item", () => {
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
    const openIndex = 1;
    const onClick = vi.fn();

    render(
      <Accordion
        data={data}
        itemRefs={itemRefs}
        openIndex={openIndex}
        onClick={onClick}
      />,
    );

    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });
});
