export const initialState = {
  events: [],
  pointer: -1,
  value: 0,
};

const MAX_HISTORY = 20;

function applyEvent(value, event) {
  switch (event.type) {
    case "increment":
      return value + 1;

    case "decrement":
      return value - 1;

    case "reset":
      return 0;

    default:
      return value;
  }
}

function getValue(events, pointer) {
  return events.slice(0, pointer + 1).reduce(applyEvent, 0);
}

export default function counterEventReducer(state, action) {
  switch (action.type) {
    // ─────────────────────────────
    // Neue Events
    // ─────────────────────────────
    case "increment":
    case "decrement":
    case "reset": {
      // Alles hinter dem Pointer ist "future"
      // und wird durch eine neue Action verworfen.
      let events = [...state.events.slice(0, state.pointer + 1), action];

      // Ältestes Event entfernen
      if (events.length > MAX_HISTORY) {
        events = events.slice(-MAX_HISTORY);
      }

      const pointer = events.length - 1;
      // Aktiven Event-Stream rekonstruieren
      const value = getValue(events, pointer);

      return {
        events,
        pointer,
        value,
      };
    }

    // ─────────────────────────────
    // Undo
    // ─────────────────────────────
    case "undo": {
      if (state.pointer < 0) {
        return state;
      }

      const pointer = state.pointer - 1;
      const value = getValue(state.events, pointer);

      return {
        ...state,
        pointer,
        value,
      };
    }

    // ─────────────────────────────
    // Redo
    // ─────────────────────────────
    case "redo": {
      if (state.pointer >= state.events.length - 1) {
        return state;
      }

      const pointer = state.pointer + 1;
      const value = getValue(state.events, pointer);

      return {
        ...state,
        pointer,
        value,
      };
    }

    default:
      return state;
  }
}
