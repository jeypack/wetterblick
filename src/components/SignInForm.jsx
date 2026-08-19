import React, {useState, useRef, useEffect} from "react";
import styles from "../Styles";
import InputField from "./InputField";

const EMAIL_USER = "jeypack2014@gmail.com";
const PASSWORD_USER = "123456";

/**
 * Controlled component for a sign-in form.
 *
 * @param {*} onSuccess Callback function to be called when the user signs in or out.
 * @returns JSX.Element
 */
export default function SignInForm({onSuccess}) {
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  /* useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []); */

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Email:", emailRef.current.value);
    console.log("Password:", passwordRef.current.value);
    const loggedIn =
      emailRef.current.value === EMAIL_USER &&
      passwordRef.current.value === PASSWORD_USER;
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
    if (typeof onSuccess === "function") {
      setTimeout(() => {
        onSuccess(loggedIn);
      }, 500);
    }
  }

  // autofill hack: https://stackoverflow.com/questions/60616796/tailwind-css-autofill-input-styling
  // const inputClassName =
  //   "bg-amber-900 text-white p-3 autofill:shadow-[inset_0_0_0_1000px_var(--color-amber-800)] autofill:[-webkit-text-fill-color:var(--color-amber-50)]";

  return (
    <form
      className="flex flex-col justify-center items-center gap-4 max-w-sm border-2 border-amber-900/50 p-4 rounded-md"
      onSubmit={handleSubmit}
    >
      <h2>Sign In</h2>
      <InputField label="Email" ref={emailRef} />
      <InputField label="Password" ref={passwordRef} type="password" />
      <button
        type="submit"
        className="bg-amber-800 text-amber-100 px-4 py-2 rounded-xl cursor-pointer"
      >
        Sign In
      </button>
    </form>
  );
}
