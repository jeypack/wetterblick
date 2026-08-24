import { Button } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useState, useMemo, memo } from "react";
//import DailyChart from "./DailyChart";
import CompareBarContainer from "./CompareBarContainer";
import CompareFilter from "./CompareFilter";

const metrics = [
  { id: 1, name: "Temperatur", filter: "temperature" },
  { id: 2, name: "Luftfeuchtigkeit", filter: "relativeHumidity" },
  { id: 3, name: "Windgeschwindigkeit", filter: "windSpeed" },
  { id: 4, name: "Luftdruck", filter: "pressure" },
  //{id: 5, name: "Wetter", filter: "weatherCode"},
];

const ComparePanel = ({
  selectedCitiesData,
  dailyData,
  previewCityId,
  setPreviewCityId,
}) => {
  const [selectedProp, setSelectedProp] = useState(metrics[0]);
  //const lastDailyData = dailyData[dailyData.length - 1];
  //console.log("lastDailyData", lastDailyData);
  const dailyDataForPreviewCity = useMemo(() => {
    return dailyData.find((city) => city.id === previewCityId);
  }, [dailyData, previewCityId]);
  //console.log("dailyDataForPreviewCity", dailyDataForPreviewCity);
  const lastCityData = useMemo(() => {
    return selectedCitiesData.find((city) => city.id === previewCityId);
  }, [selectedCitiesData, previewCityId]);
  //console.log("lastCityData", lastCityData);

  return (
    <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 flex flex-col justify-start items-start gap-6 p-4 rounded-xl w-auto min-h-60 transition-shadow duration-200 ease-in-out shadow-md lg:flex-row">
      <div className="flex flex-col justify-start items-start gap-2 w-auto sm:flex-row lg:flex-col">
        <CompareFilter
          options={metrics}
          selectedProp={selectedProp}
          setSelectedProp={setSelectedProp}
        />
        <CompareBarContainer
          onClick={(id) => setPreviewCityId(id)}
          selectedCitiesData={selectedCitiesData}
          previewCityId={previewCityId}
          selectedProp={selectedProp}
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-2 relative w-full">
        <h6 className="text-neutral-400 dark:text-neutral-300 font-bold pl-1">
          {dailyDataForPreviewCity && (
            <>
              Vorschau für {dailyDataForPreviewCity?.location.name}
              {", "}
              {dailyDataForPreviewCity?.location.country}{" "}
              <span className="text-neutral-400 dark:text-neutral-400 text-xs ml-4">
                {lastCityData?.model}
              </span>
            </>
          )}
        </h6>
        {/* <DailyChart chartData={dailyDataForPreviewCity} /> */}
      </div>
    </div>
  );
};
export default memo(ComparePanel);
