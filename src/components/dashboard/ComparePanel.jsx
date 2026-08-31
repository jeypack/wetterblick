import { useState, memo } from "react";
import CompareBarContainer from "./CompareBarContainer";
import CompareFilter from "./CompareFilter";
import styles from "../../Styles";

const metrics = [
  { id: 1, name: "Temperatur", filter: "temperature" },
  { id: 2, name: "Luftfeuchtigkeit", filter: "relativeHumidity" },
  { id: 3, name: "Windgeschwindigkeit", filter: "windSpeed" },
  { id: 4, name: "Luftdruck", filter: "pressure" },
  //{id: 5, name: "Wetter", filter: "weatherCode"},
];

const ComparePanel = ({
  selectedCitiesData,
  dailyData,
  previewCityId,
  setPreviewCityId,
}) => {
  const [selectedProp, setSelectedProp] = useState(metrics[0]);

  return (
    <div className={styles.comparePanel + " min-h-60 w-fit"}>
      <div className="flex flex-row justify-start items-start gap-2 w-fit">
        <CompareFilter
          options={metrics}
          selectedProp={selectedProp}
          setSelectedProp={setSelectedProp}
        />
        <CompareBarContainer
          onClick={(id) => setPreviewCityId(id)}
          selectedCitiesData={selectedCitiesData}
          previewCityId={previewCityId}
          selectedProp={selectedProp}
        />
      </div>
    </div>
  );
};
export default memo(ComparePanel);
