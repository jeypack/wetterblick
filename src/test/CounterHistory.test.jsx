import { describe, test, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import CounterHistory from "../components/CounterHistory";

describe("CounterHistory", () => {
  test("renders without crashing", () => {
    // Render the CounterHistory component and check if it renders without errors
    render(<CounterHistory />);
  });

  test("initial state is correct", () => {
    // Render the CounterHistory component and check the initial state
    const { getByText, getByTestId } = render(<CounterHistory />);
    const statePresent = getByTestId("state-present");
    expect(statePresent.textContent).toBe("0");
  });

  test("increment button works", () => {
    // Render the CounterHistory component, click the increment button, and check the state
    const { getByText, getByTestId } = render(<CounterHistory />);
    const incrementButton = getByText("Increment");
    fireEvent.click(incrementButton);
    const statePresent = getByTestId("state-present");
    expect(statePresent.textContent).toBe("1");
  });

  test("decrement button works", () => {
    // Render the CounterHistory component, click the decrement button, and check the state
    const { getByText, getByTestId } = render(<CounterHistory />);
    const decrementButton = getByText("Decrement");
    fireEvent.click(decrementButton);
    const statePresent = getByTestId("state-present");
    expect(statePresent.textContent).toBe("-1");
  });

  test("reset button works", () => {
    // Render the CounterHistory component, click the reset button, and check the state
    const { getByText, getByTestId } = render(<CounterHistory />);
    const incrementButton = getByText("Increment");
    fireEvent.click(incrementButton);
    const resetButton = getByText("Reset");
    fireEvent.click(resetButton);
    const statePresent = getByTestId("state-present");
    expect(statePresent.textContent).toBe("0");
  });

  test("undo button works", () => {
    // Render the CounterHistory component, perform some actions, click the undo button, and check the state
    const { getByText, getByTestId } = render(<CounterHistory />);
    const incrementButton = getByText("Increment");
    fireEvent.click(incrementButton);
    const undoButton = getByText("Undo");
    fireEvent.click(undoButton);
    const statePresent = getByTestId("state-present");
    expect(statePresent.textContent).toBe("0");
  });

  test("redo button works", () => {
    // Render the CounterHistory component, perform some actions, click the redo button, and check the state
    const { getByText, getByTestId } = render(<CounterHistory />);
    const incrementButton = getByText("Increment");
    fireEvent.click(incrementButton);
    const undoButton = getByText("Undo");
    fireEvent.click(undoButton);
    const redoButton = getByText("Redo");
    fireEvent.click(redoButton);
    const statePresent = getByTestId("state-present");
    expect(statePresent.textContent).toBe("1");
  });
});