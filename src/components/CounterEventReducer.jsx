import {useState, useReducer} from "react";
import React from "react";
import counterEventReducer, {
  initialState,
} from "../reducers/counterEventReducer";

export default function CounterEventReducer() {
  const [state, dispatch] = useReducer(counterEventReducer, initialState);

  const buttonClass =
    "cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md m-2";

  return (
    <div className="flex flex-col items-center justify-center mb-4 p-4 border rounded-md shadow-md max-w-2xl">
      <h4 className="text-lg font-bold mb-2">Counter with Event Reducer</h4>
      <p data-testid="state-present" className="text-amber-600 text-3xl text-center font-bold">
        {state.value}
      </p>
      <div className="flex flex-row justify-center items-center gap-4 w-full p-4 rounded-md">
        <button
          className={buttonClass}
          onClick={() => dispatch({type: "increment"})}
        >
          Increment
        </button>

        <button
          className={buttonClass}
          onClick={() => dispatch({type: "decrement"})}
        >
          Decrement
        </button>

        <button
          className={buttonClass}
          onClick={() => dispatch({type: "reset"})}
        >
          Reset
        </button>
      </div>
      <div className="flex flex-row justify-center items-center gap-4 w-full p-4 rounded-md">
        <button
          className={buttonClass}
          onClick={() => dispatch({type: "undo"})}
        >
          Undo
        </button>

        <button
          className={buttonClass}
          onClick={() => dispatch({type: "redo"})}
        >
          Redo
        </button>
      </div>
      <p className="text-sm text-gray-400">Events</p>
      <div className="flex flex-wrap items-center justify-center p-4">
        {state.events.map((event, index) => {
          const active = index === state.pointer;
          return (
            <pre
              key={index}
              className={`text-sm ${active ? "text-blue-500" : "text-gray-300"}`}
            >
              {event.type}
              {index < state.events.length - 1 ? ", " : ""}
            </pre>
          );
        })}
      </div>
    </div>
  );
}
//JSON.stringify(state.events, null, 2)
