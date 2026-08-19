import {useRef, useEffect, useState} from "react";
import InputField from "./InputField";

/**
 * Controlled component for a mail form.
 *
 * @param {*} onMailSend Callback function to be called when the user sends a mail.
 * @returns JSX.Element
 */
export default function MailForm() {
  const [msg, setMsg] = useState("");
  const empfaengerRef = useRef(null);
  const betreffRef = useRef(null);
  const nachrichtRef = useRef(null);

  /* useEffect(() => {
    // Autofocus on the first input field when the component mounts
    if (empfaengerRef.current) {
      empfaengerRef.current.focus();
    }
  }, []); */

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Empfänger:", empfaengerRef.current.value);
    console.log("Betreff:", betreffRef.current.value);
    console.log("Nachricht:", nachrichtRef.current.value);
    if (
      empfaengerRef.current.value === "" ||
      betreffRef.current.value === "" ||
      nachrichtRef.current.value === ""
    ) {
      setMsg("Bitte füllen Sie alle Pflichtfelder aus.");
      if (empfaengerRef.current.value === "") {
        empfaengerRef.current.focus();
      } else if (betreffRef.current.value === "") {
        betreffRef.current.focus();
      } else if (nachrichtRef.current.value === "") {
        nachrichtRef.current.focus();
      }
    } else {
      setMsg("Formular erfolgreich gesendet!");
      setTimeout(() => {
        empfaengerRef.current.value = "";
        betreffRef.current.value = "";
        nachrichtRef.current.value = "";
        setMsg("");
      }, 500);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center w-sm md:w-xl border-2 border-amber-900/50 p-2 rounded-md"
    >
      <h2>Kontaktformular</h2>
      <div className="flex flex-col justify-center items-center gap-4 w-full p-4">
        <InputField placeholder="Empfänger Email*" ref={empfaengerRef} />
        <InputField placeholder="Betreff*" ref={betreffRef} />
        <textarea
          ref={nachrichtRef}
          placeholder="Nachricht eingeben"
          className="bg-amber-900 text-white px-3 py-1 w-full h-32 border border-amber-700 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        {msg && <div className="text-xs text-gray-400">{msg}</div>}
        <button
          type="submit"
          className="bg-amber-800 text-amber-100 px-4 py-2 rounded-xl cursor-pointer"
        >
          Senden
        </button>
      </div>
    </form>
  );
}
