import { useMemo, useState } from "react";
import { Checkbox } from "@headlessui/react";
import PageTitle from "../components/PageTitle";
import WeatherPanel from "../components/WeatherPanel";
import { useWeatherData } from "../hooks/useWeatherData";
import CitySearch from "../components/dashboard/CitySearch";
import CityList from "../components/dashboard/CityList";
import Sidebar from "../components/dashboard/Sidebar";
import ComparePanel from "../components/dashboard/ComparePanel";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Dashboard() {
  const {
    getCity,
    model,
    results,
    removeCity,
    previewCityId,
    selectedCities,
    searchLocations,
    setPreviewCityId,
    toggleCity,
    toggleCities,
  } = useWeatherData();

  const [textOpen, setTextOpen] = useState(true);

  const getSelectedCitiesData = useMemo(() => {
    return (selectedCities, results) => {
      const compareCities = results.filter((city) => selectedCities.has(city.id));
      const selectedCitiesData = compareCities.map((city) => {
        return {
          id: city.id,
          location: city.location,
          data: city.current || {},
          units: city.currentUnits || {},
          model: city.model || {},
        };
      });
      /* console.log(
        "getSelectedCitiesData: selectedCitiesData",
        selectedCitiesData,
      ); */
      return selectedCitiesData;
    };
  }, [selectedCities, results]);

  const getHourlyData = useMemo(() => {
    return (selectedCities, results) => {
      const compareCities = results.filter((city) => selectedCities.has(city.id));
      const selectedCitiesData = compareCities.map((city) => {
        const hourlyData = city.hourly?.time.map((t, index) => {
          return {
            time: t.toString().slice(-4),
            temperature: city.hourly?.temperature[index],
            relativeHumidity: city.hourly?.relativeHumidity[index],
            weatherCode: city.hourly?.weatherCode[index],
          };
        });
        return {
          id: city.id,
          location: city.location,
          data: hourlyData,
          units: city.hourlyUnits || {},
        };
      });
      console.log("getHourlyData:", selectedCitiesData);
      return selectedCitiesData;
    };
  }, [selectedCities, results]);

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
            /* apparentMax: city.daily?.apparentTemperatureMax[index],
            apparentMin: city.daily?.apparentTemperatureMin[index], */
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

  const handleCityChange = ({ id, type, checked }) => {
    console.log("id", id, "type", type, "checked", checked);
    // Handle the change in city selection here
    if (type === "toggle") {
      toggleCity(id);
    } else if (type === "remove") {
      removeCity(id);
    } else if (type === "all") {
      //console.log("handleCityChange: type all, checked", checked);
      // Handle select all logic here
      toggleCities(checked);
    }
  };

  const pClassName = "max-w-2xl text-neutral-300 " + (textOpen ? "" : "line-clamp-1");

  return (
    <>
      <PageTitle title="JP Weather - Dashboard" />
      <main className="flex-1 flex flex-col justify-between items-start gap-2 mb-8 p-8 w-full md:flex-row">
        <Sidebar>
          <CitySearch getCity={getCity} model={model} searchLocations={searchLocations} />
          <p className="text-neutral-400 pl-1">Filter mit Städten…</p>
          <CityList
            cities={results}
            selectedCities={selectedCities}
            onChange={handleCityChange}
          />
        </Sidebar>
        <section className="w-full p-2">
          <ComparePanel
            dailyData={getDaylyData(selectedCities, results)}
            previewCityId={previewCityId}
            selectedCitiesData={getSelectedCitiesData(selectedCities, results)}
            setPreviewCityId={setPreviewCityId}
          />
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
          <WeatherPanel
            previewCityId={previewCityId}
            results={results}
            setPreviewCityId={setPreviewCityId}
          />
        </section>
      </main>
    </>
  );
}
