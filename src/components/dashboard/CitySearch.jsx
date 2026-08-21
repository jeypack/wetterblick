import { useState } from "react";
import { Button, Input } from "@headlessui/react";
import RippleFX from "../ui/RippleFX";
import ListBox from "../ui/ListBox";
import { weatherModels } from "../../data/api";
import AutofillCombo from "./AutofillCombo";

export default function CitySearch({ getCity, model, searchLocations }) {
  const [inputValue, setInputValue] = useState("");
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
    //getCity(inputValue, selectedModel.model);
    getCity(location, selectedModel.model);
  };

  const handleChange = async (selected) => {
    console.log("handleChange: selected", selected);
    setLocation(selected);
  };

  const handleInput = async (event) => {
    const value = event.target.value;
    setInputValue(value);
    console.log("handleInput: inputValue", value);
    //if (inputValue.length < 2 || locations.length > 0) {
    if (value.length < 2 || value.length > 5) {
      return;
    }
    const newLocations = await searchLocations(value);
    console.log("handleInput: locations", newLocations);
    setLocations(newLocations);
  };

  //console.log("CitySearch: model", model, "selectedModel", selectedModel);
  return (
    <form
      className="flex flex-col justify-center items-center gap-2 px-2 pb-2 w-full"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <AutofillCombo options={locations} onInput={handleInput} onChange={handleChange} />

      <Button
        type="submit"
        disabled={!location}
        className="border cursor-pointer text-neutral-600 hover:text-neutral-500 border-neutral-500 hover:border-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-300 dark:border-neutral-500 dark:hover:border-neutral-400 focus-visible:outline-none rounded-2xl w-full"
      >
        <RippleFX className="w-full px-3 py-1 rounded-2xl">Wetter suchen</RippleFX>
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
}
