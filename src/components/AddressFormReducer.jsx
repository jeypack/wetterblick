import React, {useState, useReducer} from "react";
import {useImmerReducer} from "use-immer";
import styles from "../Styles";
import InputField from "./InputField";
import immerTaskReducer, {initialState} from "../reducers/addressFormReducer";

/**
 * Controlled component for a sign-in form.
 *
 * @param {*} onSuccess Callback function to be called when the user sends the form successfully.
 * @returns JSX.Element
 */
export default function AddressFormReducer({onSuccess}) {
  const [state, dispatch] = useImmerReducer(immerTaskReducer, initialState);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  function isValid() {
    return (
      state.name.vorname !== "" &&
      state.name.nachname !== "" &&
      state.address.strasse !== "" &&
      state.address.stadt !== "" &&
      state.address.land !== "" &&
      state.address.plz !== "" &&
      state.address.nummer !== ""
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isValid()) {
      //console.log("name:", state.name);
      //console.log("address:", state.address);
      setPending(true);
      setError(false);
      setTimeout(() => {
        setSuccess(true);
        setTimeout(() => {
          setPending(false);
          setSuccess(false);
          dispatch({type: "RESET"});
          if (typeof onSuccess === "function") {
            onSuccess();
          }
        }, 1000);
      }, 500);
    } else {
      setSuccess(false);
      setError(true);
    }
  }

  const handleFocus = (event) => {
    const input = event.target;
    input.select();
    input.scrollIntoView({behavior: "smooth", block: "center"});
  };

  return (
    <form
      className="flex flex-col justify-center items-start gap-4 w-sm md:w-xl border-2 border-amber-900/50 p-4 rounded-md"
      onSubmit={handleSubmit}
    >
      <h2>Adresse mit Immer</h2>
      <div className="flex flex-row justify-center items-start gap-4 w-full p-4 rounded-md">
        <div className="flex flex-col justify-center items-start gap-4 w-full p-4 rounded-md">
          <InputField
            value={state.name.vorname}
            onValueChange={(value) => dispatch({type: "UPDATE_VORNAME", value})}
            onFocus={handleFocus}
            placeholder="Vorname eingeben"
          />
          <InputField
            value={state.name.nachname}
            onValueChange={(value) =>
              dispatch({type: "UPDATE_NACHNAME", value})
            }
            onFocus={handleFocus}
            placeholder="Nachname eingeben"
          />
          <InputField
            value={state.address.strasse}
            onValueChange={(value) => dispatch({type: "UPDATE_STRASSE", value})}
            onFocus={handleFocus}
            placeholder="Straße eingeben"
          />
          <InputField
            value={state.address.nummer}
            onValueChange={(value) => dispatch({type: "UPDATE_NUMMER", value})}
            onFocus={handleFocus}
            placeholder="Hausnummer eingeben"
          />
        </div>
        <div className="flex flex-col justify-center items-start gap-4 w-full p-4 rounded-md">
          <InputField
            value={state.address.stadt}
            onValueChange={(value) => dispatch({type: "UPDATE_STADT", value})}
            onFocus={handleFocus}
            placeholder="Stadt eingeben"
          />
          <InputField
            value={state.address.land}
            onValueChange={(value) => dispatch({type: "UPDATE_LAND", value})}
            onFocus={handleFocus}
            placeholder="Land eingeben"
          />
          <InputField
            value={state.address.plz}
            onValueChange={(value) => dispatch({type: "UPDATE_PLZ", value})}
            onFocus={handleFocus}
            placeholder="PLZ eingeben"
          />
        </div>
      </div>
      <div className="flex flex-col justify-around items-center gap-4 w-full p-4 rounded-md">
        <button
          type="submit"
          className="bg-amber-800 text-amber-100 px-4 py-2 rounded-xl cursor-pointer"
        >
          {pending ? "Wird gesendet..." : "Senden"}
        </button>
        <p className="text-sm font-bold px-4 h-2">
          {success ? (
            <span className="text-green-600">Daten erfolgreich gesendet!</span>
          ) : error ? (
            <span className="text-red-600">
              Formular nicht vollständig oder korrekt ausgefüllt!
            </span>
          ) : null}
        </p>
      </div>
    </form>
  );
}
