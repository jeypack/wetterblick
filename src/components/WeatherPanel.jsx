import React from "react";
import {Popover, PopoverButton, PopoverPanel} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import InputField from "./InputField";
import {
  WiDaySunny,
  WiDayCloudy,
  WiDayRainMix,
  WiDayRain,
  WiDaySprinkle,
  WiDayRainWind,
  WiDaySnow,
  WiDaySnowWind,
  WiDayThunderstorm,
  WiDayFog,
  WiCloudyWindy,
  WiCloudyGusts,
  WiFog,
  WiWindDeg,
} from "react-icons/wi";
import {Gauge, Droplets, Eye, MapPin, Wind, Thermometer} from "lucide-react";
import WindDirection from "./dashboard/WindDirection";
import {weatherModels} from "../data/api";

export const directionsFull = [
  "North",
  "North-East",
  "East",
  "South-East",
  "South",
  "South-West",
  "West",
  "North-West",
];
export const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

const getWeatherModel = (modelName) => {
  const model = weatherModels.find((item) => item.model === modelName);
  return model ? model : null;
};

const getWeatherIcon = (code) => {
  switch (code) {
    case 0:
      return <WiDaySunny className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    case 1:
    case 2:
    case 3:
      return <WiDayCloudy className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    case 45:
    case 48:
      return <WiDayFog className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    case 51:
    case 53:
      return <WiDaySprinkle className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    case 55:
      return <WiDaySprinkle className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    case 56:
    case 57:
      return <WiDayRainMix className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    case 61:
      return <WiDayRainMix className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    case 63:
      return <WiDayRain className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    case 65:
      return <WiDayRain className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    case 66:
    case 67:
      return <WiDayRain className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    case 71:
      return <WiDaySnow className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    case 73:
      return <WiDaySnow className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    case 75:
      return <WiDaySnowWind className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    case 77:
      return <WiDaySnow className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    case 73:
      return <WiDaySnow className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    case 95:
    case 96:
    case 99:
      return <WiDayThunderstorm className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    default:
      return <WiDaySunny className="text-5xl text-neutral-400 dark:text-neutral-200" />;
  }
};

const WeatherPanel = ({previewCityId, results, setPreviewCityId}) => {
  const currentWeather = results.at(-1);
  if (!currentWeather) {
    return null;
  }
  return (
    <section className="flex flex-col justify-center items-center gap-4 mx-auto p-4 container w-full">
      <p className="p-2 text-neutral-400">
        {currentWeather.location && `Letzte Suchergebnisse für: `}
        <span className="font-bold text-neutral-300">
          {currentWeather.location}
        </span>
      </p>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {results.map((result) => (
          <CityWeather
            key={result.id}
            previewCityId={previewCityId}
            setPreviewCityId={setPreviewCityId}
            weather={result}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(WeatherPanel);

const CityWeather = ({previewCityId, weather, setPreviewCityId}) => {
  const {
    time,
    temperature,
    relativeHumidity,
    windSpeed,
    windDirection: angle,
    weatherCode,
  } = weather?.current || {};

  /* const getFirstUpper = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }; */
  const model = getWeatherModel(weather.model);

  const direction = directions[Math.round(angle / 45) % 8];
  const startPos = {x: 30, y: 30, dif: 16};

  const containerClassName =
    "cursor-pointer flex flex-col justify-center items-start gap-2 border-2 p-4 rounded-md w-auto min-w-50 hover:-translate-y-1 transition-transform duration-200 ease-in-out hover:shadow-lg";
  const selectedClassName =
    previewCityId === weather.id
      ? "bg-neutral-100 border-neutral-400 shadow-neutral-900/20 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:shadow-neutral-900/20  shadow-lg -translate-y-1"
      : "bg-neutral-50 border-neutral-300 hover:shadow-neutral-900/20 dark:bg-neutral-800 dark:border-neutral-600 dark:hover:shadow-neutral-900/20";
  /* console.log(
    "CityWeather: angle",
    angle,
    "direction",
    direction,
    "model",
    model,
  ); */
  const classNameLocation =
    weather.id === previewCityId
      ? "text-neutral-600 dark:text-olive-50"
      : "text-neutral-500 dark:text-neutral-200";
  return (
    <div
      className={`${containerClassName} ${selectedClassName}`}
      onClick={() => setPreviewCityId(weather.id)}
    >
      <div className="w-full">
        <div className={"flex justify-between items-start w-full text-neutral-500 dark:text-olive-300"}>
          <h3 className={`content-center font-semibold max-w-32 text-xl truncate uppercase ${classNameLocation}`}>
            {weather.location}
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={weather.id === previewCityId ? "var(--color-neutral-600)" : "var(--color-neutral-50)"}
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        </div>
        <p className="text-sm text-neutral-400">Aktuelles Wetter</p>
        <div className="flex flex-row justify-start items-center gap-3 mt-3">
          {getWeatherIcon(weatherCode)}
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
