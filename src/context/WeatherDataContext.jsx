import { createContext } from "react";
import { useWeatherData } from "../hooks/useWeatherData";

const WeatherDataContext = createContext();
export { WeatherDataContext };

const WeatherDataProvider = ({ children }) => {
  const {
    getCity,
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
  } = useWeatherData();

  return (
    <WeatherDataContext.Provider
      value={{
        getCity,
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
      }}
    >
      {children}
    </WeatherDataContext.Provider>
  );
};
export default WeatherDataProvider;
