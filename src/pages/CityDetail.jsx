import React, { useState, useMemo, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import { useWeather } from "../hooks/useWeather";
import { Link, useParams } from "react-router-dom";
import CityPanel from "../components/dashboard/CityPanel";
import DailyChart from "../components/dashboard/DailyChart";
import HourlyCard from "../components/dashboard/HourlyCard";
import styles from "../Styles";

/**
 * CityDetail page component.
 * Displays detailed weather information for a specific city.
 * Fetches city details from the weather API if not already available in the results, recent list, or favorite list.
 * Handles loading state and displays appropriate messages if the city is not found.
 *
 * @returns {JSX.Element} The city detail page component.
 */
const CityDetail = () => {
  const { id } = useParams();
  const { model, results, favoriteList, recentList, getCity } = useWeather();
  const [maxHourly] = useState(12);
  const [hourlyOffset, setHourlyOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  //wenn wir die city in results finden, dann haben wir auch Details
  //ansonsten schauen wir in recentList und auch favoriteList nach, ob
  // wir die city dort finden und dann die details laden
  let city = results.find((item) => item.id === id);
  //console.log("CityDetail: id", id, "city", city, "model", model);

  useEffect(() => {
    let location;
    if (city) return;
    city =
      recentList.find((item) => item.id === id) ||
      favoriteList.find((item) => item.id === id);
    if (city) {
      location = city.location;
    } else {
      console.log("CityDetail: city not found in results, recentList or favoriteList");
      return;
    }
    const fetchCity = async () => {
      await getCity(location, model);
      setLoading(false);
    };
    fetchCity();
    setLoading(true);
  }, [city, recentList, model]);

  if (!city) {
    if (loading) {
      return (
        <>
          <PageTitle title={"Stadt Detail wird geladen"} />
          <main className="container flex-1 flex flex-col justify-start items-start mx-auto py-2">
            <section className="flex flex-row justify-center items-start p-2 w-auto">
              Stadt Detail wird geladen. Bitte warten Sie einen Moment.
              <span id="search-spinner" className="ml-2 self-baseline" />
            </section>
          </main>
        </>
      );
    }
    return (
      <>
        <PageTitle title={"Stadt Detail nicht gefunden"} />
        <main className="container flex-1 flex flex-col justify-start items-start mx-auto py-2">
          <section className="flex flex-col justify-center items-start p-2 w-auto">
            Stadt Detail nicht gefunden. Bitte überprüfen Sie die URL oder kehren Sie zur
            Startseite zurück.
            <Link
              to="/home"
              className="text-neutral-500 dark:text-olive-400 hover:underline"
            >
              Zurück zur Startseite
            </Link>
          </section>
        </main>
      </>
    );
  }

  //console.log("CityDetail:", "city.daily", city.daily);

  const handlePrevHour = () => {
    setHourlyOffset((prev) => Math.max(prev - 1, 0));
  };

  const handleNextHour = () => {
    const maxOffset = Math.max(city.hourly.length - maxHourly, 0);
    setHourlyOffset((prev) => Math.min(prev + 1, maxOffset));
  };

  const displayedHours = city.hourly.slice(hourlyOffset, hourlyOffset + maxHourly);

  return (
    <>
      <PageTitle title={"Wetter Details " + city.location?.name} />
      <main className="container flex-1 flex flex-col justify-start items-start mx-auto py-2">
        <section className="flex flex-col justify-center items-start p-2 w-auto">
          <p className="text-neutral-600 dark:text-neutral-300 text-left">
            Detaillierte Wetterinformationen für die ausgewählte Stadt.
          </p>
          <div className="flex flex-col sm:flex-row justify-start items-center sm:items-start gap-4 mt-2 p-2">
            <div className="flex mt-2 mb-2 w-full sm:w-80 lg:w-96">
              <CityPanel hasDetail={false} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 p-2 w-full">
                {displayedHours.map((hour, index) => (
                  <HourlyCard key={hourlyOffset + index} active={true} weather={hour} />
                ))}
              </div>
              <div className="flex gap-1 justify-between items-center px-2">
                <button
                  type="button"
                  onClick={() => setHourlyOffset(0)}
                  disabled={hourlyOffset === 0}
                  className={
                    styles.btnSimple +
                    " disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handlePrevHour}
                  disabled={hourlyOffset === 0}
                  className={
                    styles.btnSimple +
                    " disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  }
                >
                  ← Zurück
                </button>
                <span className="text-sm text-center text-neutral-600 dark:text-neutral-400">
                  {hourlyOffset + 1} -{" "}
                  {Math.min(hourlyOffset + maxHourly, city.hourly.length)} von{" "}
                  {city.hourly.length}
                </span>
                <span className="font-semibold text-center text-xs text-neutral-600 dark:text-neutral-400">
                  {city.hourly[hourlyOffset].time} -{" "}
                  {
                    city.hourly[
                      Math.min(hourlyOffset + maxHourly - 1, city.hourly.length - 1)
                    ].time
                  }
                </span>
                <button
                  type="button"
                  onClick={handleNextHour}
                  disabled={hourlyOffset >= Math.max(city.hourly.length - maxHourly, 0)}
                  className={
                    styles.btnSimple +
                    " disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  }
                >
                  Weiter →
                </button>
                <button
                  type="button"
                  onClick={() => setHourlyOffset(city.hourly.length - maxHourly)}
                  disabled={hourlyOffset >= Math.max(city.hourly.length - maxHourly, 0)}
                  className={
                    styles.btnSimple +
                    " disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col justify-start items-start p-2 w-full">
          <p className="text-neutral-600 dark:text-neutral-300 text-left">
            Vorhersage für die nächsten Tage
          </p>
          <div className="h-100 w-full p-2">
            <DailyChart chartData={city.daily} />
          </div>
        </section>
      </main>
    </>
  );
};

export default React.memo(CityDetail);
