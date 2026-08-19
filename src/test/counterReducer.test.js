import {describe, test, expect} from "vitest";
import counterReducer from "../reducers/counterReducer";

describe("counterReducer", () => {
  test("increments the counter", () => {
    const initialState = {past: [], present: 0, future: []};
    const action = {type: "increment"};
    const newState = counterReducer(initialState, action);
    expect(newState.present).toBe(1);
  });

  test("decrements the counter", () => {
    const initialState = {past: [], present: 0, future: []};
    const action = {type: "decrement"};
    const newState = counterReducer(initialState, action);
    expect(newState.present).toBe(-1);
  });

  test("resets the counter", () => {
    const initialState = {past: [], present: 5, future: []};
    const action = {type: "reset"};
    const newState = counterReducer(initialState, action);
    expect(newState.present).toBe(0);
  });

  test("undos the last action", () => {
    const initialState = {past: [0], present: 1, future: []};
    const action = {type: "undo"};
    const newState = counterReducer(initialState, action);
    expect(newState.present).toBe(0);
    expect(newState.past).toEqual([]);
    expect(newState.future).toEqual([1]);
  });

  test("redos the last undone action", () => {
    const initialState = {past: [], present: 0, future: [1]};
    const action = {type: "redo"};
    const newState = counterReducer(initialState, action);
    expect(newState.present).toBe(1);
    expect(newState.past).toEqual([0]);
    expect(newState.future).toEqual([]);
  });
});
