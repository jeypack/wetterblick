import {useState} from "react";
import {
  Checkbox,
  Field,
  Label,
  Button,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import RippleFX from "../ui/RippleFX";
import ThemeButton from "../ui/ThemeButton";
import RemoveCityDialog from "./RemoveCityDialog";
import CityCheckbox from "./CityCheckbox";

const dialogData = {
  title: "Stadt entfernen",
  description:
    "Dies wird diese Stadt dauerhaft aus Ihrer Liste löschen. Diese Aktion kann nicht rückgängig gemacht werden.",
  text: "Sind Sie sicher, dass Sie diese Stadt aus Ihrer Liste löschen möchten? Alle Ihre Daten werden dauerhaft entfernt.",
  confirmText: "Löschen",
  cancelText: "Abbrechen",
};

export default function CityList({cities, selectedCities, onChange}) {
  const [isOpen, setIsOpen] = useState(false);
  const [idToRemove, setIdToRemove] = useState(null);
  //console.log("cityList: cities", cities);
  const handleChange = (id, type) => {
    //console.log("id", id, "type", type);
    if (type === "toggle" && typeof onChange === "function") {
      onChange({id, type});
    }
    if (type === "remove") {
      //onChange({id, type});
      setIdToRemove(id);
      setIsOpen(true);
    }
  };

  return (
    <div className="flex flex-row gap-4 px-2 w-full md:flex-col md:justify-start md:items-start md:gap-2">
      <ThemeButton
        onClick={(checked) => {
          //console.log("SelectAllButton: checked", checked);
          if (typeof onChange === "function") {
            onChange({
              type: "all",
              checked: selectedCities.size !== cities.length,
            });
          }
        }}
        active={selectedCities.size === cities.length}
        size="xs"
      >
        Toggle All
      </ThemeButton>
      <div className="mt-4 flex flex-row flex-wrap justify-start items-start gap-1 w-full md:flex-col md:justify-start md:items-start">
        {cities.map((item) => (
          <CityCheckbox
            key={item.id}
            id={item.id}
            location={item.location}
            selectedCities={selectedCities}
            onChange={handleChange}
          />
        ))}
      </div>
      <RemoveCityDialog
        data={dialogData}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={() => {
          //console.log("RemoveCityDialog: onConfirm");
          onChange({id: idToRemove, type: "remove"});
          setIsOpen(false);
        }}
      />
    </div>
  );
}
