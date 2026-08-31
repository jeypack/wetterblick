import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import { useWeather } from "../hooks/useWeather";
import CitySearch from "../components/dashboard/CitySearch";
import Sidebar from "../components/dashboard/Sidebar";
import RecentLocations from "../components/dashboard/RecentLocations";
import CityPanel from "../components/dashboard/CityPanel";
import { Link } from "react-router-dom";
import styles from "../Styles";

const Dashboard = () => {
  const { getCity, model, recentList, searchLocations } = useWeather();

  const [textOpen, setTextOpen] = useState(true);

  const pClassName =
    "max-w-2xl text-neutral-600 dark:text-neutral-300 " +
    (textOpen ? "" : "line-clamp-1");

  const handleUpdate = (location) => {
    getCity(location);
  };

  return (
    <>
      <PageTitle title="Wetter Suche" />
      <main className="flex-1 flex flex-col justify-between items-start gap-2 md:p-8 w-full md:flex-row">
        <Sidebar>
          <CitySearch
            onSubmit={getCity}
            model={model}
            searchLocations={searchLocations}
          />
          <RecentLocations recentList={recentList} onUpdate={handleUpdate} />
        </Sidebar>
        <section className="w-full p-2">
          <CityPanel />
          <div className="flex flex-col justify-start items-start gap-4 text-neutral-500 dark:text-neutral-300 text-sm text-left mx-auto p-4 container w-full">
            <h4 className="font-semibold text-neutral-500 dark:text-olive-400">
              Wettervorschau
            </h4>
            <h5 className="font-medium text-neutral-600 dark:text-olive-300">
              Melde dich an, um das volle Wettererlebnis zu nutzen
            </h5>
            <div className="flex flex-row justify-start items-center gap-4 text-neutral-500 dark:text-neutral-300 text-sm text-left mx-auto p-4 container w-full">
              <Link to="/login/login" className={styles.btn}>
                Anmelden
              </Link>
              <Link to="/login/register" className={styles.btn}>
                Registrieren
              </Link>
            </div>
          </div>
          <div className="flex flex-row justify-start items-end gap-4 text-neutral-500 dark:text-neutral-300 text-sm text-left mx-auto p-4 container w-full">
            <p className={pClassName}>
              Bekomme Echtzeit-Wetterdaten und Vorhersagen für jeden Standort weltweit.
              Unser Dashboard liefert genaue und aktuelle Informationen, die dir helfen,
              deinen Tag, deine Woche oder deinen Monat zu planen. Gib einfach einen
              Standort ein und erhalte detaillierte Wetterinformationen, einschließlich
              Temperatur, Luftfeuchtigkeit, Windgeschwindigkeit und mehr.
            </p>
            <button
              className="cursor-pointer text-neutral-400 dark:text-neutral-400 italic hover:underline"
              onClick={() => setTextOpen(!textOpen)}
            >
              {textOpen ? "[weniger]" : "[mehr]"}
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default React.memo(Dashboard);
