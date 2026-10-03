import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import ThemeButton from "../ui/ThemeButton";

/**
 * RemoveCityDialog component for confirming the removal of a city.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The dialog content data.
 * @param {boolean} props.isOpen - Flag indicating if the dialog is open.
 * @param {Function} props.setIsOpen - Callback function to set the dialog open state.
 * @param {Function} props.onConfirm - Callback function when the removal is confirmed.
 * @see {@link https://headlessui.dev/react/dialog Dialog} for more information on the Dialog component.
 * @returns {JSX.Element} The rendered remove city dialog component.
 */
export default function RemoveCityDialog({ data, isOpen, setIsOpen, onConfirm }) {
  // const [isOpen, setIsOpen] = useState(false);
  const baseClassName =
    "w-30 text-nowrap rounded-2xl border cursor-pointer focus:ring-sky-500 focus:outline-none focus-visible:outline-none text-sm";
  const classNameBtn =
    "bg-neutral-600 text-neutral-100 border-2 border-neutral-700 hover:border-neutral-400 " +
    baseClassName;
  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-neutral-50 p-8 rounded-xl border-neutral-600 dark:bg-neutral-800 dark:border-neutral-600">
            <DialogTitle className="flex justify-start items-center text-2xl font-bold text-neutral-600 dark:text-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 23 23"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6 mr-2 text-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>

              {data.title}
            </DialogTitle>
            <Description className={"text-neutral-600 dark:text-neutral-400"}>
              {data.description}
            </Description>
            <p className="text-neutral-600 dark:text-neutral-400">{data.text}</p>
            <div className="flex gap-4">
              <ThemeButton onClick={onConfirm}>{data.confirmText}</ThemeButton>
              <ThemeButton onClick={() => setIsOpen(false)}>
                {data.cancelText}
              </ThemeButton>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
