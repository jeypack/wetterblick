import Badge from "../components/ui/Badge";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Badge component", () => {
  test("renders the badge with the correct text", () => {
    const text = "Test Badge";
    const onClick = vi.fn();

    render(<Badge text={text} onClick={onClick} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test("calls onClick when the badge is clicked", async () => {
    const user = userEvent.setup();
    const text = "Test Badge";
    const onClick = vi.fn();

    render(<Badge text={text} onClick={onClick} />);

    await user.click(screen.getByText(text));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});