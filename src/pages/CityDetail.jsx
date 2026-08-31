import React, { useState, useMemo, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import { useWeather } from "../hooks/useWeather";
import { Link, useParams } from "react-router-dom";
import CityPanel from "../components/dashboard/CityPanel";
import DailyChart from "../components/dashboard/DailyChart";
import HourlyCard from "../components/dashboard/HourlyCard";
import styles from "../Styles";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CityDetail = () => {
  const { id } = useParams();
  const { model, results, favoriteList, recentList, getCity } = useWeather();
  const [maxHourly] = useState(9);
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
          <main className="container flex-1 flex flex-col justify-start items-start mx-auto py-2 text-olive-400 dark:text-olive-200">
            Stadt Detail wird geladen. Bitte warten Sie einen Moment.
          </main>
        </>
      );
    }
    return (
      <>
        <PageTitle title={"Stadt Detail nicht gefunden"} />
        <main className="container flex-1 flex flex-col justify-start items-start mx-auto py-2 text-olive-400 dark:text-olive-200">
          Stadt Detail nicht gefunden. Bitte überprüfen Sie die URL oder kehren Sie zur
          Startseite zurück.
          <Link
            to="/home"
            className="text-neutral-500 dark:text-olive-400 hover:underline"
          >
            Zurück zur Startseite
          </Link>
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
            Detaillierte Wetterinformationen für die ausgewählte Stadt werden hier
            angezeigt.
          </p>
          <div className="flex flex-col sm:flex-row justify-start items-center sm:items-start gap-4 p-2">
            <div className="flex mt-2 mb-2 max-w-96">
              <CityPanel hasDetail={false} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-lg p-2 w-full">
                {displayedHours.map((hour, index) => (
                  <HourlyCard key={hourlyOffset + index} active={true} weather={hour} />
                ))}
              </div>
              <div className="flex gap-2 justify-between items-center px-2">
                <button
                  onClick={handlePrevHour}
                  disabled={hourlyOffset === 0}
                  className={styles.btnSimple + " disabled:opacity-50 disabled:cursor-not-allowed text-sm"}
                >
                  ← Zurück
                </button>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {hourlyOffset + 1} - {Math.min(hourlyOffset + maxHourly, city.hourly.length)} von {city.hourly.length}
                </span>
                <span className="font-semibold text-sm text-neutral-600 dark:text-neutral-400">
                  {city.hourly[hourlyOffset].time} - {city.hourly[Math.min(hourlyOffset + maxHourly - 1, city.hourly.length - 1)].time}
                </span>
                <button
                  onClick={handleNextHour}
                  disabled={hourlyOffset >= Math.max(city.hourly.length - maxHourly, 0)}
                  className={styles.btnSimple + " disabled:opacity-50 disabled:cursor-not-allowed text-sm"}
                >
                  Weiter →
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
