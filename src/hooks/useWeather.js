import { useContext } from "react";
import { WeatherDataContext } from "../context/WeatherDataContext";

/**
 * Custom hook to access the weather data context.
 * @returns {{getCity, model, results, removeCity, previewCityId, selectedCities, searchLocations, setPreviewCityId, toggleCity, toggleCities}} The weather data context value.
 * @example const { getCity, results, ... } = useWeather();
 */
export function useWeather() {
  const context = useContext(WeatherDataContext);

  if (!context) {
    throw new Error("useWeather must be used inside WeatherDataProvider");
  }

  return context;
}
