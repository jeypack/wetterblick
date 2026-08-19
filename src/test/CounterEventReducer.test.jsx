import counterEventReducer from "../reducers/counterEventReducer";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CounterEventReducer from "../components/CounterEventReducer";

describe("CounterEventReducer component", () => {
  test("renders without crashing", () => {
    // Render the CounterEventReducer component and check if it renders without errors
    render(<CounterEventReducer />);
  });

  test("initial state is correct", () => {
    // Render the CounterEventReducer component and check the initial state
    const {getByTestId} = render(<CounterEventReducer />);
    const statePresent = getByTestId("state-present");
    expect(statePresent.textContent).toBe("0");
  });

  test("increment button works", async () => {
    const user = userEvent.setup();
    // Render the CounterEventReducer component, click the increment button, and check the state
    const {getByText, getByTestId} = render(<CounterEventReducer />);
    const incrementButton = getByText("Increment");
    await user.click(incrementButton);
    const statePresent = getByTestId("state-present");
    expect(statePresent.textContent).toBe("1");
  });

  test("decrement button works", async () => {
    const user = userEvent.setup();
    // Render the CounterEventReducer component, click the decrement button, and check the state
    const {getByText, getByTestId} = render(<CounterEventReducer />);
    const decrementButton = getByText("Decrement");
    await user.click(decrementButton);
    const statePresent = getByTestId("state-present");
    expect(statePresent.textContent).toBe("-1");
  });

  test("reset button works", async () => {
    const user = userEvent.setup();
    // Render the CounterEventReducer component, click the reset button, and check the state
    const {getByText, getByTestId} = render(<CounterEventReducer />);
    const incrementButton = getByText("Increment");
    await user.click(incrementButton);
    const resetButton = getByText("Reset");
    await user.click(resetButton);
    const statePresent = getByTestId("state-present");
    expect(statePresent.textContent).toBe("0");
  });

  test("undo button works", async () => {
    const user = userEvent.setup();
    // Render the CounterEventReducer component, perform some actions, click the undo button, and check the state
    const {getByText, getByTestId} = render(<CounterEventReducer />);
    const incrementButton = getByText("Increment");
    await user.click(incrementButton);
    const undoButton = getByText("Undo");
    await user.click(undoButton);
    const statePresent = getByTestId("state-present");
    expect(statePresent.textContent).toBe("0");
  });

  test("redo button works", async () => {
    const user = userEvent.setup();
    // Render the CounterEventReducer component, perform some actions, click the redo button, and check the state
    const {getByText, getByTestId} = render(<CounterEventReducer />);
    const incrementButton = getByText("Increment");
    await user.click(incrementButton);
    const undoButton = getByText("Undo");
    await user.click(undoButton);
    const redoButton = getByText("Redo");
    await user.click(redoButton);
    const statePresent = getByTestId("state-present");
    expect(statePresent.textContent).toBe("1");
  });

  test("Increment → Increment → Undo → Redo sequence works correctly", async () => {
    const user = userEvent.setup();
    // Render the CounterEventReducer component, perform a sequence of actions, and check the final state
    const {getByText, getByTestId} = render(<CounterEventReducer />);
    const incrementButton = getByText("Increment");
    await user.click(incrementButton);
    await user.click(incrementButton);
    const undoButton = getByText("Undo");
    await user.click(undoButton);
    const redoButton = getByText("Redo");
    await user.click(redoButton);
    const statePresent = getByTestId("state-present");
    expect(statePresent.textContent).toBe("2");
  });
});
