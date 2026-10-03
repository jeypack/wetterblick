import { createContext } from "react";
import { useWeatherData } from "../hooks/useWeatherData";

const WeatherDataContext = createContext();
export { WeatherDataContext };

/**
 * WeatherDataProvider component that provides weather-related data and actions
 * such as city information, search results, and favorite locations to the rest of the application.
 *
 * @see useWeatherData Hook that provides the underlying weather data logic.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the weather data context.
 * @returns {JSX.Element} The context provider wrapping the child components.
 */
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
