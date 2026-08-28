import React from "react";
import WeatherIcon from "./WeatherIcon";
import { useWeather } from "../../hooks/useWeather";

const CityCard = ({ active, weather }) => {
  const { temperature, weatherCode } = weather ?? {};
  const { getCity } = useWeather();

  const containerClassName =
    "cursor-pointer flex flex-col justify-center items-start gap-2 border-2 px-3 py-2 rounded-3xl w-auto min-w-xs hover:scale-102 transition-transform duration-200 ease-in-out hover:shadow-md dark:hover:shadow-md dark:hover:shadow-neutral-100/20 relative group";
  const selectedClassName = active
    ? "bg-neutral-100 border-neutral-400 shadow-neutral-900/20 dark:bg-neutral-800 dark:border-neutral-600 shadow-lg scale-102"
    : "bg-neutral-50 border-neutral-300 hover:shadow-neutral-900/20 dark:bg-neutral-800 dark:border-neutral-600";

  const classNameLocation = active
    ? "text-neutral-600 dark:text-olive-50"
    : "text-neutral-500 dark:text-neutral-200";

  const handleCityUpdate = async () => {
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
    </div>
  );
};

export default React.memo(CityCard);
