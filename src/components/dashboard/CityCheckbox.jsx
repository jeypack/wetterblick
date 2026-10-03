import { Checkbox, Field, Label, Button } from "@headlessui/react";
import RippleFX from "../ui/RippleFX";

/**
 * CityCheckbox component for displaying a checkbox for a specific city.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier for the city.
 * @param {Object} props.location - The location data for the city.
 * @param {Set} props.selectedCities - The set of selected city IDs.
 * @param {Function} props.onChange - Callback function when the checkbox state changes.
 * @see {@link https://headlessui.dev/react/checkbox Checkbox} for more information on the Checkbox component.
 * @see {@link https://headlessui.dev/react/button Button} for more information on the Button component.
 */
export default function CityCheckbox({ id, location, selectedCities, onChange }) {
  const handleChange = (checked, type) => {
    //console.log("CityCheckbox: id", id, "checked", checked, "type", type);
    if (typeof onChange === "function") {
      onChange(id, type);
    }
  };

  return (
    <>
      <Field className="flex flex-row justify-between items-center gap-4 pl-2 w-auto md:w-full">
        <Checkbox
          checked={selectedCities.has(id)}
          onChange={(checked) => {
            handleChange(checked, "toggle");
          }}
          className="group block size-5 rounded border-2 border-neutral-500 bg-white data-checked:bg-neutral-500"
        >
          <svg
            className="stroke-white opacity-0 group-data-checked:opacity-100"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M3 8L6 11L11 3.5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Checkbox>
        <Label className={"text-neutral-500 dark:text-neutral-300 grow"}>
          {location.name}
        </Label>
        <Button
          type="button"
          className="bg-red-100 w-6 text-red-600 hover:text-red-500 rounded-xl border-2 border-red-500 hover:border-red-400 cursor-pointer focus-visible:outline-none"
          onClick={() => {
            handleChange(true, "remove");
          }}
        >
          <RippleFX className="w-full pl-0.5 rounded-2xl text-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </RippleFX>
        </Button>
      </Field>
    </>
  );
}
