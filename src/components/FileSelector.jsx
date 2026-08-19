import React, {useState} from "react";
import styles from "../Styles";
import InputField from "./InputField";

/**
 * Controlled component for a file selector form.
 *
 * @param {*} onFileSelect Callback function to be called when a file is selected.
 * @returns JSX.Element
 */
export default function FileSelector() {
  const fileInputRef = React.useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    if (fileInputRef.current && fileInputRef.current.files.length > 0) {
      console.log("Selected file:", fileInputRef.current.files[0]);
      alert("Selected file: " + fileInputRef.current.files[0].name);
    } else {
      console.log("No file selected.");
      alert("No file selected.");
    }
  }

  return (
    <form
      className="flex flex-col justify-center items-center gap-4 max-w-sm border-2 border-amber-900/50 p-4 rounded-md"
      onSubmit={handleSubmit}
    >
      <InputField type="file" label="Select File" ref={fileInputRef} />
      {/* <input type="file" className={styles.input} ref={fileInputRef} /> */}
      <button
        type="submit"
        className="bg-amber-800 text-amber-100 px-4 py-2 rounded-xl cursor-pointer"
      >
        Upload
      </button>
    </form>
  );
}
