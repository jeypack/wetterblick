import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import { useState } from "react";
import { useWeather } from "../../hooks/useWeather";
import { MapPinPen } from "lucide-react";
import FavoriteForm from "../FavoriteForm";
import CitySearch from "./CitySearch";

export default function AddCityDialog({ data, isOpen, setIsOpen, onConfirm }) {
  const { model, searchLocations } = useWeather();
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleAddLocation = async (location, model) => {
    setCurrentLocation(location);
  };
  // const [isOpen, setIsOpen] = useState(false);
  /* const baseClassName =
    "w-30 text-nowrap rounded-2xl border cursor-pointer focus:ring-sky-500 focus:outline-none focus-visible:outline-none text-sm";
  const classNameBtn =
    "bg-neutral-600 text-neutral-100 border-2 border-neutral-700 hover:border-neutral-400 " +
    baseClassName; */
  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-neutral-900/50 dark:bg-neutral-900/80">
          <DialogPanel className="max-w-xl space-y-4 border bg-neutral-50 p-8 rounded-xl border-neutral-600 dark:bg-neutral-800 dark:border-neutral-600">
            <DialogTitle className="flex justify-between items-center text-2xl font-bold text-neutral-600 dark:text-neutral-200 w-full">
              {data.title}
              <MapPinPen />
            </DialogTitle>
            <Description className={"text-neutral-600 dark:text-neutral-400"}>
              {data.description}
            </Description>
            <CitySearch
              btnLabel={"Ort hinzufügen"}
              onSubmit={handleAddLocation}
              model={model}
              searchLocations={searchLocations}
            />
            <FavoriteForm
              btnLabels={{ confirm: "Hinzufügen", cancel: "Abbrechen" }}
              onConfirm={({ title, note }) =>
                onConfirm({ title, note, location: currentLocation })
              }
              onCancel={() => setIsOpen(false)}
              formTitle={data.formtitle}
              formLocation={currentLocation}
            />
            <p className="text-neutral-600 dark:text-neutral-400">{data.text}</p>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
