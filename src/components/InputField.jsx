import styles from "../Styles";
//"flex flex-col justify-center items-center gap-2 max-w-lg p-4 rounded-md";
//const classNameContainer = "p-4 rounded-md relative";
const classNameLabel = "text-xs text-gray-400";

/**
 * InputField component for rendering a customizable input field with optional label and various event handlers.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.type="text"] - The type of the input field.
 * @param {string} [props.label=""] - The label for the input field.
 * @param {string} [props.placeholder=""] - The placeholder text for the input field.
 * @param {string} [props.className=""] - The custom class name for the input field.
 * @param {React.Ref} [props.ref] - The ref for the input field.
 * @param {Object} [props.registration={}] - The registration object for react-hook-form.
 * @param {string} [props.value] - The value of the input field.
 * @param {Function} [props.onBlur] - The onBlur event handler.
 * @param {Function} [props.onFocus] - The onFocus event handler.
 * @param {Function} [props.onChange] - The onChange event handler.
 * @param {Function} [props.onValueChange] - The onValueChange event handler.
 * @param {boolean} [props.required=false] - Whether the input field is required.
 * @returns {JSX.Element} The rendered input field component.
 */
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
