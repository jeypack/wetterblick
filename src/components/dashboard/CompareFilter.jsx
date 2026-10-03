import { Button } from "@headlessui/react";
import RippleFX from "../ui/RippleFX";
import styles from "../../Styles";

/**
 * CompareFilter component for selecting a property to compare.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.options - The available comparison options.
 * @param {Object} props.selectedProp - The currently selected property.
 * @see {@link https://headlessui.dev/react/button Button} for more information on the Button component.
 * @param {Function} props.setSelectedProp - Callback function to set the selected property.
 */
function CompareFilter({ options, selectedProp, setSelectedProp }) {
  const getClassName = (value) =>
    value.id === selectedProp.id
      ? styles.compareFilterButtonActive
      : styles.compareFilterButton;

  return (
    <div className="flex flex-col justify-start items-start gap-2 w-53">
      {options.map((value) => {
        return (
          <Button
            key={value.id}
            className={getClassName(value)}
            onClick={() => setSelectedProp(value)}
          >
            <RippleFX className="flex justify-between items-center w-full px-3 py-0.75">
              {value.name}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="relative inline-block size-6 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </RippleFX>
          </Button>
        );
      })}
    </div>
  );
}

export default CompareFilter;
