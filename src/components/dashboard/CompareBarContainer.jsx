import React from "react";
import CompareBar from "./CompareBar";

/**
 * Ranges for different weather properties used to calculate the percentage width of comparison bars.
 */
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
 * CompareBarContainer component for displaying a list of comparison bars for selected cities.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.selectedCitiesData - The data for the selected cities.
 * @param {Object} props.selectedProp - The selected property to compare.
 * @param {Function} props.onClick - Callback function when a comparison bar is clicked.
 * @see {@link ./CompareBar CompareBar} for more information on the CompareBar component.
 * @param {string} props.previewCityId - The ID of the city currently being previewed.
 */
const CompareBarContainer = ({
  selectedCitiesData,
  selectedProp,
  onClick,
  previewCityId,
}) => {
  const range = ranges[selectedProp.filter];

  /* const values = useMemo(() => {
    return selectedCitiesData
      .map((city) => city.data[selectedProp.filter])
      .filter((value) => typeof value === "number");
  }, [selectedCitiesData, selectedProp.filter]); */
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
