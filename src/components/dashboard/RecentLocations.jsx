import React, { useEffect, useState } from "react";
import CityCard from "./CityCard";
import { RefreshCw } from "lucide-react";
import Tooltip from "../ui/Tooltip";

const DEFAULT_PAGE_SIZE = 8;

/**
 * RecentLocations component for displaying a list of recently viewed locations.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.recentList - The list of recent locations.
 * @param {Function} props.onUpdate - Callback function to update a location.
 * @param {number} [props.pageSize=DEFAULT_PAGE_SIZE] - The number of items to display per page.
 * @see {@link https://reactjs.org/docs/hooks-effect.html useEffect} for more information on the useEffect hook.
 * @returns {JSX.Element} The rendered recent locations component.
 */
const RecentLocations = ({ recentList, onUpdate, pageSize = DEFAULT_PAGE_SIZE }) => {
  const [startIndex, setStartIndex] = useState(0);
  const safePageSize = Math.max(1, Number(pageSize) || DEFAULT_PAGE_SIZE);
  const maxStartIndex = Math.max(0, recentList.length - safePageSize);

  useEffect(() => {
    setStartIndex((current) => Math.min(current, maxStartIndex));
  }, [maxStartIndex]);

  if (recentList.length === 0) {
    return null;
  }

  const visibleList = recentList.slice(startIndex, startIndex + safePageSize);
  const time = recentList[0].time;
  const hasPrevious = startIndex > 0;
  const hasNext = startIndex < maxStartIndex;

  return (
    <section className="flex flex-col justify-center items-end gap-3 mx-auto p-3 container w-full">
      <div className="flex justify-center items-center w-full text-neutral-400 text-xs gap-0">
        {new Date(time).toLocaleString("de-DE", {
          dateStyle: "short",
          timeStyle: "short",
        })}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={() => setStartIndex(0)}
            disabled={!hasPrevious}
            className="cursor-pointer font-bold hover:underline px-1 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setStartIndex((current) => Math.max(0, current - 1))}
            disabled={!hasPrevious}
            className="cursor-pointer font-bold hover:underline px-1 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Zurück
          </button>
          <button
            type="button"
            onClick={() =>
              setStartIndex((current) => Math.min(maxStartIndex, current + 1))
            }
            disabled={!hasNext}
            className="cursor-pointer font-bold hover:underline px-1 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Weiter
          </button>
          <button
            type="button"
            onClick={() =>
              onUpdate(recentList[startIndex]?.location || recentList[0].location)
            }
            className="cursor-pointer hover:underline flex justify-center items-center"
          >
            <RefreshCw size={16} />
            <span className="font-bold p-1">Update</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-3 w-full ">
        {visibleList.map((result, index) => {
          return (
            <Tooltip key={result.id} desc={<RefreshCw size={12} />}>
              <CityCard
                active={index === 0}
                weather={result}
                onSelect={() => {
                  setStartIndex(0);
                  onUpdate(result.location);
                }}
              />
            </Tooltip>
          );
        })}
      </div>
      <div className="flex justify-between items-center w-full text-neutral-400 text-xs px-2">
        <span>
          {startIndex + 1} - {Math.min(startIndex + safePageSize, recentList.length)} von{" "}
          {recentList.length}
        </span>
        <div className="flex items-center gap-2 ml-auto ">
          <button
            type="button"
            onClick={() => setStartIndex(0)}
            disabled={!hasPrevious}
            className="cursor-pointer font-bold hover:underline px-1 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setStartIndex((current) => Math.max(0, current - 1))}
            disabled={!hasPrevious}
            className="cursor-pointer font-bold hover:underline px-1 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Zurück
          </button>
          <button
            type="button"
            onClick={() =>
              setStartIndex((current) => Math.min(maxStartIndex, current + 1))
            }
            disabled={!hasNext}
            className="cursor-pointer font-bold hover:underline px-1 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Weiter
          </button>
          <button
            type="button"
            onClick={() =>
              onUpdate(recentList[startIndex]?.location || recentList[0].location)
            }
            className="cursor-pointer hover:underline flex justify-center items-center"
          >
            <RefreshCw size={16} />
            <span className="font-bold p-1">Update</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(RecentLocations);
