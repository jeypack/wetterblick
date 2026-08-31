import React from "react";
import WeatherIcon from "./WeatherIcon";
import { useWeather } from "../../hooks/useWeather";
import styles from "../../Styles";

const CityCard = ({ active, weather, onSelect }) => {
  const { temperature, weatherCode } = weather ?? {};
  const { getCity } = useWeather();

  const classNameLocation = active
    ? "text-neutral-700 dark:text-olive-50"
    : "text-neutral-600 dark:text-neutral-200";

  const handleCityUpdate = async () => {
    if (onSelect) {
      onSelect(weather.location);
      return;
    }

    getCity(weather.location);
  };

  return (
    <div
      className={`${styles.container} min-w-xs ${active ? styles.containerActive : ""}`} 
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
              className="text-neutral-500 dark:text-neutral-200"
              size={40}
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
            <span className="text-xl ">{temperature}</span>°
            <span className="text-lg">C</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CityCard);
