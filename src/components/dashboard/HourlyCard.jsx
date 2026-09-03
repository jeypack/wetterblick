import React from "react";
import WeatherIcon from "./WeatherIcon";
import styles from "../../Styles";

const HourlyCard = ({ active, weather }) => {
  const { apparent, date, relativeHumidity, temperature, time, weatherCode, windSpeed } =
    weather ?? {};

  if (!weather) return null;

  return (
    <div className={styles.container + " w-27 sm:w-26 md:w-24 lg:w-22"}>
      <div className="flex flex-row justify-center items-center gap-1 text-neutral-400 dark:text-neutral-200 text-nowrap text-xs">
        {time} <span className="text-[10px]">Uhr</span>
      </div>
      <div className="flex flex-row justify-around items-start gap-1 h-auto text-neutral-400 dark:text-neutral-200 text-nowrap">
        <span className="text-lg ">{temperature}</span>°<span className="text-md">C</span>
      </div>
      <div className="flex flex-row justify-center items-center gap-1 text-neutral-400 dark:text-neutral-200 text-nowrap">
        <WeatherIcon
          code={weatherCode}
          className="text-neutral-400 dark:text-neutral-200"
          size={36}
        />
      </div>
      <div className="flex flex-row justify-center items-center gap-1 text-neutral-400 dark:text-neutral-200 text-nowrap text-xs">
        {relativeHumidity} <span className="text-xs">%</span>
      </div>
    </div>
  );
};

export default React.memo(HourlyCard);
