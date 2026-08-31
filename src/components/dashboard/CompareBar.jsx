


import styles from "../../Styles";

const CompareBar = ({ id, location, value, unit, percent, selected, onClick }) => {
  const handleClick = () => {
    if (typeof onClick === "function") {
      onClick(id);
    }
  };

  const safePercent = Number.isFinite(percent) ? Math.min(Math.max(percent, 0), 100) : 0;
  const displayValue = typeof value === "number" ? value.toFixed(1) : value ?? "N/A";

  return (
    <div
      className={selected ? styles.compareBarSelected : styles.compareBar}
      onClick={handleClick}
    >
      <span
        className={selected ? styles.compareBarFillSelected : styles.compareBarFill}
        style={{ width: `${safePercent}%` }}
      ></span>
      <span className="z-10 truncate">{location.name}</span>
      <span className="z-10 whitespace-nowrap">
        {displayValue} {unit || ""}
      </span>
    </div>
  );
};

export default CompareBar;