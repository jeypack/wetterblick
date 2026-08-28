import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaFavorite } from "../schemas/favorite";
import styles from "../Styles";
import InputField from "./InputField";
import Button from "./ui/Button";
import ThemeButton from "./ui/ThemeButton";

const FavoriteForm = ({
  btnLabels = { confirm: "Hinzufügen", cancel: "Abbrechen" },
  onConfirm,
  onCancel,
  formTitle,
  formLocation,
  defaultValues = { title: "", note: "" },
}) => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    //setFocus,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schemaFavorite),
    defaultValues,
  });

  async function onSubmit(data) {
    const { title, note } = data;
    try {
      // Handle favorite form submission logic here
      onConfirm({ title, note }); // Call the onConfirm callback with the favorite data
      reset(); // Reset the form after successful submission
    } catch (err) {
      setError("Favorite form submission failed");
    }
  }

  return (
    <form
      className="flex flex-col justify-center items-center gap-4 w-full p-4 rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-md font-bold text-neutral-500 dark:text-olive-300">
        {formTitle +
          (formLocation ? ` von ${formLocation.name}, ${formLocation.country}` : "")}
      </p>
      <InputField
        defaultValue={defaultValues.title}
        label=""
        registration={register("title")}
        placeholder="Titel"
      />
      <textarea
        className={"w-full " + styles.input}
        placeholder="Erstelle eine Notiz zu deinem Ort"
        rows={4}
        {...register("note")}
        defaultValue={defaultValues.note}
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      {errors.note && <p className="text-red-500 text-sm">{errors.note.message}</p>}
      <Button
        type="button"
        className={styles.navlink + " focus:outline-none overflow-hidden"}
        onClick={() => reset()}
      >
        Formular leeren
      </Button>
      <div className="flex gap-4">
        <ThemeButton type="submit" disabled={isSubmitting}>
          {btnLabels.confirm}
        </ThemeButton>
        <ThemeButton onClick={onCancel} type="button">
          {btnLabels.cancel}
        </ThemeButton>
      </div>
    </form>
  );
};

export default React.memo(FavoriteForm);
