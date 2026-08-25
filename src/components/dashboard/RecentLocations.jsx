import React from "react";
import CityCard from "./CityCard";

const RecentLocations = ({ previewCityId, recentList, setPreviewCityId }) => {
  //const currentWeather = results.at(-1);
  console.log("RecentLocations: recentList", recentList);
  if (recentList.length === 0) {
    return null;
  }

  const time = recentList.at(-1)?.time;

  return (
    <section className="flex flex-col justify-center items-end gap-3 mx-auto p-3 container w-full">
      {/* <p className="p-2 text-neutral-400">
        {currentWeather.location && `Letzte Suchergebnisse für: `}
        <span className="font-bold text-neutral-300">{currentWeather.location.name}</span>
      </p> */}
      <div className="block w-full text-neutral-400 text-xs">
        {"Stand: " +
          new Date(time).toLocaleString("de-DE", {
            dateStyle: "short",
            timeStyle: "short",
          })}
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        {recentList.map((result) => (
          <CityCard
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
export default RecentLocations;
//export default React.memo(RecentLocations);
