


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
      className={selected ? styles.compareBarSelected : styles.compareBarSelected}
      onClick={handleClick}
    >
      <span
        className={selected ? styles.compareBarFillSelected : styles.compareBarFillSelected}
        style={{ width: `${safePercent}%` }}
      ></span>
      <span className={styles.compareBarGlassTop} aria-hidden="true" />
      <span className={styles.compareBarGlassBottom} aria-hidden="true" />
      <span className="relative z-10 truncate text-left">{location.name}</span>
      <span className="relative z-10 whitespace-nowrap text-right">
        {displayValue} {unit || ""}
      </span>
    </div>
  );
};

export default CompareBar;