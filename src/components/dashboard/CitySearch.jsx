import React, { useState } from "react";
import { Button } from "@headlessui/react";
import RippleFX from "../ui/RippleFX";
import ListBox from "../ui/ListBox";
import { weatherModels } from "../../data/api";
import AutofillCombo from "./AutofillCombo";

/**
 * CitySearch component for searching and selecting cities with weather model options.
 *
 * @param {Object} props - The component props.
 * @param {string} props.btnLabel - The label for the submit button.
 * @param {Function} props.onSubmit - Callback function when the form is submitted.
 * @param {string} props.model - The initial weather model.
 * @param {Function} props.searchLocations - Function to search for locations based on input.
 */
const CitySearch = ({
  btnLabel = "Wetter anzeigen",
  onSubmit,
  model,
  searchLocations,
}) => {
  const [, setInputValue] = useState("");
  const [location, setLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const weatherModel = weatherModels.find((m) => m.model === model) || weatherModels[0];
  const [selectedModel, setSelectedModel] = useState(weatherModel);

  const handleFocus = (event) => {
    const input = event.target;
    input.select();
    input.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log("inputValue", inputValue, "selectedModel", selectedModel);
    onSubmit(location, selectedModel.model);
  };

  const handleChange = async (selected) => {
    //console.log("handleChange: selected", selected);
    setLocation(selected);
  };

  const handleInput = async (event) => {
    const value = event.target.value;
    setInputValue(value);
    //console.log("handleInput: inputValue", value);
    if (value.length === 0) {
      setLocations([]);
      return;
    }
    if (value.length < 2 || value.length > 10) {
      return;
    }
    const newLocations = await searchLocations(value);
    //console.log("handleInput: locations", newLocations);
    setLocations(newLocations);
  };

  //console.log("CitySearch: model", model, "selectedModel", selectedModel);
  return (
    <form
      className="flex flex-col justify-center items-center gap-2 px-2 pb-2 w-full z-30"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <AutofillCombo
        options={locations}
        onInput={handleInput}
        onChange={handleChange}
        onFocus={handleFocus}
        filterOptions={false}
      />

      <Button
        type="submit"
        disabled={!location}
        className="border cursor-pointer bg-neutral-200/50 dark:bg-neutral-900/70 text-neutral-600 hover:text-neutral-500 border-neutral-500 hover:border-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-300 dark:border-neutral-500 dark:hover:border-neutral-400 focus-visible:outline-none rounded-2xl w-full"
      >
        <RippleFX className="w-full px-3 py-1 rounded-2xl">{btnLabel}</RippleFX>
      </Button>

      <ListBox
        label="Wettermodelle"
        className="w-full"
        options={weatherModels}
        onChange={(value) => setSelectedModel(value)}
        selectedModel={selectedModel}
      />
    </form>
  );
};

export default React.memo(CitySearch);
