import { useState, memo } from "react";
import { Button } from "@headlessui/react";
import CompareBarContainer from "./CompareBarContainer";
import CompareFilter from "./CompareFilter";
import ListBox from "../ui/ListBox";
import RippleFX from "../ui/RippleFX";
import { weatherModels } from "../../data/api";
import { useWeather } from "../../hooks/useWeather";
import styles from "../../Styles";

const metrics = [
  { id: 1, name: "Temperatur", filter: "temperature" },
  { id: 2, name: "Luftfeuchtigkeit", filter: "relativeHumidity" },
  { id: 3, name: "Windgeschwindigkeit", filter: "windSpeed" },
  { id: 4, name: "Luftdruck", filter: "pressure" },
  //{id: 5, name: "Wetter", filter: "weatherCode"},
];

const ComparePanel = ({ selectedCitiesData, previewCityId, setPreviewCityId }) => {
  const { model, refreshFavorites } = useWeather();
  const [selectedProp, setSelectedProp] = useState(metrics[0]);
  const weatherModel = weatherModels.find((m) => m.model === model) || weatherModels[0];
  const [selectedModel, setSelectedModel] = useState(weatherModel);
  console.log("ComparePanel.jsx: selectedModel", selectedModel);
  console.log("ComparePanel.jsx: selectedCitiesData", selectedCitiesData);

  const handleApply = async () => {
    const locations = selectedCitiesData.map((city) => city.location);
    if (!locations.length) return;

    await refreshFavorites(selectedCitiesData, selectedModel.model);
  };

  return (
    <div className={styles.comparePanel + " w-fit"}>
      <div className="flex flex-col md:flex-row min-h-80 justify-start items-start gap-2 w-fit">
        <div className="flex flex-col gap-2 w-fit">
          <CompareFilter
            options={metrics}
            selectedProp={selectedProp}
            setSelectedProp={setSelectedProp}
          />
          <ListBox
            label="Wettermodelle"
            className="w-full"
            options={weatherModels}
            onChange={(value) => setSelectedModel(value)}
            selectedModel={selectedModel}
          />
          <Button
            type="button"
            /* disabled={!location} */
            onClick={handleApply}
            className="border cursor-pointer bg-neutral-200/50 dark:bg-neutral-900/70 text-neutral-600 hover:text-neutral-500 border-neutral-500 hover:border-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-300 dark:border-neutral-500 dark:hover:border-neutral-400 focus-visible:outline-none rounded-2xl w-full"
          >
            <RippleFX className="w-full px-3 py-1 rounded-2xl">Anwenden</RippleFX>
          </Button>
        </div>
        <CompareBarContainer
          onClick={(id) => setPreviewCityId(id)}
          selectedCitiesData={selectedCitiesData}
          previewCityId={previewCityId}
          selectedProp={selectedProp}
        />
      </div>
    </div>
  );
};
export default memo(ComparePanel);
