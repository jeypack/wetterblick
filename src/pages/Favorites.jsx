import { useWeather } from "../hooks/useWeather";
import { useUserData } from "../hooks/useUserData";
import CityFavoriteCard from "../components/dashboard/CityFavoriteCard";
import PageTitle from "../components/PageTitle";
import ThemeButton from "../components/ui/ThemeButton";
import ComparePanel from "../components/dashboard/ComparePanel";
import { CirclePlus, GitCompareArrows } from "lucide-react";
import React, { useMemo, useState, useEffect } from "react";
import AddCityDialog from "../components/dashboard/AddCityDialog";
import EditCityDialog from "../components/dashboard/EditCityDialog";
import { Field, Label, Switch } from "@headlessui/react";

const dialogData = {
  title: "Ort finden und erstellen",
  formtitle: "Neuanlage",
  description: "Dies wird diese Stadt dauerhaft zu deiner Liste hinzufügen.",
  text: "Möchtest du diese Stadt zu deiner Liste hinzufügen?",
  confirmText: "Hinzufügen",
  cancelText: "Abbrechen",
};

const dialogDataEdit = {
  title: "Ort bearbeiten",
  formtitle: "Bearbeiten",
  description: "Dies wird deinen Ort in deiner Liste aktualisieren.",
  text: "Möchtest du diese Stadt in deiner Liste aktualisieren?",
  confirmText: "Aktualisieren",
  cancelText: "Abbrechen",
};

const Favorites = () => {
  const { favoriteList } = useWeather();
  const { updateFavorites, isComparing, setIsComparing } = useUserData();
  const [compareList, setCompareList] = useState(isComparing ? favoriteList : []);
  const [favoriteMode, setFavoriteMode] = useState("close");
  const [currentFavorite, setCurrentFavorite] = useState(null);
  const [previewCityId, setPreviewCityId] = useState(null);
  const [enabled, setEnabled] = useState(false);

  const selectedCitiesData = useMemo(
    () =>
      compareList.map((city) => ({
        id: city.id,
        location: city.location,
        data: {
          temperature: city.temperature,
          relativeHumidity: city.relativeHumidity,
          windSpeed: city.windSpeed,
          pressure: city.pressure ?? 1013,
        },
        units: {
          temperature: "°C",
          relativeHumidity: "%",
          windSpeed: "km/h",
          pressure: "hPa",
        },
      })),
    [compareList],
  );

  useEffect(() => {
    if (isComparing) {
      setCompareList(favoriteList);
    } else {
      setCompareList([]);
    }
    setEnabled(isComparing);
    setFavoriteMode(isComparing ? "compare" : "close");
  }, [isComparing, favoriteList]);

  useEffect(() => {
    if (compareList.length === 0) {
      setPreviewCityId(null);
      return;
    }

    if (!compareList.some((city) => city.id === previewCityId)) {
      setPreviewCityId(compareList[0].id);
    }
  }, [compareList, previewCityId]);

  //console.log("Favorites.jsx: favoriteList", favoriteList);
  
  const handleModeChange = (mode) => {
    console.log("Favorites.jsx: handleModeChange", mode);
    switch (mode) {
      case "create":
        setCompareList([]);
        setIsComparing(false);
        break;
      case "compare":
        setIsComparing(true);
        break;
      case "close":
        setIsComparing(false);
        break;
      default:
        console.warn("Favorites.jsx: handleModeChange: unknown mode", mode);
        break;
    }
    setFavoriteMode(mode);
  };

  const handleSelectAll = () => {
    if (compareList.length === favoriteList.length) {
      setCompareList([]);
      setIsComparing(false);
    } else {
      setCompareList(favoriteList);
      setIsComparing(true);
    }
  };

  const handleCityChange = (checked, favorite) => {
    //console.log("Favorites.jsx: handleCityChange", checked, favorite);
    if (checked) {
      setCompareList((prev) => [...prev, favorite]);
    } else {
      setCompareList((prev) => prev.filter((item) => item.id !== favorite.id));
    }
    setEnabled(checked);
  };

  const handleEditClick = (favorite) => {
    //console.log("Favorites.jsx: handleEditClick", favorite);
    setCurrentFavorite(favorite);
    setFavoriteMode("edit");
  };

  const handleConfirm = (favorite) => {
    //console.log("Favorites.jsx: handleConfirm", favorite);
    updateFavorites(favorite);
    setTimeout(() => {
      setFavoriteMode("close");
    }, 500);
  };

  return (
    <>
      <PageTitle title="Meine Orte" />
      <main className="container flex-1 flex flex-col justify-start items-start mx-auto py-2">
        <div className="flex flex-col sm:flex-row items-baseline justify-center gap-4 p-4 mb-8">
          <h1 className="text-xl text-neutral-400 font-bold mr-4 text-nowrap">Meine Orte verwalten</h1>
          <ThemeButton
            active={favoriteMode === "create"}
            onClick={() => handleModeChange("create")}
            className="text-nowrap"
            size="sm"
          >
            Ort hinzufügen <CirclePlus size={20} className="inline ml-1" />
          </ThemeButton>
          <ThemeButton
            active={favoriteMode === "compare"}
            onClick={() => handleModeChange("compare")}
            className="text-nowrap"
            size="sm"
          >
            Orte vergleichen <GitCompareArrows size={20} className="inline ml-1" />
          </ThemeButton>
          <Field as="div" className="flex flex-row justify-center items-center gap-2">
            <Label
              className={
                "cursor-pointer text-neutral-500 dark:text-olive-300" +
                (favoriteMode === "compare" ? "" : " invisible")
              }
            >
              Alle auswählen
            </Label>
            <Switch
              checked={enabled}
              onChange={(checked) => {
                setEnabled(checked);
                handleSelectAll();
              }}
              className={
                "group inline-flex h-6 w-11 items-center rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-400 transition data-checked:bg-neutral-200 dark:data-checked:bg-neutral-800" +
                (favoriteMode === "compare" ? "" : " invisible")
              }
            >
              <span className="size-4 translate-x-1 rounded-full bg-neutral-400 dark:bg-neutral-500 group-data-checked:bg-neutral-500 dark:group-data-checked:bg-neutral-300 transition group-data-checked:translate-x-5.75" />
            </Switch>
          </Field>
        </div>
        <div className="flex flex-wrap justify-center items-center mb-4 sm:justify-start gap-4 w-full">
          {favoriteMode === "compare" && (
            <div className="flex">
              <ComparePanel
                selectedCitiesData={selectedCitiesData}
                previewCityId={previewCityId}
                setPreviewCityId={setPreviewCityId}
              />
            </div>
          )}
          {favoriteList.map((result) => (
            <CityFavoriteCard
              key={result.id}
              active={compareList.some((city) => city.id === result.id)}
              favorite={result}
              mode={favoriteMode}
              onChange={handleCityChange}
              onEdit={handleEditClick}
            />
          ))}
        </div>
      </main>
      <AddCityDialog
        data={dialogData}
        isOpen={favoriteMode === "create"}
        setIsOpen={(isOpen) => {
          if (!isOpen) {
            handleModeChange("close");
          }
        }}
        onConfirm={handleConfirm}
      />
      <EditCityDialog
        favorite={currentFavorite}
        data={dialogDataEdit}
        isOpen={favoriteMode === "edit"}
        setIsOpen={(isOpen) => {
          if (!isOpen) {
            handleModeChange("close");
          }
        }}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default React.memo(Favorites);
