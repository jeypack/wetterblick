import React from "react";
import CityCard from "./CityCard";
import Tooltip from "../ui/Tooltip";

const RecentLocations = ({ previewCityId, recentList, setPreviewCityId }) => {
  //const currentWeather = results.at(-1);
  console.log("RecentLocations: recentList", recentList);
  if (recentList.length === 0) {
    return null;
  }

  const time = recentList[0].time;

  return (
    <section className="flex flex-col justify-center items-end gap-3 mx-auto p-3 container w-full">
      <div className="block w-full text-neutral-400 text-xs">
        {"Stand: " +
          new Date(time).toLocaleString("de-DE", {
            dateStyle: "short",
            timeStyle: "short",
          })}
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        {recentList.map((result, index) => {
          return (
            <Tooltip
              key={result.id}
              desc={"Für ein update klicken"}
            >
              <CityCard key={result.id} active={index === 0} weather={result} />
            </Tooltip>
          );
        })}
      </div>
    </section>
  );
};
//export default RecentLocations;
export default React.memo(RecentLocations);
