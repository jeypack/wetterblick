import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import { MapPinPen } from "lucide-react";
import FavoriteForm from "../FavoriteForm";

export default function EditCityDialog({ favorite, data, isOpen, setIsOpen, onConfirm }) {
  console.log("EditCityDialog: favorite", favorite);
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
            <FavoriteForm
              btnLabels={{ confirm: "Speichern", cancel: "Abbrechen" }}
              onConfirm={({ title, note }) =>
                onConfirm({ id: favorite?.id, title, note, location: favorite?.location })
              }
              onCancel={() => setIsOpen(false)}
              formTitle={data.formtitle}
              formLocation={favorite?.location}
              defaultValues={{
                title: favorite?.title || "Mein Favorit",
                note: favorite?.note || "Meine Standardnotiz",
              }}
            />
            <p className="text-neutral-600 dark:text-neutral-400">{data.text}</p>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
