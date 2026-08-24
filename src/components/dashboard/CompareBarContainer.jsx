import React, { useMemo } from "react";
import CompareBar from "./CompareBar";

const ranges = {
  temperature: {
    min: -20,
    max: 50,
  },

  relativeHumidity: {
    min: 0,
    max: 100,
  },

  windSpeed: {
    min: 0,
    max: 120,
  },

  pressure: {
    min: 960,
    max: 1060,
  },
};

/**
 *
 * @param {{selectedCitiesData: Array, selectedProp: Object}} param0
 * @returns {JSX.Element}
 */
const CompareBarContainer = ({
  selectedCitiesData,
  selectedProp,
  onClick,
  previewCityId,
}) => {
  const range = ranges[selectedProp.filter];

  const values = useMemo(() => {
    return selectedCitiesData
      .map((city) => city.data[selectedProp.filter])
      .filter((value) => typeof value === "number");
  }, [selectedCitiesData, selectedProp.filter]);
  //const maxValue = Math.max(...values);
  return (
    <div className="flex flex-col justify-start items-start gap-2 mt-2 w-auto">
      {selectedCitiesData.map((city) => {
        const value = city.data[selectedProp.filter];
        const unit = city.units[selectedProp.filter];
        //const percent = maxValue === 0 ? 0 : (value / maxValue) * 100;
        const percent = ((value - range.min) / (range.max - range.min)) * 100;
        return (
          <CompareBar
            key={city.id}
            id={city.id}
            location={city.location}
            value={value}
            onClick={onClick}
            percent={percent}
            selected={city.id === previewCityId}
            unit={unit}
          />
        );
      })}
    </div>
  );
};

export default React.memo(CompareBarContainer);