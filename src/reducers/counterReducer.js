export const initialState = {
  past: [],
  present: 0,
  future: [],
};

const MAX_HISTORY = 20;

export default function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        past: [...state.past, state.present].slice(-MAX_HISTORY),
        present: state.present + 1,
        future: [],
      };

    case "decrement":
      return {
        past: [...state.past, state.present].slice(-MAX_HISTORY),
        present: state.present - 1,
        future: [],
      };

    case "reset":
      return {
        past: [...state.past, state.present].slice(-MAX_HISTORY),
        present: 0,
        future: [],
      };

    case "undo": {
      if (state.past.length === 0) {
        return state;
      }

      const previous = state.past[state.past.length - 1];

      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
      };
    }

    case "redo": {
      if (state.future.length === 0) {
        return state;
      }

      const next = state.future[0];

      return {
        past: [...state.past, state.present],
        present: next,
        future: state.future.slice(1),
      };
    }

    default:
      return state;
  }
}

/* type State = {
    past: number[];
    present: number;
    future: number[];
};

type Action =
    | { type: "increment" }
    | { type: "decrement" }
    | { type: "reset" }
    | { type: "undo" }
    | { type: "redo" };

const initialState: State = {
    past: [],
    present: 0,
    future: [],
};

function reducer(state: State, action: Action): State {
    switch (action.type) {

        case "increment":
            return {
                past: [...state.past, state.present],
                present: state.present + 1,
                future: [],
            };

        case "decrement":
            return {
                past: [...state.past, state.present],
                present: state.present - 1,
                future: [],
            };

        case "reset":
            return {
                past: [...state.past, state.present],
                present: 0,
                future: [],
            };

        case "undo": {
            if (state.past.length === 0) {
                return state;
            }

            const previous = state.past[state.past.length - 1];

            return {
                past: state.past.slice(0, -1),
                present: previous,
                future: [state.present, ...state.future],
            };
        }

        case "redo": {
            if (state.future.length === 0) {
                return state;
            }

            const next = state.future[0];

            return {
                past: [...state.past, state.present],
                present: next,
                future: state.future.slice(1),
            };
        }

        default:
            return state;
    }
} */
