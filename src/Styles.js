// autofill hack: https://stackoverflow.com/questions/60616796/tailwind-css-autofill-input-styling
const inputClassName =
  "bg-neutral-100 dark:bg-olive-900 text-neutral-800 dark:text-white px-3 py-1 w-full border border-olive-700 rounded focus:outline-none focus:ring-2 focus:ring-olive-500 autofill:shadow-[inset_0_0_0_1000px_var(--color-olive-800)] autofill:[-webkit-text-fill-color:var(--color-olive-50)]";

const checkboxClassName =
  "min-w-8 min-h-8 accent-olive-800 bg-olive-900 rounded backdrop:blur-sm outline outline-olive-700 autofill:shadow-[inset_0_0_0_1000px_var(--color-olive-800)]";

const navlinkClassName =
  "relative cursor-pointer text-md font-bold text-neutral-500 dark:text-olive-400 transition-colors duration-200 mx-4 p-px my-px data-active:text-olive-500 data-hover:text-olive-500 dark:data-hover:text-olive-600 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-olive-600 dark:after:bg-olive-300 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 data-hover:after:scale-x-100";
const navlinkClassNameActive =
  "relative cursor-pointer text-md font-bold text-olive-600 dark:text-olive-400 transition-colors duration-200 mx-4 p-px my-px data-active:text-olive-300 data-hover:text-olive-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-100 after:bg-olive-600 dark:after:bg-olive-400";

const baseClassName =
  "cursor-pointer border focus:outline-2 focus:outline-offset-2 font-bold text-nowrap py-1 px-4 rounded-2xl ";
const btnClassName =
  baseClassName +
  " cursor-pointer bg-neutral-100 text-neutral-500 border-neutral-400 hover:border-neutral-500 hover:text-neutral-400 dark:hover:text-olive-800 dark:bg-olive-500 focus:outline-2 focus:outline-neutral-500 active:bg-neutral-500 active:text-neutral-200 dark:bg-olive-500 dark:text-white";
const btnClassNameActive =
  baseClassName +
  " bg-neutral-400 text-neutral-50 border-neutral-500 hover:border-neutral-500 hover:text-neutral-50 dark:hover:border-neutral-500 dark:bg-olive-500 outline-2 outline-offset-2 outline-neutral-600 dark:outline-olive-600 dark:bg-olive-700 text-white";

const iconClassName =
  "flex justify-center items-center text-neutral-500 dark:text-olive-400 hover:text-neutral-400 dark:hover:text-olive-300";

const containerClassName =
  "cursor-pointer flex flex-col gap-2 border px-3 py-2 rounded-3xl hover:scale-[1.005] transition-all duration-300 ease-out relative overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(244,244,245,0.8)_38%,rgba(228,228,231,0.54))] border-neutral-200/80 text-neutral-700 shadow-[inset_1px_1px_0_rgba(255,255,255,0.96),inset_-1px_-1px_0_rgba(113,113,122,0.12),0_12px_20px_rgba(15,23,42,0.08)] hover:shadow-[inset_1px_1px_0_rgba(255,255,255,0.96),inset_-1px_-1px_0_rgba(113,113,122,0.15),0_16px_28px_rgba(15,23,42,0.12)] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.4)_18%,rgba(255,255,255,0.12)_26%,rgba(255,255,255,0)_38%,rgba(113,113,122,0.22)_100%)] before:pointer-events-none before:content-[''] dark:bg-[linear-gradient(135deg,rgba(58,58,60,0.96),rgba(28,28,30,0.96)_38%,rgba(10,10,10,0.98))] dark:text-neutral-200 dark:border-neutral-600/70 dark:border-t-neutral-300/80 dark:border-l-neutral-300/80 dark:shadow-[inset_1px_1px_0_rgba(255,255,255,0.08),inset_-1px_-1px_0_rgba(0,0,0,0.82),0_18px_30px_rgba(45,43,36,0.52)] dark:hover:shadow-[inset_1px_1px_0_rgba(255,255,255,0.09),inset_-1px_-1px_0_rgba(0,0,0,0.84),0_22px_34px_rgba(45,43,36,0.62)] dark:before:bg-[linear-gradient(135deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.14)_18%,rgba(255,255,255,0.04)_26%,rgba(255,255,255,0)_35%,rgba(82,82,91,0.34)_100%)]";

