import styles from "../../Styles";

/**
 * CompareBar component for displaying a comparison bar with location, value, and percentage.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique ID of the comparison item.
 * @param {Object} props.location - The location data for the comparison item.
 * @param {number} props.value - The value to display in the comparison bar.
 * @param {string} props.unit - The unit of the value.
 * @param {number} props.percent - The percentage width of the comparison bar.
 * @param {boolean} props.selected - Whether the comparison bar is selected.
 * @see {@link ../../Styles Styles} for more information on the styling classes used in this component.
 * @param {Function} props.onClick - Callback function when the comparison bar is clicked.
 */
const CompareBar = ({ id, location, value, unit, percent, selected, onClick }) => {
  const handleClick = () => {
    if (typeof onClick === "function") {
      onClick(id);
    }
  };

  const safePercent = Number.isFinite(percent) ? Math.min(Math.max(percent, 0), 100) : 0;
  const displayValue = typeof value === "number" ? value.toFixed(1) : (value ?? "N/A");

  return (
    <div
      className={selected ? styles.compareBarSelected : styles.compareBarSelected}
      onClick={handleClick}
    >
      <span
        className={
          selected ? styles.compareBarFillSelected : styles.compareBarFillSelected
        }
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
