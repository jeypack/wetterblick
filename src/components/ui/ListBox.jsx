import {useState} from "react";
import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/20/solid";

const ListBox = ({className, label, options, onChange, selectedModel}) => {
  const [selectedValue, setSelectedValue] = useState(selectedModel || options[0]);
  const handleChange = (value) => {
    setSelectedValue(value);
    if (typeof onChange === "function") {
      onChange(value);
    }
  };
  return (
    <Field>
      <Label className={"text-neutral-400"}>{label}</Label>
      <Listbox value={selectedValue} onChange={handleChange}>
        <ListboxButton
          className={
            "mt-2 border cursor-pointer text-neutral-600 hover:text-neutral-500 border-neutral-500 hover:border-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-300 dark:border-neutral-500 dark:hover:border-neutral-400 focus-visible:outline-none rounded-2xl w-full px-3 py-1 " +
            (className ?? "w-42")
          }
        >
          {selectedValue.name}
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className="border border-neutral-400 bg-neutral-100 dark:border-olive-500 dark:bg-olive-800 rounded-xl gap-2 w-fit-content mt-2 focus-visible:outline-none focus:outline-none max-h-60 overflow-y-auto"
        >
          {options.map((value, index) => (
            <ListboxOption
              key={index}
              value={value}
              className="cursor-pointer flex group gap-2 w-full px-3 py-1 bg-neutral-50 border-neutral-500 dark:border-neutral-500 dark:bg-neutral-900 dark:text-neutral-400 data-focus:text-neutral-900 data-focus:bg-neutral-200 dark:data-focus:text-neutral-200 dark:data-focus:bg-neutral-700 focus:outline-none focus-visible:outline-none"
            >
              <CheckIcon className="invisible size-5 group-data-selected:visible" />
              {value.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
};

export default ListBox;


/* 
const AutofillBox = ({children, selectedCities, results}) => {
  const [selectedPerson, setSelectedPerson] = useState(metrics[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? metrics
      : metrics.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      value={selectedPerson}
      onChange={setSelectedPerson}
      onClose={() => setQuery("")}
    >
      <ComboboxInput
        aria-label="Assignee"
        displayValue={(person) => person?.name}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ComboboxOptions anchor="bottom" className="border empty:invisible">
        {filteredPeople.map((person) => (
          <ComboboxOption
            key={person.id}
            value={person}
            className="data-focus:bg-blue-100"
          >
            {person.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};
// ----
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { useState } from 'react'

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
]

function Example() {
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
  )
}
*/
