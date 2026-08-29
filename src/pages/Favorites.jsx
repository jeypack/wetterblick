import { useWeather } from "../hooks/useWeather";
import { useUserData } from "../hooks/useUserData";
import CityFavoriteCard from "../components/dashboard/CityFavoriteCard";
import PageTitle from "../components/PageTitle";
import ThemeButton from "../components/ui/ThemeButton";
import { CirclePlus, GitCompareArrows } from "lucide-react";
import React, { useState } from "react";
import AddCityDialog from "../components/dashboard/AddCityDialog";
import EditCityDialog from "../components/dashboard/EditCityDialog";

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
  const { updateFavorites } = useUserData();
  const [compareList, setCompareList] = useState([]);
  const [favoriteMode, setFavoriteMode] = useState("read");
  const [currentFavorite, setCurrentFavorite] = useState(null);

  console.log("Favorites.jsx: favoriteList", favoriteList);
  //(!favoriteList || favoriteList.length === 0)

  const handleModeChange = (mode) => {
    console.log("Favorites.jsx: handleModeChange", mode);
    switch (mode) {
      case "create":
        setCompareList([]);
        break;
      case "compare":
        //setCompareList([]);
        break;
      case "close":
        //setCompareList([]);
        break;
      default:
        console.warn("Favorites.jsx: handleModeChange: unknown mode", mode);
        break;
    }
    setFavoriteMode(mode);
  };

  const handleCityChange = (checked, favorite) => {
    console.log("Favorites.jsx: handleCityChange", checked, favorite);
    if (checked) {
      setCompareList((prev) => [...prev, favorite]);
    } else {
      setCompareList((prev) => prev.filter((item) => item.id !== favorite.id));
    }
  };

  const handleEditClick = (favorite) => {
    console.log("Favorites.jsx: handleEditClick", favorite);
    setCurrentFavorite(favorite);
    setFavoriteMode("edit");
  };

  const handleConfirm = (favorite) => {
    console.log("Favorites.jsx: handleConfirm", favorite);
    updateFavorites(favorite);
    setTimeout(() => {
      setFavoriteMode("close");
    }, 500);
  };

  return (
    <>
      <PageTitle title="Meine Orte" />
      <main className="container flex flex-col items-center sm:items-start justify-center mx-auto py-2">
        <div className="flex flex-col sm:flex-row items-baseline justify-center gap-4 p-4 mb-8">
          <h1 className="text-xl font-bold mr-4 text-nowrap">Meine Orte verwalten</h1>
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
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {favoriteList.map((result) => (
            <CityFavoriteCard
              key={result.id}
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
