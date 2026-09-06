import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@headlessui/react";
import { WiWindDeg } from "react-icons/wi";
import { Droplets, CalendarRange, Wind, Thermometer } from "lucide-react";
import WindDirection from "./WindDirection";
import { useUserData } from "../../hooks/useUserData";
import WeatherIcon from "./WeatherIcon";
import { Button } from "@headlessui/react";
import RemoveCityDialog from "./RemoveCityDialog";
import styles from "../../Styles";

const dialogData = {
  title: "Stadt entfernen",
  description:
    "Dies wird diese Stadt dauerhaft aus deiner Liste löschen. Diese Aktion kann nicht rückgängig gemacht werden.",
  text: "Bist du sicher, dass du diese Stadt aus deiner Liste löschen möchtest? Alle deine Daten werden dauerhaft entfernt.",
  confirmText: "Löschen",
  cancelText: "Abbrechen",
};

const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

const CityFavoriteCard = ({ active, mode, favorite, onChange, onEdit }) => {
  const {
    id,
    time,
    temperature,
    relativeHumidity,
    windSpeed,
    windDirection: angle,
    weatherCode,
    location,
  } = favorite ?? {};
  const navigate = useNavigate();
  const { deleteFavorite } = useUserData();
  const [isOpen, setIsOpen] = useState(false);
  //console.log("CityFavoriteCard: favorite", favorite);

  const handleFavoriteClick = () => {
    console.log("CityFavoriteCard: handleFavoriteClick: favorite.id", id);
    dialogData.title = "Ort " + location.name + " entfernen?";
    setIsOpen(true);
  };

  const handleEditClick = () => {
    console.log("CityFavoriteCard: handleEditClick: favorite", favorite);
    dialogData.title = "Ort " + location.name + " bearbeiten?";
    //setIsOpen(true);
    if (onEdit) {
      onEdit(favorite);
    }
  };

  const handleConfirm = () => {
    setIsOpen(false);
    console.log("CityFavoriteCard: handleConfirm: favorite", favorite);
    deleteFavorite(favorite);
  };

  const classNameLocation = active
    ? "text-neutral-700 dark:text-olive-50"
    : "text-neutral-600 dark:text-neutral-200";

  //const model = getWeatherModel(favorite.model);
  const direction = directions[Math.round(angle / 45) % 8];
  const dateSplit = new Date(time)
    .toLocaleString("de-DE", {
      dateStyle: "long",
      timeStyle: "short",
    })
    .split("um");
  const date = dateSplit[0]; // Extract date from the formatted date string
  const timeStr = dateSplit[1]; // Extract time from the formatted date string

  const handleDetailClick = () => {
    // route to city detail page with lastCityData.location
    console.log("CityCard: handleDetailClick: id", id);
    navigate(`/city/${encodeURIComponent(id)}`);
  };

  return (
    <div
      className={`${styles.container} max-w-sm ${active ? styles.containerActive : ""}`}
    >
      <div className="w-full">
        <div
          className={
            "flex justify-between items-start w-full text-neutral-500 dark:text-olive-300"
          }
          onClick={handleDetailClick}
        >
          <h3
            className={`content-center font-semibold max-w-42 text-xl truncate uppercase ${classNameLocation}`}
          >
            {location.name}
          </h3>
          <div className="cursor-pointer" onClick={handleDetailClick}>
            {/* <MapPin size={32} className={"text-neutral-400 dark:text-neutral-200"} /> */}
            <div className="cursor-pointer text-neutral-400 dark:text-neutral-100 hover:scale-105 transition-transform duration-200 ease-in-out relative">
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
          </div>
        </div>
        <p className="text-sm text-neutral-400">Aktuelles Wetter</p>
        <div
          className="flex flex-row justify-start items-center gap-3 mt-3"
          onClick={handleDetailClick}
        >
          <WeatherIcon
            code={weatherCode}
            className="text-neutral-400 dark:text-neutral-200"
            size={48}
          />
          <div className="flex flex-row justify-around items-start gap-1 text-neutral-400 dark:text-neutral-200 text-nowrap">
            <Thermometer className="self-center" size={26} color="#ffffff" />
            <span className="text-3xl ">{temperature}</span>°
            <span className="text-xl">C</span>
          </div>
        </div>
      </div>

      <div
        className="flex flex-row justify-between items-center gap-3 w-full"
        onClick={handleDetailClick}
      >
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
      <div
        className="flex flex-row justify-start items-baseline gap-2 text-neutral-500 dark:text-neutral-200 text-nowrap text-sm"
        onClick={handleDetailClick}
      >
        <CalendarRange size={15} />
        <span>{date}</span>
        <span className="font-bold">{timeStr}</span>
      </div>
      <div className="text-neutral-500 dark:text-neutral-300 text-xs">
        {favorite.model.name}
      </div>
      <hr className="mb-2 mt-2 w-full border-neutral-500 dark:border-neutral-300/70" />
      <div className="flex flex-row justify-between items-center gap-3 mt-2 w-full">
        <Button onClick={handleEditClick} className={styles.btnSimple + " text-sm"}>
          Bearbeiten
        </Button>
        <Button onClick={handleFavoriteClick} className={styles.btnSimple + " text-sm"}>
          Löschen
        </Button>
        <Switch
          checked={active}
          onChange={(checked) => {
            onChange(checked, favorite);
          }}
          className={
            "group inline-flex h-6 w-11 items-center rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-400 transition data-checked:bg-neutral-200 dark:data-checked:bg-neutral-800" +
            (mode === "compare" ? "" : " invisible")
          }
        >
          <span className="size-4 translate-x-1 rounded-full bg-neutral-400 dark:bg-neutral-500 group-data-checked:bg-neutral-500 dark:group-data-checked:bg-neutral-300 transition group-data-checked:translate-x-5.75" />
        </Switch>
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

export default React.memo(CityFavoriteCard);
