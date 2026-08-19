import {produce} from "immer";
import immerTaskReducer, {initialState} from "../reducers/addressFormReducer";

describe("AddressFormReducer", () => {
  test("should update the title field", () => {
    const action = {
      type: "UPDATE_TITLE",
      value: "Hello World",
    };

    const newState = produce(initialState, (draft) => {
      immerTaskReducer(draft, action);
    });

    expect(newState.title).toBe("Hello World");
  });

  test("should update the name field when UPDATE_NAME action is dispatched", () => {
    const action = {
      type: "UPDATE_NAME",
      field: "vorname",
      value: "John",
    };
    const newState = produce(initialState, (draft) => {
      immerTaskReducer(draft, action);
    });

    expect(newState.name.vorname).toBe("John");
  });

  test("should update the address field when UPDATE_ADDRESS action is dispatched", () => {
    const action = {
      type: "UPDATE_ADDRESS",
      field: "strasse",
      value: "Main Street",
    };
    const newState = produce(initialState, (draft) => {
      immerTaskReducer(draft, action);
    });
    expect(newState.address.strasse).toBe("Main Street");
  });

  test("should reset the state to initial state when RESET action is dispatched", () => {
    const modifiedState = {
      title: "Hello World",
      name: {vorname: "John", nachname: "Doe"},
      address: {
        strasse: "Main Street",
        nummer: "123",
        stadt: "City",
        land: "Country",
        plz: "12345",
      },
    };
    const action = {type: "RESET"};
    const newState = produce(modifiedState, (draft) => {
      immerTaskReducer(draft, action);
    });
    expect(newState).toEqual(initialState);
  });
});
