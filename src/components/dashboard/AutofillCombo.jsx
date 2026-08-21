import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";

const AutofillCombo = ({ options, onInput, onChange }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleChange = (selected) => {
    console.log("AutofillCombo: handleChange: selected", selected);
    setSelectedLocation(selected);
    /* const selected = event;
    console.log("AutofillCombo: handleChange: selected", selected);
    setSelectedLocation(selected); */
    onChange(selected);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    console.log("AutofillCombo: handleInputChange: value", value);
    setQuery(event.target.value);
    onInput(event);
  };

  return (
    <Combobox
      value={selectedLocation}
      onChange={handleChange}
      onClose={() => setQuery("")}
    >
      <ComboboxInput
        aria-label="Assignee"
        displayValue={(option) => option?.name}
        onChange={handleInputChange}
        onClose={() => setQuery("")}
        placeholder="Suche..."
        className="border bg-neutral-100 border-neutral-300 text-neutral-600 dark:bg-neutral-700 dark:border-neutral-400 dark:text-neutral-400 w-full px-3 py-1 rounded-md focus:outline-none dark:focus:text-neutral-50 focus:ring-2 focus:ring-neutral-300 placeholder-neutral-400"
      />
      <ComboboxOptions
        anchor="bottom start"
        className="mt-1 w-80 border bg-neutral-100 border-neutral-300 text-neutral-600 dark:bg-neutral-900 dark:border-neutral-400 dark:text-neutral-400 rounded-lg empty:invisible"
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

/* 
const [selectedPerson, setSelectedPerson] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson} onClose={() => setQuery('')}>
      <ComboboxInput
        aria-label="Assignee"
        displayValue={(person) => person?.name}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ComboboxOptions anchor="bottom" className="w-52 border empty:invisible">
        {filteredPeople.map((person) => (
          <ComboboxOption key={person.id} value={person} className="data-focus:bg-blue-100">
            {person.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
*/