const containerClassNameActive =
  "cursor-pointer flex flex-col gap-2 border px-3 py-2 rounded-3xl hover:scale-[1.02] transition-all duration-300 ease-out relative overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,1),rgba(240,240,242,0.96)_35%,rgba(226,226,229,0.9))] border-neutral-300/80 text-neutral-800 shadow-[inset_1px_1px_0_rgba(255,255,255,0.9),inset_-1px_-1px_0_rgba(113,113,122,0.14),0_14px_22px_rgba(15,23,42,0.12)] hover:shadow-[inset_1px_1px_0_rgba(255,255,255,0.98),inset_-1px_-1px_0_rgba(113,113,122,0.18),0_18px_28px_rgba(15,23,42,0.16)] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.52)_17%,rgba(255,255,255,0.2)_27%,rgba(255,255,255,0)_38%,rgba(113,113,122,0.2)_100%)] before:pointer-events-none before:content-[''] dark:bg-[linear-gradient(135deg,rgba(68,68,72,0.96),rgba(30,30,32,0.96)_34%,rgba(9,9,11,0.99))] dark:text-neutral-100 dark:border-neutral-500/60 dark:border-t-neutral-400/80 dark:border-l-neutral-400/80 dark:shadow-[inset_1px_1px_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_rgba(0,0,0,0.8),0_18px_30px_rgba(45,43,36,0.6)] dark:before:bg-[linear-gradient(135deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.2)_16%,rgba(255,255,255,0.06)_25%,rgba(255,255,255,0)_35%,rgba(82,82,91,0.36)_100%)]";

const btnSimpleClassName =
  "border-2 cursor-pointer text-neutral-600 hover:text-neutral-500 border-neutral-500 hover:border-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-300 dark:border-neutral-500 dark:hover:border-neutral-400 rounded-2xl px-3 py-1 transition-colors duration-200";

const comparePanelClassName =
  "flex flex-col gap-2 border px-3 py-2 rounded-3xl transition-all duration-300 ease-out relative overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(244,244,245,0.92)_38%,rgba(228,228,231,0.84))] border-neutral-200/80 text-neutral-700 shadow-[inset_1px_1px_0_rgba(255,255,255,0.96),inset_-1px_-1px_0_rgba(113,113,122,0.12),0_12px_20px_rgba(15,23,42,0.08)] hover:shadow-[inset_1px_1px_0_rgba(255,255,255,0.96),inset_-1px_-1px_0_rgba(113,113,122,0.15),0_16px_28px_rgba(15,23,42,0.12)] before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.4)_18%,rgba(255,255,255,0.12)_26%,rgba(255,255,255,0)_38%,rgba(113,113,122,0.22)_100%)] before:pointer-events-none before:content-[''] dark:bg-[linear-gradient(135deg,rgba(58,58,60,0.96),rgba(28,28,30,0.96)_38%,rgba(10,10,10,0.98))] dark:text-neutral-200 dark:border-neutral-600/70 dark:border-t-neutral-300/80 dark:border-l-neutral-300/80 dark:shadow-[inset_1px_1px_0_rgba(255,255,255,0.08),inset_-1px_-1px_0_rgba(0,0,0,0.82),0_18px_30px_rgba(2,6,23,0.52)] dark:hover:shadow-[inset_1px_1px_0_rgba(255,255,255,0.09),inset_-1px_-1px_0_rgba(0,0,0,0.84),0_22px_34px_rgba(2,6,23,0.62)] dark:before:bg-[linear-gradient(135deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.14)_18%,rgba(255,255,255,0.04)_26%,rgba(255,255,255,0)_35%,rgba(82,82,91,0.34)_100%)]";

const compareFilterButtonClassName =
  "w-auto text-nowrap rounded-2xl border cursor-pointer focus:ring-neutral-500 focus:outline-none focus-visible:outline-none text-sm overflow-hidden whitespace-nowrap bg-neutral-50 text-neutral-400 border-neutral-400 dark:bg-neutral-800 dark:border-neutral-300 dark:text-neutral-400 dark:hover:border-neutral-200 dark:hover:text-neutral-300 hover:border-neutral-400 hover:text-neutral-500";

const compareFilterButtonActiveClassName =
  "w-auto text-nowrap rounded-2xl border cursor-pointer focus:ring-neutral-500 focus:outline-none focus-visible:outline-none text-sm overflow-hidden whitespace-nowrap bg-neutral-100 text-neutral-600 border-neutral-500 dark:bg-neutral-950 dark:border-neutral-300 dark:text-neutral-200";

