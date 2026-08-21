import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createUserData } from "../firebase/user.repo";
import { auth } from "../firebase/config";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../schemas/user";
import styles from "../Styles";
import InputField from "./InputField";
import Button from "./ui/Button";

/**
 * Controlled component for a registration form.
 * @returns JSX.Element
 */
export default function RegisterForm({ onSwitch }) {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schemaRegister),
  });

  useEffect(() => {
    // Autofocus on the first input field when the component mounts
    setFocus("email");
  }, []);

  async function onSubmit(data) {
    const { email, password, username } = data;
    console.log("email:", email);
    console.log("password:", password);
    console.log("username:", username);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registrierung erfolgreich!");
      await updateProfile(auth.currentUser, { displayName: username });
      // Create user data in Firestore without username, since it's already set in the auth profile
      await createUserData(auth.currentUser.uid);
    } catch (err) {
      setError("Registrierung fehlgeschlagen");
    }
  }

  return (
    <form
      className="flex flex-col justify-center items-center gap-4 w-sm  border-2 border-olive-600 p-4 rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-md font-bold text-neutral-500 dark:text-olive-300">
        Registrierung
      </p>
      <InputField label="" registration={register("username")} placeholder="User Name*" />
      <InputField label="" registration={register("email")} placeholder="User Email*" />
      <InputField
        label=""
        registration={register("password")}
        type="password"
        placeholder="User Password*"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username.message}</p>
      )}
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
        Registrieren
      </Button>
      <Button
        type="button"
        className={styles.navlink + " focus:outline-none overflow-hidden"}
        onClick={onSwitch}
      >
        Zur Anmeldung
      </Button>
    </form>
  );
}
