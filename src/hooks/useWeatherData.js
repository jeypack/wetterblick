import { useState, useEffect } from "react";
import {
  getGeocodingData,
  getWeatherForecast,
  getWeather,
  getWeatherListCurrent,
} from "../data/api";
import { useUserData } from "../hooks/useUserData";

/**
 * Custom hook to manage weather data and user interactions.
 * Used in the WeatherDataContext to provide weather data and functions to components.
 * Do not use this hook directly in components; instead, use the WeatherDataContext useWeather hook.
 * @param {string} initialLocation - The initial location to fetch weather data for.
 * @returns {object} - An object containing weather data and functions to manage it.
 */
export function useWeatherData(initialLocation = "") {
  const [model, setModel] = useState("knmi_seamless");
  const [previewCityId, setPreviewCityId] = useState(null);
  const [results, setResults] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [recentList, setRecentList] = useState([]);
  const [selectedCities, setSelectedCities] = useState(new Set());
  const {
    updateRecentLocations,
    favorites,
    recentLocations,
    isLoading: isUserDataLoading,
  } = useUserData();

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

  const getWeatherList = async (locations) => {
    const geoCodings = locations.map((location) => ({
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.name,
      country: location.country,
      state: location.state || "",
      id: location.id,
    }));
    const weatherDataList = await getWeatherListCurrent(geoCodings, model);
    console.log("getWeatherList: weatherDataList", weatherDataList);
    return weatherDataList;
  };

  const getFavorites = async () => {
    if (favorites.length === 0) {
      setFavoriteList([]);
      return;
    }
    const weatherDataList = await getWeatherList(favorites);
    console.log("getFavorites: weatherDataList", weatherDataList);
    setFavoriteList(weatherDataList);
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

  useEffect(() => {
    if (isUserDataLoading || recentLocations.length === 0) {
      return;
    }
    const fetchData = async () => {
      if (recentLocations.length > 0) {
        const weatherDataList = await getWeatherList(recentLocations);
        console.log("useWeatherData: weatherDataList", weatherDataList);
        setRecentList(weatherDataList);
      }
    };
    fetchData();
  }, [isUserDataLoading, recentLocations]);

  useEffect(() => {
    if (isUserDataLoading || favorites.length === 0) {
      return;
    }
    const fetchData = async () => {
     const favoriteData = await getWeatherList(favorites);
      console.log("useWeatherData: fetchData: favorites", favorites);
      console.log("useWeatherData: fetchData: favoriteData", favoriteData);
      setFavoriteList(favoriteData);

    };
    fetchData();
  }, [isUserDataLoading, favorites]);

  return {
    getCity,
    getFavorites,
    model,
    results,
    removeCity,
    previewCityId,
    recentList,
    favoriteList,
    selectedCities,
    searchLocations,
    setPreviewCityId,
    toggleCity,
    toggleCities,
  };
}
