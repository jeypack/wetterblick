


const CompareBar = ({ id, location, value, unit, percent, selected, onClick }) => {
  // console.log("CompareBar: location", location, "value", value, "unit", unit, "percent", percent);
  const handleClick = () => {
    if (typeof onClick === "function") {
      onClick(id);
    }
  };

  const baseClassName =
    "border-2 cursor-pointer flex flex-row justify-between items-center gap-1 py-0 px-4 rounded-2xl text-sm relative w-46 sm:w-60 overflow-hidden hover:font-bold transition-colors duration-200 ease-in-out";
  const selectedClassName = selected
    ? "text-neutral-500 bg-neutral-100 border-neutral-400 dark:bg-neutral-900 dark:border-neutral-300 dark:text-neutral-100 font-bold"
    : "text-neutral-500 bg-neutral-50 border-neutral-400 dark:bg-neutral-900 dark:border-neutral-500 dark:text-neutral-300 hover:border-neutral-400";
  const basePercentClassName = `absolute left-0 top-0 h-full w-0 z-0 transition-all transition-duration-500`;
  const percentClassName = basePercentClassName + " bg-neutral-200 dark:bg-olive-700";
  const percentClassNameSelected =
    basePercentClassName + " bg-neutral-300 dark:bg-olive-700";
  return (
    <div className={`${baseClassName} ${selectedClassName}`} onClick={handleClick}>
      <span
        className={selected ? percentClassNameSelected : percentClassName}
        style={{ width: `${percent}%` }}
      ></span>
      <span className="z-10">{location.name}</span>
      <span className="z-10">
        {value || "N/A"} {unit || ""}
      </span>
    </div>
  );
};

export default CompareBar;