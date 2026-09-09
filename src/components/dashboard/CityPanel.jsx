import { Brain, Moon, Eclipse, MapPin, CalendarRange } from "lucide-react";
import { memo, useState } from "react";
import { useWeather } from "../../hooks/useWeather";
import { useUserData } from "../../hooks/useUserData";
import WeatherIcon from "./WeatherIcon";
import { weatherCodes } from "../../data/api";
import { useOverlay } from "../../hooks/useOverlay";
import RemoveCityDialog from "./RemoveCityDialog";
import { useNavigate } from "react-router-dom";
import styles from "../../Styles";

const dialogData = {
  title: "Stadt entfernen",
  description:
    "Dies wird diese Stadt dauerhaft aus deiner Liste löschen. Diese Aktion kann nicht rückgängig gemacht werden.",
  text: "Bist du sicher, dass du diese Stadt aus deiner Liste löschen möchtest? Alle deine Daten werden dauerhaft entfernt.",
  confirmText: "Löschen",
  cancelText: "Abbrechen",
};

const CityPanel = ({ hasDetail = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { recentList } = useWeather();
  const { updateFavorites, deleteFavorite, isFavorite } = useUserData();
  const { setToastMessage } = useOverlay();
  const navigate = useNavigate();

  const lastCityData = recentList[0];
  //console.log("lastCityData", lastCityData);
  if (!lastCityData) {
    return (
      <div
        className={
          styles.container +
          " relative bg-cover bg-center w-full max-w-4xl min-h-60 " +
          (hasDetail ? styles.containerActive : "")
        }
      >
        <div className="flex flex-col justify-start items-start gap-2 relative w-full">
          <h6 className="text-neutral-700 dark:text-neutral-300 text-lg pl-1">
            Keine Vorschau verfügbar
          </h6>
        </div>
      </div>
    );
  }
  const getWeatherDescription = (code) => {
    const weatherCodeItem = weatherCodes.find((item) => item.code === code);
    return weatherCodeItem ? weatherCodeItem.de : "Unbekanntes Wetter";
  };
  const getWeatherImage = (code) => {
    const weatherCodeItem = weatherCodes.find((item) => item.code === code);
    return weatherCodeItem ? weatherCodeItem.image : "";
  };

  const handleFavoriteClick = () => {
    // set favorite city in context
    console.log("CityCard: handleFavoriteClick: lastCityData.id", lastCityData);
    const isFav = isFavorite(lastCityData.location);
    console.log("CityCard: handleFavoriteClick: isFav", isFav);
    if (isFav) {
      dialogData.title = "Favorit " + lastCityData.location.name + " entfernen?";
      setIsOpen(true);
      //setToastMessage("Favorit entfernt: " + lastCityData.location.name);
    } else {
      setToastMessage("✓ Favorit hinzugefügt: " + lastCityData.location.name);
      updateFavorites({
        id: lastCityData.id,
        location: lastCityData.location,
        title: "Favorit " + lastCityData.location.name,
        note: "",
      });
    }
  };

  const handleDetailClick = () => {
    // route to city detail page with lastCityData.location
    console.log("CityCard: handleDetailClick: lastCityData.id", lastCityData.id);
    navigate(`/city/${encodeURIComponent(lastCityData.id)}`);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    console.log("CityCard: handleConfirm: lastCityData.id", lastCityData.id);
    deleteFavorite(lastCityData.id || lastCityData.location);
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
    <div
      className={
        styles.container +
        " relative bg-cover bg-center w-full max-w-4xl min-h-60 " +
        (hasDetail ? styles.containerActive : "")
      }
      style={{ backgroundImage: `url(${getWeatherImage(lastCityData.weatherCode)})` }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(70deg,rgba(2,6,23,0.72)_0%,rgba(2,6,23,0.64)_30%,rgba(2,6,23,0.28)_52%,rgba(2,6,23,0)_100%)] dark:bg-[linear-gradient(90deg,rgba(2,6,23,0.82)_0%,rgba(2,6,23,0.64)_30%,rgba(2,6,23,0.28)_52%,rgba(2,6,23,0)_100%)]" />
      <div className="relative flex flex-col justify-start items-start gap-2 w-fit z-10">
        <WeatherIcon
          code={lastCityData.weatherCode}
          className="text-neutral-50 dark:text-neutral-200"
          size={80}
        />
        <div className="flex flex-row justify-around items-start gap-1 text-neutral-50 dark:text-neutral-200 text-nowrap">
          <span className="text-4xl ">{lastCityData.temperature}</span>°
          <span className="text-2xl">C</span>
        </div>
        <div className="text-neutral-50 dark:text-neutral-200 text-nowrap text-sm">
          {getWeatherDescription(lastCityData.weatherCode)}
        </div>
        <div className="flex flex-row justify-start items-center gap-2 mt-2 text-neutral-50 dark:text-neutral-200 text-nowrap text-sm">
          <span>Gefühlt:</span>
          <span className="font-bold">{lastCityData.apparentTemperature}°C</span>
        </div>
        <div className="flex flex-row justify-start items-center gap-2 text-neutral-50 dark:text-neutral-200 text-nowrap text-sm">
          <span>Luftfeuchtigkeit:</span>
          <span className="font-bold">{lastCityData.relativeHumidity}%</span>
        </div>
        <hr className="mb-2 mt-1 w-full border-neutral-500 dark:border-neutral-300/70" />
        <div className="flex flex-row justify-start items-baseline gap-2 text-neutral-50 dark:text-neutral-200 text-nowrap text-sm">
          <MapPin size={15} />
          <span className="font-bold">{lastCityData.location.name},</span>
          <span>{lastCityData.location.country}</span>
        </div>
        <div className="flex flex-row justify-start items-baseline gap-2 text-neutral-50 dark:text-neutral-200 text-nowrap text-sm">
          <CalendarRange size={15} />
          <span>{date}</span>
          <span className="font-bold">{time}</span>
          {lastCityData.isDay ? (
            <Eclipse className="self-center" size={16} />
          ) : (
            <Moon className="self-center" size={16} />
          )}
          {hasDetail && (
            <span className="flex flex-row justify-start items-baseline text-neutral-50 dark:text-neutral-300 text-xs ml-4">
              <Brain className="self-center mr-2" size={16} />{lastCityData.model.name}
            </span>
          )}
        </div>
        {hasDetail === false && (
          <div className="flex flex-row justify-start items-baseline text-neutral-50 dark:text-neutral-300 text-xs ml-0 mb-1">
            <Brain className="self-center mr-2" size={16} />{lastCityData.model.name}
          </div>
        )}
      </div>
      {hasDetail && (
        <div
          onClick={handleDetailClick}
          className="cursor-pointer text-white absolute bottom-6 right-6 hover:scale-105 transition-transform duration-200 ease-in-out group z-10"
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
      )}

      <div
        onClick={handleFavoriteClick}
        className="cursor-pointer text-white absolute top-6 right-6 hover:scale-105 transition-transform duration-200 ease-in-out group z-10"
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
      <RemoveCityDialog
        data={dialogData}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={handleConfirm}
      />
    </div>
  );
};
export default memo(CityPanel);
