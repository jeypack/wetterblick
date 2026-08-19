import styles from "../Styles";
//"flex flex-col justify-center items-center gap-2 max-w-lg p-4 rounded-md";
//const classNameContainer = "p-4 rounded-md relative";
const classNameLabel = "text-xs text-gray-400";

export default function InputField({
  type = "text",
  label = "",
  placeholder = "",
  className = "",
  ref,
  registration = {},
  value,
  onBlur,
  onFocus,
  onChange,
  onValueChange,
  required = false,
}) {
  return (
    <>
      {label && (
        <label htmlFor={label} className={className || classNameLabel}>
          {label}
        </label>
      )}
      <input
        id={label}
        type={type}
        className={styles.input}
        placeholder={placeholder}
        ref={ref}
        value={value}
        required={required}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e) => {
          // Normales React-Event weiterreichen
          onChange?.(e);

          // Komfort-API: nur den Wert weiterreichen
          onValueChange?.(e.target.value);
        }}
        {...registration}
      />
    </>
  );
}
