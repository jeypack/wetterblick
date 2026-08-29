import React, { useState, useMemo, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import { useWeather } from "../hooks/useWeather";
import { Link, useParams } from "react-router-dom";
import CityPanel from "../components/dashboard/CityPanel";
import DailyChart from "../components/dashboard/DailyChart";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CityDetail = () => {
  const { id } = useParams();
  const { model, results, favoriteList, recentList, getCity } = useWeather();
  //wenn wir die city in results finden, dann haben wir auch Details
  //ansonsten schauen wir in recentList und auch favoriteList nach, ob
  // wir die city dort finden und dann die details laden
  let city = results.find((item) => item.id === id);
  console.log("CityDetail: id", id, "city", city, "model", model);

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
    };
    fetchCity();
  }, [city, recentList, model]);

  if (!city) {
    return (
      <>
        <PageTitle title={"Stadt Detail nicht gefunden"} />
        <main className="container flex flex-col items-center sm:items-start justify-center mx-auto py-2">
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

  const dailyData =
    city.daily?.time.map((t, index) => {
      const date = new Date(t);
      const day = date.getDay();
      return {
        date: DAYS_OF_WEEK[day] + " " + date.getDate() + "." + (date.getMonth() + 1),
        temperatureMax: city.daily?.temperature[index],
        temperatureMin: city.daily?.temperatureMin[index],
        temperature: [city.daily?.temperatureMin[index], city.daily?.temperature[index]],
        weatherCode: city.daily?.weatherCode[index],
      };
    }) || [];
  console.log("CityDetail: dailyData", dailyData, "city.daily", city.daily);
  /* 
  const getDaylyData = useMemo(() => {
    return (selectedCities, results) => {
      const compareCities = results.filter((city) => selectedCities.has(city.id));
      const selectedCitiesData = compareCities.map((city) => {
        const daylyData = city.daily?.time.map((t, index) => {
          const date = new Date(t);
          const day = date.getDay();
          return {
            date: DAYS_OF_WEEK[day] + " " + date.getDate() + "." + (date.getMonth() + 1),
            temperatureMax: city.daily?.temperature[index],
            temperatureMin: city.daily?.temperatureMin[index],
            temperature: [
              city.daily?.temperatureMin[index],
              city.daily?.temperature[index],
            ],
            weatherCode: city.daily?.weatherCode[index],
          };
        });
        return {
          id: city.id,
          location: city.location,
          data: daylyData,
          units: city.dailyUnits || {},
        };
      });
      //console.log("getDaylyData:", selectedCitiesData);
      return selectedCitiesData;
    };
  }, [selectedCities, results]);
  //const dailyData = getDaylyData(selectedCities, results);
  const daylyData = city.daily?.time.map((t, index) => {
    const date = new Date(t);
    const day = date.getDay();
    return {
      date: DAYS_OF_WEEK[day] + " " + date.getDate() + "." + (date.getMonth() + 1),
      temperatureMax: city.daily?.temperature[index],
      temperatureMin: city.daily?.temperatureMin[index],
      temperature: [city.daily?.temperatureMin[index], city.daily?.temperature[index]],
      weatherCode: city.daily?.weatherCode[index],
    };
  });
  const dailyDataForPreviewCity = useMemo(() => {
    return dailyData.find((city) => city.id === previewCityId);
  }, [dailyData, previewCityId]);
 */
  return (
    <>
      <PageTitle title={"Stadt " + city?.location?.name + " Wetter Detail"} />
      <main className="container flex flex-col items-center sm:items-start justify-center mx-auto py-2">
        <section className="flex flex-col justify-start items-start p-2 w-full">
          <div className="max-w-xl">
            <CityPanel hasDetail={false} />
          </div>
          <div className="flex flex-row justify-start items-start gap-4 text-neutral-500 dark:text-neutral-300 text-sm text-left p-4 w-xl">
            <p className="max-w-2xl text-neutral-600 dark:text-neutral-300">
              Detaillierte Wetterinformationen für die ausgewählte Stadt werden hier
              angezeigt.
            </p>
          </div>
        </section>
        <section className="max-h-72 md:w-3xl p-2">
          <DailyChart chartData={dailyData} />
        </section>
      </main>
    </>
  );
};

export default React.memo(CityDetail);
