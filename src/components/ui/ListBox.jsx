import { useState } from "react";
import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

const ListBox = ({ className, label, options, onChange, selectedModel }) => {
  const [selectedValue, setSelectedValue] = useState(selectedModel || options[0]);
  const handleChange = (value) => {
    setSelectedValue(value);
    if (typeof onChange === "function") {
      onChange(value);
    }
  };
  return (
    <Field as="div" className="flex flex-col justify-center items-start gap-1 w-full">
      <Label className={"text-neutral-500 dark:text-olive-400"}>{label}</Label>
      <Listbox value={selectedValue} onChange={handleChange}>
        <ListboxButton
          className={
            "mt-2 border bg-neutral-200/50 dark:bg-neutral-900/70 cursor-pointer text-neutral-500 hover:text-neutral-500 border-neutral-500 hover:border-neutral-400 dark:text-olive-400 dark:hover:text-neutral-300 dark:border-neutral-500 dark:hover:border-neutral-400 focus-visible:outline-none rounded-2xl w-full px-3 py-1 " +
            (className ?? "w-42")
          }
        >
          {selectedValue.name}
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className="border border-neutral-400 bg-neutral-100 dark:border-olive-500 dark:bg-olive-800 rounded-md gap-2 w-xs mt-2 focus-visible:outline-none focus:outline-none max-h-60 overflow-y-auto z-20"
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
