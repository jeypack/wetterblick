import {Button} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/20/solid";
import {useState, useMemo, memo} from "react";
import RippleFX from "../ui/RippleFX";
import ChartDaysForecast from "./ChartDaysForecast";
import ChartDaysArea from "./ChartDaysArea";
import DailyChart from "./DailyChart";

const metrics = [
  {id: 1, name: "Temperatur", filter: "temperature"},
  {id: 2, name: "Luftfeuchtigkeit", filter: "relativeHumidity"},
  {id: 3, name: "Windgeschwindigkeit", filter: "windSpeed"},
  {id: 4, name: "Luftdruck", filter: "pressure"},
  //{id: 5, name: "Wetter", filter: "weatherCode"},
];

const ranges = {
  temperature: {
    min: -20,
    max: 50,
  },

  relativeHumidity: {
    min: 0,
    max: 100,
  },

  windSpeed: {
    min: 0,
    max: 120,
  },

  pressure: {
    min: 960,
    max: 1060,
  },
};

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
              Vorschau für {dailyDataForPreviewCity?.location}{" "}
              <span className="text-neutral-400 dark:text-neutral-400 text-xs ml-4">
                {lastCityData?.model}
              </span>
            </>
          )}
        </h6>
        <DailyChart chartData={dailyDataForPreviewCity} />
      </div>
    </div>
  );
};
export default memo(ComparePanel);

function CompareFilter({options, selectedProp, setSelectedProp}) {
  const baseClassName =
    "w-auto text-nowrap rounded-2xl border cursor-pointer focus:ring-neutral-500 focus:outline-none focus-visible:outline-none text-sm overflow-hidden whitespace-nowrap";
  const className =
    "bg-neutral-50 text-neutral-400 border-neutral-400 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:border-neutral-500 dark:hover:text-neutral-400 hover:border-neutral-400 hover:text-neutral-500 " +
    baseClassName;
  const classNameSelected =
    "bg-neutral-100 text-neutral-600 border-neutral-500 dark:bg-neutral-900 dark:border-neutral-300 dark:text-neutral-200 " +
    baseClassName;
  const getClassName = (value) =>
    value.id === selectedProp.id ? classNameSelected : className;
  //console.log("CompareFilter: selectedProp", selectedProp);
  return (
    <div className="flex flex-col justify-start items-start gap-2 w-40">
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

/**
 *
 * @param {{selectedCitiesData: Array, selectedProp: Object}} param0
 * @returns {JSX.Element}
 */
const CompareBarContainer = ({
  selectedCitiesData,
  selectedProp,
  onClick,
  previewCityId,
}) => {
  const range = ranges[selectedProp.filter];

  const values = useMemo(() => {
    return selectedCitiesData
      .map((city) => city.data[selectedProp.filter])
      .filter((value) => typeof value === "number");
  }, [selectedCitiesData, selectedProp.filter]);
  //const maxValue = Math.max(...values);
  return (
    <div className="flex flex-col justify-start items-start gap-2 mt-2 w-auto">
      {selectedCitiesData.map((city) => {
        const value = city.data[selectedProp.filter];
        const unit = city.units[selectedProp.filter];
        //const percent = maxValue === 0 ? 0 : (value / maxValue) * 100;
        const percent = ((value - range.min) / (range.max - range.min)) * 100;
        return (
          <CompareBar
            key={city.id}
            id={city.id}
            location={city.location}
            value={value}
            onClick={onClick}
            percent={percent}
            selected={city.id === previewCityId}
            unit={unit}
          />
        );
      })}
    </div>
  );
};

const CompareBar = ({
  id,
  location,
  value,
  unit,
  percent,
  selected,
  onClick,
}) => {
  // console.log("CompareBar: location", location, "value", value, "unit", unit, "percent", percent);
  const handleClick = () => {
    if (typeof onClick === "function") {
      onClick(id);
    }
  };

  const baseClassName =
    "border-2 cursor-pointer flex flex-row justify-between items-center gap-1 py-0 px-4 rounded-2xl text-sm relative w-46 sm:w-60 overflow-hidden hover:font-bold transition-colors duration-200 ease-in-out";
  const selectedClassName = selected
    ? "text-neutral-500 bg-neutral-100 border-neutral-400 dark:bg-neutral-900 dark:border-neutral-300 dark:text-neutral-100 font-bold"
    : "text-neutral-500 bg-neutral-50 border-neutral-400 dark:bg-neutral-900 dark:border-neutral-500 dark:text-neutral-300 hover:border-neutral-400";
  const basePercentClassName = `absolute left-0 top-0 h-full w-0 z-0 transition-all transition-duration-500`;
  const percentClassName =
    basePercentClassName + " bg-neutral-200 dark:bg-olive-700";
  const percentClassNameSelected =
    basePercentClassName + " bg-neutral-300 dark:bg-olive-700";
  return (
    <div
      className={`${baseClassName} ${selectedClassName}`}
      onClick={handleClick}
    >
      <span
        className={selected ? percentClassNameSelected : percentClassName}
        style={{width: `${percent}%`}}
      ></span>
      <span className="z-10">{location}</span>
      <span className="z-10">
        {value || "N/A"} {unit || ""}
      </span>
    </div>
  );
};
