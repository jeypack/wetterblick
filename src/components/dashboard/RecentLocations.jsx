import React from "react";
import CityCard from "./CityCard";
import { Button } from "@headlessui/react";
import { RefreshCw } from "lucide-react";

const RecentLocations = ({ recentList, onUpdate }) => {
  console.log("RecentLocations: recentList", recentList);
  if (recentList.length === 0) {
    return null;
  }

  const time = recentList[0].time;

  return (
    <section className="flex flex-col justify-center items-end gap-3 mx-auto p-3 container w-full">
      <div className="flex justify-center items-center w-full text-neutral-400 text-xs">
        {"Stand: " +
          new Date(time).toLocaleString("de-DE", {
            dateStyle: "short",
            timeStyle: "short",
          })}
        <div
          onClick={() => onUpdate(recentList[0].location)}
          className="cursor-pointer hover:underline flex justify-center items-center ml-auto"
        >
          <RefreshCw size={16} />
          <Button className="cursor-pointer font-bold p-1">Update</Button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        {recentList.map((result, index) => {
          return <CityCard key={result.id} active={index === 0} weather={result} />;
        })}
      </div>
    </section>
  );
};

export default React.memo(RecentLocations);
