import React, {useRef, useEffect} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import schema from "../schemas/user";
import {useUser} from "../hooks/useUser";
import styles from "../Styles";
import InputField from "./InputField";
import Button from "./ui/Button";

/**
 * Controlled component for a sign-in form.
 *
 * @param {*} onSignIn Callback function to be called when the user signs in or out.
 * @returns JSX.Element
 */
export default function LoginForm({onSignIn}) {
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {login, user} = useUser();
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

 /*  useEffect(() => {
    // Autofocus on the first input field when the component mounts
    setFocus("email");
  }, []); */

  async function onSubmit(data) {
    const {email, password} = data;
    console.log("email:", email);
    console.log("password:", password);
    const userData = await login(email, password);
    const authenticated = !!userData;
    console.log("userData:", userData);
    console.log("Authenticated:", authenticated);
    if (authenticated) {
      reset();
    }
  }

  return (
    <form
      className="flex flex-col justify-center items-center gap-4 w-sm  border-2 border-amber-900/50 p-4 rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>Sign In</h2>
      <InputField
        label=""
        registration={register("email")}
        placeholder="User Email*"
      />
      <InputField
        label=""
        registration={register("password")}
        type="password"
        placeholder="User Password*"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}
      <Button
        type="submit"
        className="bg-amber-800 text-amber-100 px-4 py-2 rounded-xl cursor-pointer"
        ffx="ripple"
        ffxMs={500}
        ffxClass="bg-amber-950"
      >
        Sign In
      </Button>
    </form>
  );
}
