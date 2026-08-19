import styles from "../../Styles";

export default function Checkbox({label, checked, onChange}) {
  return (
    <>
      <label htmlFor={label} className="text-xs text-gray-400">
        {label}
      </label>
      <input
        id={label}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className={styles.checkbox}
      />
    </>
  );
}
