import {useRef, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {object, string, number, date} from "yup";
import styles from "../Styles";
import InputField from "./InputField";
import Button from "./ui/Button";

const schema = object({
  email: string()
    .email("Bitte eine gültige Email eingeben.")
    .required("Bitte eine Email eingeben."),
  subject: string()
    .max(30, "Betreff darf maximal 30 Zeichen lang sein.")
    .required("Bitte einen Betreff eingeben."),
  message: string()
    .max(500, "Nachricht darf maximal 500 Zeichen lang sein.")
    .required("Bitte eine Nachricht eingeben."),
});

/**
 * Controlled component for a mail form.
 *
 * @param {*} onMailSend Callback function to be called when the user sends a mail.
 * @returns JSX.Element
 */
export default function MailFormValidation() {
  const [msg, setMsg] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: {errors, isSubmitting},
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  /* useEffect(() => {
    // Autofocus on the first input field when the component mounts
    setFocus("email");
  }, []); */

  async function onSubmit(data) {
    // data.preventDefault();
    console.log("Empfänger:", data.email);
    console.log("Betreff:", data.subject);
    console.log("Nachricht:", data.message);
    console.log("isSubmitting:", isSubmitting);
    // Simulate a delay for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMsg("Formular erfolgreich gesendet!");
    setTimeout(() => {
      reset({email: "", subject: "", message: ""});
      setMsg("");
    }, 1000);
  }
  //console.log((errors.email));
  function handleClick() {
    console.log("handleClick called");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center w-sm md:w-xl border-2 border-amber-900/50 p-2 rounded-md"
    >
      <h2>MailFormValidation</h2>
      <div className="flex flex-col justify-center items-center gap-4 w-full p-4">
        <InputField
          registration={register("email")}
          placeholder="Empfänger Email*"
        />
        <InputField registration={register("subject")} placeholder="Betreff*" />
        <textarea
          {...register("message")}
          placeholder="Nachricht eingeben"
          className="bg-amber-900 text-white px-3 py-1 w-full h-32 border border-amber-700 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        {/* <InputField
          registration={register("email", {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
          placeholder="Empfänger Email*"
        />
        <InputField
          registration={register("subject", {required: true, maxLength: 30})}
          placeholder="Betreff*"
        />
        <textarea
          {...register("message", {required: true, maxLength: 500})}
          placeholder="Nachricht eingeben"
          className="bg-amber-900 text-white px-3 py-1 w-full h-32 border border-amber-700 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
        /> */}
        {msg && <div className="text-xs text-gray-400">{msg}</div>}
        {errors.email && (
          <div className="text-xs text-gray-400">
            Bitte eine gültige Email eingeben.
          </div>
        )}
        {!errors.email && errors.subject && (
          <div className="text-xs text-gray-400">
            Bitte einen Betreff eingeben.
          </div>
        )}
        {!errors.email && !errors.subject && errors.message && (
          <div className="text-xs text-gray-400">
            Bitte eine Nachricht eingeben.
          </div>
        )}
        <Button
          type="submit"
          className="bg-amber-800 text-amber-100 px-4 py-2 rounded-xl cursor-pointer"
          ffxMs={500}
          ffxClass="bg-amber-100"
          /* onClick={handleClick} */
        >
          Senden
        </Button>
      </div>
    </form>
  );
}
