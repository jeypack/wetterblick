import React from "react";
import CityWeather from "./dashboard/CityWeather";

const WeatherPanel = ({ previewCityId, results, setPreviewCityId }) => {
  const currentWeather = results.at(-1);
  if (!currentWeather) {
    return null;
  }
  return (
    <section className="flex flex-col justify-center items-center gap-4 mx-auto p-4 container w-full">
      <p className="p-2 text-neutral-400">
        {currentWeather.location && `Letzte Suchergebnisse für: `}
        <span className="font-bold text-neutral-300">{currentWeather.location.name}</span>
      </p>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {results.map((result) => (
          <CityWeather
            key={result.id}
            previewCityId={previewCityId}
            setPreviewCityId={setPreviewCityId}
            weather={result}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(WeatherPanel);
