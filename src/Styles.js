// autofill hack: https://stackoverflow.com/questions/60616796/tailwind-css-autofill-input-styling
const inputClassName =
  "bg-olive-900 text-white px-3 py-1 w-full border border-olive-700 rounded focus:outline-none focus:ring-2 focus:ring-olive-500 autofill:shadow-[inset_0_0_0_1000px_var(--color-olive-800)] autofill:[-webkit-text-fill-color:var(--color-olive-50)]";

const checkboxClassName =
  "min-w-8 min-h-8 accent-olive-800 bg-olive-900 rounded backdrop:blur-sm outline outline-olive-700 autofill:shadow-[inset_0_0_0_1000px_var(--color-olive-800)]";

const navlinkClassName =
  "relative cursor-pointer rounded text-md font-bold text-olive-400 transition-colors duration-200 mx-4 p-px my-px data-active:text-olive-300 data-hover:text-olive-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-olive-300 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 data-hover:after:scale-x-100";
const navlinkClassNameActive =
  "relative cursor-pointer rounded text-md font-bold text-olive-400 transition-colors duration-200 mx-4 p-px my-px data-active:text-olive-300 data-hover:text-olive-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-100 after:bg-olive-300 ";

const baseClassName =
  "cursor-pointer border focus:outline-2 focus:outline-offset-2 font-bold text-nowrap py-1 px-4 rounded-2xl ";
const btnClassName =
  baseClassName +
  " cursor-pointer bg-neutral-100 text-neutral-500 border-neutral-400 hover:border-neutral-500 hover:text-neutral-400 dark:hover:text-olive-800 dark:bg-olive-500 focus:outline-2 focus:outline-neutral-500 active:bg-neutral-500 active:text-neutral-200 dark:bg-olive-500 dark:text-white";
const btnClassNameActive =
  baseClassName +
  " bg-neutral-400 text-neutral-50 border-neutral-500 hover:border-neutral-500 hover:text-neutral-50 dark:hover:border-neutral-500 dark:bg-olive-500 outline-2 outline-offset-2 outline-neutral-600 dark:outline-olive-600 dark:bg-olive-700 text-white";

const styles = {
  input: inputClassName,
  checkbox: checkboxClassName,
  navlink: navlinkClassName,
  navlinkActive: navlinkClassNameActive,
  btn: btnClassName,
  btnActive: btnClassNameActive,
};

export default styles;
