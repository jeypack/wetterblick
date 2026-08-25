import { useWeather } from "../hooks/useWeather";
import CityCard from "../components/dashboard/CityCard";

const Favorites = () => {
  //const { favorites } = useUserData();
  const { favoriteList, previewCityId, setPreviewCityId } = useWeather();

  //console.log("Favorites.jsx: favoriteList", favoriteList);
  if (!favoriteList || favoriteList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen py-2">
        <h1 className="text-3xl font-bold mb-4">Favorites</h1>
        <p>No favorites yet.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favoriteList.map((result) => (
          <CityCard
            key={result.id}
            previewCityId={previewCityId}
            setPreviewCityId={setPreviewCityId}
            weather={result}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
