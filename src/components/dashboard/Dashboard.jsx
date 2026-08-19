import {useMemo, useState} from "react";
import {ChartArea} from "lucide-react";
import {Button, Checkbox} from "@headlessui/react";
import PageTitle from "../PageTitle";
import WeatherPanel from "../WeatherPanel";
import {useWeatherData} from "../../hooks/useWeatherData";
import CitySearch from "./CitySearch";
import CityList from "./CityList";
import Sidebar from "./Sidebar";
import ComparePanel from "./ComparePanel";
import {useTheme} from "../../hooks/useTheme";
import ThemeButton from "../ui/ThemeButton";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Header({title}) {
  const {theme, setTheme, updateTheme} = useTheme();

  return (
    <header className="sticky top-0 bg-neutral-50 border-b-12 border-neutral-400 dark:bg-neutral-800 dark:border-olive-600 flex flex-row gap-2 justify-start items-center h-16 mb-4 p-4 w-full z-40">
      <div className="flex flex-row justify-start items-center gap-2 text-neutral-500 dark:text-olive-400">
        <ChartArea className="block size-6" />
        <h1 className="text-2xl font-bold uppercase truncate w-40 sm:w-full">
          {title}
        </h1>
      </div>
      <div className="flex flex-row justify-start items-center gap-2 ml-auto">
        <div className="flex flex-row justify-center items-start gap-2">
          <ThemeButton
            onClick={() => updateTheme({mode: "light"})}
            active={theme.mode === "light"}
            size={"xs"}
          >
            Light
          </ThemeButton>
          <ThemeButton
            onClick={() => updateTheme({mode: "dark"})}
            active={theme.mode === "dark"}
            size={"xs"}
          >
            Dark
          </ThemeButton>
        </div>
        <p className="text-neutral-400 text-xs self-baseline-last">
          Version 0.0.1
        </p>
      </div>
    </header>
  );
}

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

  const [textOpen, setTextOpen] = useState(false);

  const getSelectedCitiesData = useMemo(() => {
    return (selectedCities, results) => {
      const compareCities = results.filter((city) =>
        selectedCities.has(city.id),
      );
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
      const compareCities = results.filter((city) =>
        selectedCities.has(city.id),
      );
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
      const compareCities = results.filter((city) =>
        selectedCities.has(city.id),
      );
      const selectedCitiesData = compareCities.map((city) => {
        const daylyData = city.daily?.time.map((t, index) => {
          const date = new Date(t);
          const day = date.getDay();
          return {
            date:
              DAYS_OF_WEEK[day] +
              " " +
              date.getDate() +
              "." +
              (date.getMonth() + 1),
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

  const handleCityChange = ({id, type, checked}) => {
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

  const pClassName = "max-w-2xl " + (textOpen ? "" : "line-clamp-1");

  return (
    <>
      <PageTitle title="JP Weather - Dashboard" />
      <Header title="Climate Analytics Dashboard" />
      <main className="bg-neutral-100 dark:bg-neutral-900 flex-1 flex flex-col justify-between items-start gap-2 mb-8 md:flex-row">
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
          <div className="flex flex-row justify-start items-end gap-4 text-neutral-500 dark:text-neutral-300 text-sm text-left mx-auto p-4 container w-full">
            <p className={pClassName}>
              Bekommen Sie Echtzeit-Wetterdaten und Vorhersagen für jeden
              Standort weltweit. Unser Dashboard liefert genaue und aktuelle
              Informationen, die Ihnen helfen, Ihren Tag, Ihre Woche oder Ihren
              Monat zu planen. Geben Sie einfach einen Standort ein und erhalten
              Sie detaillierte Wetterinformationen, einschließlich Temperatur,
              Luftfeuchtigkeit, Windgeschwindigkeit und mehr.
            </p>
            <button
              className="cursor-pointer text-neutral-400 dark:text-neutral-400 hover:underline"
              onClick={() => setTextOpen(!textOpen)}
            >
              {textOpen ? "[weniger]" : "[mehr]"}
            </button>
          </div>
          <ComparePanel
            dailyData={getDaylyData(selectedCities, results)}
            previewCityId={previewCityId}
            selectedCitiesData={getSelectedCitiesData(selectedCities, results)}
            setPreviewCityId={setPreviewCityId}
          />
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