const compareBarClassName =
  "relative flex w-46 h-9 sm:w-80 cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-2xl border border-neutral-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(244,244,245,0.92)_38%,rgba(228,228,231,0.84))] px-3 py-1 text-sm text-neutral-600 shadow-[inset_1px_1px_0_rgba(255,255,255,0.96),inset_-1px_-1px_0_rgba(113,113,122,0.12),0_12px_20px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out hover:shadow-[inset_1px_1px_0_rgba(255,255,255,0.96),inset_-1px_-1px_0_rgba(113,113,122,0.15),0_16px_28px_rgba(15,23,42,0.12)] dark:border-neutral-600/70 dark:bg-[linear-gradient(135deg,rgba(58,58,60,0.96),rgba(28,28,30,0.96)_38%,rgba(10,10,10,0.98))] dark:text-neutral-200 dark:shadow-[inset_1px_1px_0_rgba(255,255,255,0.08),inset_-1px_-1px_0_rgba(0,0,0,0.82),0_18px_30px_rgba(2,6,23,0.52)]";

const compareBarSelectedClassName =
  "relative flex w-46 h-9 sm:w-80 cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-2xl border border-neutral-300/80 border-l-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,1),rgba(240,240,242,0.96)_35%,rgba(226,226,229,0.9))] px-3 py-1 text-sm font-semibold text-neutral-700 shadow-[inset_1px_1px_0_rgba(255,255,255,0.96),inset_-1px_-1px_0_rgba(113,113,122,0.15),0_16px_28px_rgba(15,23,42,0.12)] transition-all duration-300 ease-out dark:border-neutral-500/60 dark:border-l-white/15 dark:bg-[linear-gradient(135deg,rgba(68,68,72,0.96),rgba(30,30,32,0.96)_34%,rgba(9,9,11,0.99))] dark:text-neutral-100 dark:shadow-[inset_1px_1px_0_rgba(255,255,255,0.96),inset_-1px_-1px_0_rgba(113,113,122,0.12),0_12px_20px_rgba(15,23,42,0.08)]";

const compareBarFillClassName =
  "absolute inset-y-0 left-0 z-0 rounded-r-2xl bg-[linear-gradient(90deg,rgba(69, 76, 61, 0.21),rgba(58, 64, 52, 0.34))] transition-all duration-500 dark:bg-[linear-gradient(90deg,rgba(56, 64, 50, 0.75),rgba(35, 40, 31, 0.75))]";

const compareBarFillSelectedClassName =
  "absolute border-2 border-olive-500 inset-y-0.5 left-0 z-0 rounded-r-2xl bg-olive-200 transition-all duration-500 dark:bg-olive-700";

const compareBarGlassTopClassName =
  "absolute inset-x-0 top-0 z-1 h-2.5 bg-[linear-gradient(0deg,rgba(255,255,255,0.0)_15%,rgba(255,255,255,0.45)_35%,rgba(255,255,255,0.12)_52%,rgba(255,255,255,0.00)_80%,rgba(255,255,255,0.47)_100%)]";

const compareBarGlassBottomClassName =
  "absolute inset-x-0 bottom-1 z-2 h-2 bg-[linear-gradient(0deg,rgba(255,255,255,0.0)_0%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_60%,rgba(255,255,255,0.01)_100%)]";

const styles = {
  input: inputClassName,
  checkbox: checkboxClassName,
  container: containerClassName,
  containerActive: containerClassNameActive,
  navlink: navlinkClassName,
  navlinkActive: navlinkClassNameActive,
  btnSimple: btnSimpleClassName,
  btn: btnClassName,
  btnActive: btnClassNameActive,
  icon: iconClassName,
  comparePanel: comparePanelClassName,
  compareFilterButton: compareFilterButtonClassName,
  compareFilterButtonActive: compareFilterButtonActiveClassName,
  compareBar: compareBarClassName,
  compareBarSelected: compareBarSelectedClassName,
  compareBarFill: compareBarFillClassName,
  compareBarFillSelected: compareBarFillSelectedClassName,
  compareBarGlassTop: compareBarGlassTopClassName,
  compareBarGlassBottom: compareBarGlassBottomClassName,
};

export default styles;
