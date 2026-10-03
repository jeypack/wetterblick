import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";

/**
 * AutofillCombo component for selecting locations with autocomplete functionality.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.options - The list of options to display in the combobox.
 * @param {Function} props.onInput - Function to call when the input value changes.
 * @param {Function} props.onChange - Function to call when an option is selected.
 * @param {Function} props.onFocus - Function to call when the input is focused.
 * @param {boolean} [props.filterOptions=true] - Whether to filter options based on the input query.
 * @see {@link https://headlessui.dev/react/combobox Combobox} for more information on the Combobox component.
 * @see {@link ../../hooks/useWeather useWeather} for more information on the custom hook used to manage weather data.
 */
const AutofillCombo = ({ options, onInput, onChange, onFocus, filterOptions = true }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [query, setQuery] = useState("");

  const filteredOptions =
    filterOptions && query !== ""
      ? options.filter((option) =>
          option?.name?.toLowerCase().includes(query.toLowerCase()),
        )
      : options;

  const handleChange = (selected) => {
    //console.log("AutofillCombo: handleChange: selected", selected);
    setSelectedLocation(selected);
    onChange(selected);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    //console.log("AutofillCombo: handleInputChange: value", value);
    setQuery(value);
    onInput(event);
  };
  //console.log("AutofillCombo: options", options, "filteredOptions", filteredOptions);
  return (
    <Combobox
      as="div"
      className="relative w-full z-30"
      value={selectedLocation}
      onChange={handleChange}
      onClose={() => setQuery("")}
    >
      <ComboboxInput
        aria-label="Assignee"
        displayValue={(option) => option?.name}
        onChange={handleInputChange}
        onClose={() => setQuery("")}
        onFocus={onFocus}
        placeholder="Suche..."
        className="border bg-neutral-100 border-neutral-300 text-neutral-600 dark:bg-neutral-700 dark:border-neutral-400 dark:text-neutral-400 w-full px-3 py-1 rounded-md focus:outline-none dark:focus:text-neutral-50 focus:ring-2 focus:ring-neutral-300 placeholder-neutral-400"
      />
      <ComboboxOptions
        anchor="bottom start"
        className="mt-1 w-80 border bg-neutral-100 border-neutral-300 text-neutral-600 dark:bg-neutral-900 dark:border-neutral-400 dark:text-neutral-400 rounded-lg empty:invisible z-30"
      >
        {filteredOptions.map((option) => (
          <ComboboxOption
            key={option.id}
            className="flex cursor-pointer data-focus:font-semibold data-focus:bg-neutral-400 data-focus:text-neutral-900 px-2.5 py-0.5"
            value={option}
          >
            <>
              {option.name}
              <br />
              {(option?.state ? option.state : "") +
                (option?.country ? ", " + option.country : "")}
            </>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};

export default AutofillCombo;
