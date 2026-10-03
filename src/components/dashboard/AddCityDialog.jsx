import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import { useState } from "react";
import { useOverlay } from "../../hooks/useOverlay";
import { useWeather } from "../../hooks/useWeather";
import { MapPinPen } from "lucide-react";
import FavoriteForm from "../FavoriteForm";
import CitySearch from "./CitySearch";

/**
 * Component for adding a new city to the user's favorites.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data for the dialog, including title, description, form title, and text.
 * @param {boolean} props.isOpen - Whether the dialog is open or not.
 * @param {Function} props.setIsOpen - Function to set the open state of the dialog.
 * @param {Function} props.onConfirm - Function to call when the user confirms adding a city.
 * @see {@link ../../hooks/useWeather useWeather} for more information on the custom hook used to manage weather data.
 * @see {@link ../../hooks/useOverlay useOverlay} for more information on the custom hook used to manage overlay and toast messages.
 */
export default function AddCityDialog({ data, isOpen, setIsOpen, onConfirm }) {
  const { model, searchLocations } = useWeather();
  const { setToastMessage } = useOverlay();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [cityError, setCityError] = useState("");

  const handleAddLocation = async (location, model) => {
    setCurrentLocation(location);
    setCityError("");
  };

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
            <div className="w-full">
              <CitySearch
                btnLabel={"Ort hinzufügen"}
                onSubmit={handleAddLocation}
                model={model}
                searchLocations={searchLocations}
              />
              {cityError && (
                <p
                  className="mt-2 text-xs text-red-500 dark:text-red-400"
                  aria-live="polite"
                >
                  {cityError}
                </p>
              )}
            </div>
            <FavoriteForm
              btnLabels={{ confirm: "Hinzufügen", cancel: "Abbrechen" }}
              onConfirm={({ title, note }) => {
                if (!currentLocation) {
                  setCityError("Der Ort muss noch hinzugefügt werden.");
                  return false;
                }

                setCityError("");
                const id = currentLocation.latitude + "-" + currentLocation.longitude;
                onConfirm({ id, title, note, location: currentLocation });
                setToastMessage("✓ Erfolgreich hinzugefügt");
                return true;
              }}
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
