import React from "react";
import { WiWindDeg } from "react-icons/wi";
import { Gauge, Droplets, Eye, MapPin, Wind, Thermometer } from "lucide-react";
import WindDirection from "../dashboard/WindDirection";
import { getWeatherModel } from "../../data/api";
import { useUserData } from "../../hooks/useUserData";
import WeatherIcon from "./WeatherIcon";

const directionsFull = [
  "North",
  "North-East",
  "East",
  "South-East",
  "South",
  "South-West",
  "West",
  "North-West",
];
const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

const CityWeather = ({ previewCityId, weather, setPreviewCityId }) => {
  const {
    time,
    temperature,
    relativeHumidity,
    windSpeed,
    windDirection: angle,
    weatherCode,
  } = weather?.current || {};
  const { updateFavorites, deleteFavorite, isFavorite } = useUserData();

  /* const getFirstUpper = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }; */
  const handleFavoriteClick = () => {
    console.log("CityWeather: handleFavoriteClick: weather.id", weather.id);

    if (isFavorite(weather.location)) {
      deleteFavorite(weather.id || weather.location);
      return;
    }

    updateFavorites({
      id: weather.id,
      location: weather.location,
      title: "Favorit " + weather.location.name,
      note: "",
    });
  };

  const model = getWeatherModel(weather.model);

  const direction = directions[Math.round(angle / 45) % 8];
  const startPos = { x: 30, y: 30, dif: 16 };

  const containerClassName =
    "cursor-pointer flex flex-col justify-center items-start gap-2 border-2 p-4 rounded-md w-auto min-w-50 hover:-translate-y-1 transition-transform duration-200 ease-in-out hover:shadow-lg";
  const selectedClassName =
    previewCityId === weather.id
      ? "bg-neutral-100 border-neutral-400 shadow-neutral-900/20 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:shadow-neutral-900/20  shadow-lg -translate-y-1"
      : "bg-neutral-50 border-neutral-300 hover:shadow-neutral-900/20 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:shadow-neutral-900/20";

  const classNameLocation =
    weather.id === previewCityId
      ? "text-neutral-600 dark:text-olive-50"
      : "text-neutral-500 dark:text-neutral-200";

  const isFavoriteCity = isFavorite(weather.location);
  /* console.log(
    "CityWeather: angle",
    angle,
    "direction",
    direction,
    "model",
    model,
  ); */
  return (
    <div
      className={`${containerClassName} ${selectedClassName}`}
      onClick={() => setPreviewCityId(weather.id)}
    >
      <div className="w-full">
        <div
          className={
            "flex justify-between items-start w-full text-neutral-500 dark:text-olive-300"
          }
        >
          <h3
            className={`content-center font-semibold max-w-32 text-xl truncate uppercase ${classNameLocation}`}
          >
            {weather.location.name}
          </h3>
          <div onClick={handleFavoriteClick} className="cursor-pointer text-yellow-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isFavoriteCity ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-star-icon lucide-star"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>
          </div>
        </div>
        <p className="text-sm text-neutral-400">Aktuelles Wetter</p>
        <div className="flex flex-row justify-start items-center gap-3 mt-3">
          <WeatherIcon
            code={weatherCode}
            className="text-neutral-400 dark:text-neutral-200"
            size={48}
          />
          <div className="flex flex-row justify-around items-start gap-1 text-neutral-400 dark:text-neutral-200 text-nowrap">
            <span className="text-3xl ">{temperature}</span>°
            <span className="text-xl">C</span>
          </div>
        </div>
      </div>
      {/* <Popover className="group relative">
        <PopoverButton className="flex items-center text-sm text-neutral-500">
          More...
          <ChevronDownIcon className="size-5 text-neutral-500 group-data-open:rotate-180" />
        </PopoverButton>
        <PopoverPanel
          anchor="bottom"
          className="flex flex-col justify-between items-start border border-neutral-400 bg-neutral-900 p-4 rounded-md gap-1 w-fit-content max-w-58"
        >
          <div className="flex flex-row justify-center items-center gap-3">
            <p className="text-xs text-center">
              <Droplets className="text-4xl text-neutral-400" />
              {relativeHumidity}%
            </p>
            <p className="text-xs text-center">
              <Wind className="text-4xl text-neutral-400" />
              {windSpeed}
            </p>
            <p className="text-xs text-center">
              <WiWindDeg className="text-2xl text-neutral-400" />
              {direction}
            </p>
            <WindDirection angle={angle} size={60} />
          </div>
        </PopoverPanel>
      </Popover> */}
      <div className="flex flex-row justify-center items-center gap-3">
        <p className="text-xs text-center text-neutral-400 dark:text-neutral-400">
          <Droplets className="text-4xl text-neutral-400 dark:text-neutral-400" />
          {relativeHumidity}%
        </p>
        <p className="text-xs text-center text-neutral-400 dark:text-neutral-400">
          <Wind className="text-4xl text-neutral-400 dark:text-neutral-400" />
          {windSpeed}
        </p>
        <p className="text-xs text-center text-neutral-400 dark:text-neutral-400">
          <WiWindDeg className="text-2xl text-neutral-400 dark:text-neutral-400" />
          {direction}
        </p>
        <WindDirection angle={angle} size={60} />
      </div>
      <div className="block w-full text-neutral-400 text-xs">
        {"Last: " +
          new Date(time).toLocaleString("de-DE", {
            dateStyle: "short",
            timeStyle: "short",
          })}
      </div>
      <div className="block text-neutral-400 text-xs truncate max-w-44">
        {model.name + " (" + model.model + ")"}
      </div>
    </div>
  );
};

export default React.memo(CityWeather);
