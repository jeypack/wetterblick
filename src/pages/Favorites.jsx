import { useWeather } from "../hooks/useWeather";
import CityCard from "../components/dashboard/CityCard";
import PageTitle from "../components/PageTitle";

const Favorites = () => {
  //const { favorites } = useUserData();
  const { favoriteList, previewCityId, setPreviewCityId } = useWeather();

  //console.log("Favorites.jsx: favoriteList", favoriteList);
  if (!favoriteList || favoriteList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-start py-2">
        <h1 className="text-3xl font-bold mb-4">Meine Orte verwalten</h1>
        <p>Sie haben noch keine Favoriten.</p>
      </div>
    );
  }
  return (
    <>
      <PageTitle title="Meine Orte" />
      <div className="flex flex-col items-center justify-start py-2">
        <h1 className="text-3xl font-bold mb-4">Verwalte deine persönlichen Wetterorte.</h1>
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
    </>
  );
};

export default Favorites;
