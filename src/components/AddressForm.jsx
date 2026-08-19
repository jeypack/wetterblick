import React, {useState} from "react";
import styles from "../Styles";
import InputField from "./InputField";

const ADDRESS = {
  vorname: "Max",
  nachname: "Mustermann",
  strasse: "Musterstraße 1",
  stadt: "12345 Musterstadt",
  land: "Deutschland",
  plz: "12345",
};

/**
 * Controlled component for a sign-in form.
 *
 * @param {*} onSignIn Callback function to be called when the user signs in or out.
 * @returns JSX.Element
 */
export default function AddressForm() {
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [strasse, setStrasse] = useState("");
  const [stadt, setStadt] = useState("");
  const [land, setLand] = useState("");
  const [plz, setPlz] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    // console.log("Vorname:", vorname,"Nachname:", nachname,"Straße:", strasse,"Stadt:", stadt,"Land:", land,"PLZ:", plz);
    if (
      vorname !== "" &&
      nachname !== "" &&
      strasse !== "" &&
      stadt !== "" &&
      land !== "" &&
      plz !== ""
    ) {
      setSuccess(true);
      setTimeout(() => {
        setVorname("");
        setNachname("");
        setStrasse("");
        setStadt("");
        setLand("");
        setPlz("");
      }, 500);
    } else {
      setSuccess(false);
    }
    /* setSuccess(loggedIn);
    if (loggedIn) {
      setEmail("");
      setPassword("");
    }
    if (onSignIn) {
      setTimeout(() => {
        onSignIn(loggedIn);
      }, 500);
    } */
  }

  return (
    <form
      className="flex flex-wrap justify-center items-start gap-4 w-sm md:w-xl border-2 border-amber-900/50 p-4 rounded-md"
      onSubmit={handleSubmit}
    >
      <h2>Adresse</h2>
      <div className="flex flex-col justify-center items-center gap-4 max-w-sm p-4 rounded-md">
        <InputField value={vorname} onValueChange={setVorname} placeholder="Vorname eingeben" />
        <InputField value={nachname} onValueChange={setNachname} placeholder="Nachname eingeben" />
        <InputField value={strasse} onValueChange={setStrasse} placeholder="Straße eingeben" />
      </div>
      <div className="flex flex-col justify-center items-center gap-4 max-w-sm p-4 rounded-md">
        <InputField label="Stadt" value={stadt} onValueChange={setStadt} />
        <InputField label="Land" value={land} onValueChange={setLand} />
        <InputField label="PLZ" value={plz} onValueChange={setPlz} />
      </div>
      <button
        type="submit"
        className="bg-amber-800 text-amber-100 px-4 py-2 rounded-xl cursor-pointer"
      >
        Senden
      </button>
    </form>
  );
}
