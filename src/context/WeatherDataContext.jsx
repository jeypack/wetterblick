import { createContext } from "react";
import { useWeatherData } from "../hooks/useWeatherData";

const WeatherDataContext = createContext();
export { WeatherDataContext };

const WeatherDataProvider = ({ children }) => {
  const {
    getCity,
    model,
    results,
    previewCityId,
    recentList,
    favoriteList,
    searchLocations,
    setPreviewCityId,
    refreshFavorites,
  } = useWeatherData();

  return (
    <WeatherDataContext.Provider
      value={{
        getCity,
        model,
        results,
        previewCityId,
        recentList,
        favoriteList,
        searchLocations,
        setPreviewCityId,
        refreshFavorites,
      }}
    >
      {children}
    </WeatherDataContext.Provider>
  );
};
export default WeatherDataProvider;
