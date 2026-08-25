import { Button } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { MapPin, CalendarRange, ZoomIn } from "lucide-react";
import { memo } from "react";
import { useWeather } from "../../hooks/useWeather";
import { useUserData } from "../../hooks/useUserData";
import WeatherIcon from "./WeatherIcon";
import { weatherCodes } from "../../data/api";
//import teilweiseBewoelkt from "../../assets/teilweise-bewoelkt.jpg";

const CityPanel = ({ dailyData, previewCityId }) => {
  const { recentList } = useWeather();
  const { updateFavorites, isFavorite } = useUserData();
  //const lastDailyData = dailyData[dailyData.length - 1];
  //console.log("lastDailyData", lastDailyData);
  /* const dailyDataForPreviewCity = useMemo(() => {
    return dailyData.find((city) => city.id === previewCityId);
  }, [dailyData, previewCityId]); */
  //console.log("dailyDataForPreviewCity", dailyDataForPreviewCity);
  /* const lastCityData = useMemo(() => {
    return selectedCitiesData.find((city) => city.id === previewCityId);
  }, [selectedCitiesData, previewCityId]); */
  const lastCityData = recentList[0];
  const getWeatherDescription = (code) => {
    const description = weatherCodes[code];
    return description ? description.de : "Unbekanntes Wetter";
  };
  const getWeatherImage = (code) => {
    const image = weatherCodes[code].image;
    return image;
  };
  //console.log("lastCityData", lastCityData);
  //console.log("description", getWeatherDescription(lastCityData?.weatherCode));
  if (!lastCityData) {
    return (
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 flex flex-col justify-start items-start gap-6 p-4 rounded-xl w-auto min-h-60 transition-shadow duration-200 ease-in-out shadow-md lg:flex-row">
        <div className="flex flex-col justify-start items-start gap-2 relative w-full">
          <h6 className="text-neutral-400 dark:text-neutral-300 text-lg pl-1">
            Keine Vorschau verfügbar
          </h6>
        </div>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    // set favorite city in context
    console.log("CityCard: handleFavoriteClick: lastCityData.id", lastCityData.id);
    updateFavorites(lastCityData.location);
  };

  const handleDetailClick = () => {
    // set favorite city in context
    console.log("CityCard: handleDetailClick: lastCityData.id", lastCityData.id);
    //updateFavorites(lastCityData.location);
  };

  const isFavoriteCity = isFavorite(lastCityData.location);
  const dateSplit = new Date(lastCityData.time)
    .toLocaleString("de-DE", {
      dateStyle: "long",
      timeStyle: "short",
    })
    .split("um");
  const date = dateSplit[0]; // Extract date from the formatted date string
  const time = dateSplit[1]; // Extract time from the formatted date string

  return (
    <div className={"bg-white dark:bg-neutral-800 bg-cover bg-blend-overlay border border-neutral-200 dark:border-neutral-600 flex flex-col justify-start items-start gap-6 p-6 rounded-xl w-auto min-h-60 transition-shadow duration-200 ease-in-out shadow-md lg:flex-row lg:max-w-4xl relative"} style={{ backgroundImage: `url(${getWeatherImage(lastCityData.weatherCode)})` }}>
      <div className="flex flex-col justify-start items-start gap-2 relative w-fit">
        <WeatherIcon
          code={lastCityData.weatherCode}
          className="text-neutral-400 dark:text-neutral-200"
          size={90}
        />
        <div className="flex flex-row justify-around items-start gap-1 text-neutral-400 dark:text-neutral-200 text-nowrap">
          <span className="text-4xl ">{lastCityData.temperature}</span>°
          <span className="text-2xl">C</span>
        </div>
        <div className="text-neutral-400 dark:text-neutral-200 text-nowrap text-sm">
          {getWeatherDescription(lastCityData.weatherCode)}
        </div>
        <div className="flex flex-row justify-start items-center gap-2 mt-2 text-neutral-400 dark:text-neutral-200 text-nowrap text-sm">
          <span>Gefühlt:</span>
          <span className="font-bold">{lastCityData.apparentTemperature}°C</span>
        </div>
        <div className="flex flex-row justify-start items-center gap-2 text-neutral-400 dark:text-neutral-200 text-nowrap text-sm">
          <span>Luftfeuchtigkeit:</span>
          <span className="font-bold">{lastCityData.relativeHumidity}%</span>
        </div>
        <hr className="mb-2 mt-1 w-full border-neutral-500 dark:border-neutral-300/70" />
        <div className="flex flex-row justify-start items-baseline gap-2 text-neutral-400 dark:text-neutral-200 text-nowrap text-sm">
          <MapPin size={15} color="#ffffff" />
          <span className="font-bold">
            {lastCityData.location.name},
          </span>
          <span>
            {lastCityData.location.country}
          </span>
        </div>
        <div className="flex flex-row justify-start items-baseline gap-2 text-neutral-400 dark:text-neutral-200 text-nowrap text-sm">
          <CalendarRange size={15} color="#ffffff" />
          <span>{date}</span>
          <span className="font-bold">{time}</span>
          <span className="text-neutral-400 dark:text-neutral-400 text-xs ml-4">
            {lastCityData.model.name}
          </span>
        </div>
      </div>
      <div
        onClick={handleDetailClick}
        className="cursor-pointer text-white absolute bottom-6 right-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <div
        onClick={handleFavoriteClick}
        className="cursor-pointer text-white absolute top-6 right-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={isFavoriteCity ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-star-icon lucide-star size-8"
        >
          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
        </svg>
      </div>
    </div>
  );
};
export default memo(CityPanel);
