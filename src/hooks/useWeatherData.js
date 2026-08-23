import { useState, useEffect } from "react";
import { getGeocodingData, getWeatherForecast, getWeather } from "../data/api";
import { useUserData } from "../hooks/useUserData";

export function useWeatherData(initialLocation = "") {
  const [model, setModel] = useState("knmi_seamless");
  const [previewCityId, setPreviewCityId] = useState(null);
  const [results, setResults] = useState([]);
  const [selectedCities, setSelectedCities] = useState(new Set());
  const { updateRecentLocations } = useUserData();

  const update = (modelToUse, weatherData) => {
    setModel(modelToUse);
    setSelectedCities((prev) => {
      if (prev.has(weatherData.id)) return prev;

      const next = new Set(prev);
      next.add(weatherData.id);
      return next;
    });

    setResults((prev) => {
      const index = prev.findIndex((city) => city.location === weatherData.location);

      if (index !== -1) {
        const next = [...prev];
        next[index] = weatherData;
        return next;
      }

      return [...prev, weatherData];
    });

    setPreviewCityId(weatherData.id);
  };

  const getCity = async (location, modelParam) => {
    const modelToUse = modelParam || model;
    console.log("location", location);
    const weatherData =
      typeof location === "string"
        ? await getWeatherForecast(location, modelToUse)
        : await getWeather(location, modelToUse);

    update(modelToUse, weatherData);
    await updateRecentLocations(location);
  };

  const removeCity = (id) => {
    setResults((prev) => prev.filter((city) => city.id !== id));

    setSelectedCities((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

    const lastSelectedCityId = Array.from(selectedCities).pop();
    if (lastSelectedCityId === id) {
      setPreviewCityId(lastSelectedCityId || null);
    }
  };

  const toggleCity = (id) => {
    //console.log("toggleCity id", id);
    setSelectedCities((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const toggleCities = (checked) => {
    if (checked) {
      const allCityIds = results.map((city) => city.id);
      setSelectedCities(new Set(allCityIds));
    } else {
      setSelectedCities(new Set());
    }
  };

  const searchLocations = async (location) => {
    return await getGeocodingData(location);
  };

  return {
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
  };
}

/* useEffect(() => {
    const fetchData = async () => {
      const weatherData = await getWeatherForecast(location);
      console.log("weatherData", weatherData);
      setSelectedCities((prevSelected) => {
        if (!prevSelected.has(weatherData.id)) {
          const newSelected = new Set(prevSelected);
          newSelected.add(weatherData.id);
          return newSelected;
        }
        return prevSelected;
      });
      setResults((prev) => {
        const index = prev.findIndex(
          (city) => city.location === weatherData.location,
        );
        if (index !== -1) {
          prev.splice(index, 1, weatherData);
          return [...prev];
          //return prev.map((city, i) => (i === index ? weatherData : city));
        }
        return [...prev, weatherData];
      });
    };
    if (location) {
      fetchData();
    }
  }, [location]); */
