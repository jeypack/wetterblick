import React from "react";
import WeatherIcon from "./WeatherIcon";
import styles from "../../Styles";

const HourlyCard = ({ active, weather }) => {
  const { apparent, date, relativeHumidity, temperature, time, weatherCode, windSpeed } =
    weather ?? {};
  //console.log("HourlyCard: weather", weather);
  /* const containerClassName =
    "cursor-pointer flex flex-col justify-center items-center gap-2 border-2 px-3 py-2 rounded-3xl w-auto min-w-22 hover:scale-110 transition-transform duration-300 ease-in-out relative";
  const selectedClassName = active
    ? "bg-neutral-100 border border-neutral-300 border-t-white border-l-white border-b-neutral-400 border-r-neutral-400 shadow-[2px_4px_10px_rgba(15,23,42,0.08)] dark:bg-neutral-800 dark:border-neutral-700 dark:border-t-neutral-500 dark:border-l-neutral-500 dark:border-b-neutral-600 dark:border-r-neutral-600 dark:shadow-neutral-950/30"
    : "bg-neutral-50 border border-neutral-200 border-t-white border-l-white border-b-neutral-300 border-r-neutral-300 shadow-[1px_3px_8px_rgba(15,23,42,0.05)] hover:shadow-[2px_5px_12px_rgba(15,23,42,0.08)] dark:bg-neutral-800 dark:border-neutral-700 dark:border-t-neutral-500 dark:border-l-neutral-500 dark:border-b-neutral-600 dark:border-r-neutral-600 dark:border-r-neutral-600"; */

  if (!weather) return null;

  return (
    <div className={styles.container}>
      <div className="flex flex-row justify-center items-center gap-1 text-neutral-400 dark:text-neutral-200 text-nowrap text-xs">
        {time} <span className="text-xs">Uhr</span>
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
