import counterEventReducer from "../reducers/counterEventReducer";

describe("counterEventReducer", () => {
  test("should handle increment event", () => {
    const initialState = { events: [], pointer: -1, value: 0 };
    const action = { type: "increment" };
    const newState = counterEventReducer(initialState, action);
    expect(newState.value).toBe(1);
  });

  test("should handle decrement event", () => {
    const initialState = { events: [], pointer: -1, value: 0 };
    const action = { type: "decrement" };
    const newState = counterEventReducer(initialState, action);
    expect(newState.value).toBe(-1);
  });
  
  test("should handle reset event", () => {
    const initialState = { events: [], pointer: -1, value: 42 };
    const action = { type: "reset" };
    const newState = counterEventReducer(initialState, action);
    expect(newState.value).toBe(0);
  });

  test("should handle undo event", () => {
    const initialState = {
      events: [{ type: "increment" }, { type: "increment" }],
      pointer: 1,
      value: 2,
    };
    const action = { type: "undo" };
    const newState = counterEventReducer(initialState, action);
    expect(newState.value).toBe(1);
    expect(newState.pointer).toBe(0);
  });

  test("should handle redo event", () => {
    const initialState = {
      events: [{ type: "increment" }, { type: "increment" }],
      pointer: 0,
      value: 1,
    };
    const action = { type: "redo" };
    const newState = counterEventReducer(initialState, action);
    expect(newState.value).toBe(2);
    expect(newState.pointer).toBe(1);
  });
});
