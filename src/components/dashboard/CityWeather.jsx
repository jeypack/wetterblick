import React from "react";
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
import { Gauge, Droplets, Eye, MapPin, Wind, Thermometer } from "lucide-react";
import WindDirection from "../dashboard/WindDirection";
import { weatherModels } from "../../data/api";
import { useUserData } from "../../hooks/useUserData";

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
      return (
        <WiDaySprinkle className="text-5xl text-neutral-400 dark:text-neutral-200" />
      );
    case 55:
      return (
        <WiDaySprinkle className="text-5xl text-neutral-400 dark:text-neutral-200" />
      );
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
      return (
        <WiDaySnowWind className="text-5xl text-neutral-400 dark:text-neutral-200" />
      );
    case 77:
      return <WiDaySnow className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    case 73:
      return <WiDaySnow className="text-5xl text-neutral-400 dark:text-neutral-200" />;
    case 95:
    case 96:
    case 99:
      return (
        <WiDayThunderstorm className="text-5xl text-neutral-400 dark:text-neutral-200" />
      );
    default:
      return <WiDaySunny className="text-5xl text-neutral-400 dark:text-neutral-200" />;
  }
};

const CityWeather = ({ previewCityId, weather, setPreviewCityId }) => {
  const {
    time,
    temperature,
    relativeHumidity,
    windSpeed,
    windDirection: angle,
    weatherCode,
  } = weather?.current || {};
  const { updateFavorites, isFavorite } = useUserData();

  /* const getFirstUpper = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }; */
  const handleClick = () => {
    // set favorite city in context
    console.log("CityWeather: handleClick: weather.id", weather.id);
    updateFavorites(weather.location);
  }

  const model = getWeatherModel(weather.model);

  const direction = directions[Math.round(angle / 45) % 8];
  const startPos = { x: 30, y: 30, dif: 16 };

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
  
  const isFavoriteCity = isFavorite(weather.location);
    
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
          <div onClick={handleClick} className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isFavoriteCity ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
          </div>
          {/* <svg
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
              fill={
                weather.id === previewCityId
                  ? "var(--color-neutral-600)"
                  : "var(--color-neutral-50)"
              }
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg> */}
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

export default React.memo(CityWeather);