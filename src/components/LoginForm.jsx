import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../schemas/user";
import styles from "../Styles";
import InputField from "./InputField";
import Button from "./ui/Button";
import { getUserData } from "../firebase/user.repo";

/**
 * Controlled component for a sign-in form.
 *
 * @param {*} onSwitch Callback function to be called when the user wants to switch to the registration form.
 * @returns JSX.Element
 */
export default function LoginForm({ onSwitch }) {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // Autofocus on the first input field when the component mounts
    setFocus("email");
  }, []);

  async function onSubmit(data) {
    const { email, password } = data;
    console.log("email:", email);
    console.log("password:", password);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login erfolgreich!");
      const userData = await getUserData(auth.currentUser.uid);
      const userName = userData?.username;
      console.log("User data userName:", userName);
    } catch (err) {
      setError("Login fehlgeschlagen");
    }
  }

  return (
    <form
      className="flex flex-col justify-center items-center gap-4 w-sm  border-2 border-olive-600 p-4 rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-md font-bold text-neutral-500 dark:text-olive-300">Anmeldung</p>
      <InputField label="" registration={register("email")} placeholder="User Email*" />
      <InputField
        label=""
        registration={register("password")}
        type="password"
        placeholder="User Password*"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}
      <Button
        type="submit"
        className={styles.btn + " focus:outline-none overflow-hidden rounded-full"}
        ffx="ripple"
        ffxMs={500}
        ffxClass="bg-olive-200"
      >
        Anmelden
      </Button>
      <p className="mt-2 text-sm text-neutral-400 dark:text-neutral-300">
        Noch kein Konto?{" "}
      </p>
      <Button
        type="button"
        className={styles.navlink + " focus:outline-none overflow-hidden"}
        onClick={onSwitch}
      >
        Registrieren
      </Button>
    </form>
  );
}

// src/components/Login.jsx
/* 
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login erfolgreich!")
    } catch (err) {
      setError("Login fehlgeschlagen");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      // ...
    </form>
  );
} */
