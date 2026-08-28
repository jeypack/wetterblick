import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import { useWeather } from "../hooks/useWeather";
import CitySearch from "../components/dashboard/CitySearch";
import Sidebar from "../components/dashboard/Sidebar";
import RecentLocations from "../components/dashboard/RecentLocations";
import CityPanel from "../components/dashboard/CityPanel";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Dashboard = () => {
  const { getCity, model, recentList, searchLocations } = useWeather();

  const [textOpen, setTextOpen] = useState(true);

  const pClassName =
    "max-w-2xl text-neutral-600 dark:text-neutral-300 " +
    (textOpen ? "" : "line-clamp-1");

  return (
    <>
      <PageTitle title="Wetter Suche" />
      <main className="flex-1 flex flex-col justify-between items-start gap-2 mb-8 md:p-8 w-full md:flex-row">
        <Sidebar>
          <CitySearch
            onSubmit={getCity}
            model={model}
            searchLocations={searchLocations}
          />
          <RecentLocations recentList={recentList} />
        </Sidebar>
        <section className="w-full p-2">
          <CityPanel />
          <div className="flex flex-row justify-start items-end gap-4 text-neutral-500 dark:text-neutral-300 text-sm text-left mx-auto p-4 container w-full">
            <p className={pClassName}>
              Bekommen Sie Echtzeit-Wetterdaten und Vorhersagen für jeden Standort
              weltweit. Unser Dashboard liefert genaue und aktuelle Informationen, die
              Ihnen helfen, Ihren Tag, Ihre Woche oder Ihren Monat zu planen. Geben Sie
              einfach einen Standort ein und erhalten Sie detaillierte
              Wetterinformationen, einschließlich Temperatur, Luftfeuchtigkeit,
              Windgeschwindigkeit und mehr.
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
