import {useReducer} from "react";
import {Button} from "@headlessui/react";
import counterReducer, {initialState} from "../reducers/counterReducer";

export default function CounterHistory() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  const buttonClass =
    "cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md m-2";

  return (
    <div className="flex flex-col items-center justify-center p-4 border rounded-md shadow-md">
      <div className="flex flex-col items-center justify-center p-4 border border-gray-500 rounded-md shadow-md mb-4">
        <h5>Use reducer with Counter History <span className="text-sm text-neutral-400">{"{"}[past] | present | [future]{"}"}</span></h5>
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
        <div data-testid="state-present" className="text-amber-600 text-3xl text-center font-bold">
          {state.present}
        </div>
      </div>
      <div>
        <p className="text-lg font-bold">
          Undo/Redo Pointer: {state.past.length}
        </p>
        <Button
          className={buttonClass}
          disabled={state.past.length === 0}
          onClick={() => dispatch({type: "undo"})}
        >
          Undo
        </Button>
        <Button
          className={buttonClass}
          disabled={state.future.length === 0}
          onClick={() => dispatch({type: "redo"})}
        >
          Redo
        </Button>
      </div>
      <div className="block mt-4">
        <p>Event Tracking:</p>
        <ul>
          {state.past.map((value, index) => {
            return (
              <li className="cursor-pointer text-sm" key={index}>
                Value: {value}
              </li>
            );
          })}
          <li className="cursor-pointer text-sm text-green-500">
            Present: {state.present}
          </li>
          {state.future.map((value, index) => {
            return (
              <li className="cursor-pointer text-sm" key={index}>
                Value: {value}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
