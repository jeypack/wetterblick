import {render, screen} from "@testing-library/react";
import {describe, test, expect, vi} from "vitest";
import userEvent from "@testing-library/user-event";
import InputField from "../components/InputField";

describe("InputField", () => {
  test("calls onValueChange with the entered value", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(<InputField label="Name" onValueChange={onValueChange} />);

    const input = screen.getByLabelText("Name");

    await user.type(input, "Jörg");

    expect(onValueChange).toHaveBeenCalledWith("Jörg");
  });

  test("calls onChange with the event", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<InputField label="Name" onChange={onChange} />);

    const input = screen.getByLabelText("Name");

    await user.type(input, "Jörg");

    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0].target.value).toBe("Jörg");
  });

  test("renders the label and placeholder correctly", () => {
    render(<InputField label="Name" placeholder="Enter your name" />);

    const label = screen.getByText("Name");
    const input = screen.getByPlaceholderText("Enter your name");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test("renders without label when label prop is not provided", () => {
    render(<InputField placeholder="Enter your name" />);

    const label = screen.queryByText("Name");
    const input = screen.getByPlaceholderText("Enter your name");

    expect(label).not.toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test("renders with the correct type", () => {
    render(<InputField label="Password" type="password" />);

    const input = screen.getByLabelText("Password");

    expect(input).toHaveAttribute("type", "password");
  });
});
