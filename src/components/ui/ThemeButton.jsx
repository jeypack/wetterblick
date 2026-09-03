import styles from "../../Styles.js";

export default function ThemeButton({
  onClick,
  active,
  className,
  children,
  size,
  ...rest
}) {
  //console.log("ThemeButton: active", active);
  const textSizeClass =
    size === "xs"
      ? "text-xs"
      : size === "sm"
        ? "text-sm"
        : size === "md"
          ? "text-md"
          : "text-base";

  return (
    <button
      onClick={onClick}
      className={
        active
          ? styles.btnActive + " " + textSizeClass + (className ? " " + className : "")
          : styles.btn + " " + textSizeClass + (className ? " " + className : "")
      }
      {...rest}
    >
      {children}
    </button>
  );
}

/* const btnClassName = "cursor-pointer bg-neutral-100 text-neutral-500 border border-neutral-400 hover:border-neutral-500 hover:text-neutral-400 rounded-2xl px-4 py-1 text-sm font-bold dark:bg-neutral-700 dark:text-neutral-200 dark:border-neutral-400 dark:hover:border-neutral-500 dark:hover:text-neutral-400";
  const btnClassNameActive = "cursor-pointer bg-neutral-400 text-neutral-50 border border-neutral-400 hover:border-neutral-500 hover:text-neutral-50 rounded-2xl px-4 py-1 text-sm font-bold dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-400 dark:hover:border-neutral-500 dark:hover:text-neutral-400";
  const btnClassName = "cursor-pointer bg-neutral-100 text-neutral-500 border border-neutral-400 hover:border-neutral-500 hover:text-neutral-400 dark:hover:text-lime-700 dark:bg-lime-500 focus:outline-2 focus:outline-offset-2 focus:outline-neutral-500 active:bg-neutral-700 dark:bg-lime-500 dark:text-white font-bold py-1 px-4 rounded-2xl text-sm transition-colors duration-200 ease-in-out";
  const btnClassNameActive = "bg-neutral-400 text-neutral-50 border border-neutral-400 hover:border-neutral-500 hover:text-neutral-50 dark:hover:border-neutral-500 dark:hover:text-lime-500 dark:bg-lime-500 outline-2 outline-offset-2 dark:outline-lime-600 dark:bg-lime-700 text-white font-bold py-1 px-4 rounded-2xl text-sm transition-colors duration-200 ease-in-out";
  */
/* const btnClassName = "cursor-pointer bg-neutral-100 text-neutral-500 border border-neutral-400 hover:border-neutral-500 hover:text-neutral-400 dark:hover:text-amber-700 dark:bg-amber-500 focus:outline-2 focus:outline-offset-2 focus:outline-neutral-500 active:bg-neutral-700 dark:bg-amber-500 dark:text-white font-bold py-1 px-4 rounded-2xl text-sm transition-colors duration-200 ease-in-out";
  const btnClassNameActive = "bg-neutral-400 text-neutral-50 border border-neutral-400 hover:border-neutral-500 hover:text-neutral-50 dark:hover:border-neutral-500 dark:hover:text-amber-500 dark:bg-amber-500 outline-2 outline-offset-2 dark:outline-amber-600 dark:bg-amber-700 text-white font-bold py-1 px-4 rounded-2xl text-sm transition-colors duration-200 ease-in-out";
  console.log("Header: theme", theme); */
