import React from "react";
import WeatherIcon from "./WeatherIcon";
import { useWeather } from "../../hooks/useWeather";

const CityCard = ({ active, weather, desc }) => {
  const { temperature, weatherCode } = weather ?? {};
  const { getCity } = useWeather();

  /* const getFirstUpper = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }; */

  const containerClassName =
    "cursor-pointer flex flex-col justify-center items-start gap-2 border-2 p-3 rounded-3xl w-auto min-w-xs hover:scale-102 transition-transform duration-200 ease-in-out hover:shadow-md dark:hover:shadow-md dark:hover:shadow-neutral-100/20 relative group";
  const selectedClassName = active
    ? "bg-neutral-100 border-neutral-400 shadow-neutral-900/20 dark:bg-neutral-800 dark:border-neutral-600 shadow-lg scale-102"
    : "bg-neutral-50 border-neutral-300 hover:shadow-neutral-900/20 dark:bg-neutral-800 dark:border-neutral-600";

  const classNameLocation = active
    ? "text-neutral-600 dark:text-olive-50"
    : "text-neutral-500 dark:text-neutral-200";

  const handleCityUpdate = async () => {
    //console.log("inputValue", inputValue, "selectedModel", selectedModel);
    //getCity(inputValue, selectedModel.model);
    getCity(weather.location);
  };

  return (
    <div
      className={`${containerClassName} ${selectedClassName}`}
      onClick={handleCityUpdate}
    >
      <div className="w-full">
        <div
          className={
            "flex justify-between items-center w-full text-neutral-500 dark:text-olive-300"
          }
        >
          <div className="flex flex-row justify-center items-center gap-1 text-neutral-400 dark:text-neutral-200 text-nowrap">
            <WeatherIcon
              code={weatherCode}
              className="text-neutral-400 dark:text-neutral-200"
              size={48}
            />
            <div className={`ml-2 max-w-32 text-lg/5 truncate ${classNameLocation}`}>
              {weather.location.name}
              <br />
              <span className="text-sm text-neutral-400 dark:text-neutral-400">
                {weather.location.country}
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-around items-start gap-1 text-neutral-400 dark:text-neutral-200 text-nowrap">
            <span className="text-2xl ">{temperature}</span>°
            <span className="text-xl">C</span>
          </div>
        </div>
      </div>
      {desc && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-2 px-2 py-1 bg-neutral-500 dark:bg-neutral-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          {desc}
        </div>
      )}
    </div>
  );
};

export default React.memo(CityCard);
