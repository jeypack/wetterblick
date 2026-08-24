import { Button } from "@headlessui/react";
import RippleFX from "../ui/RippleFX";


function CompareFilter({ options, selectedProp, setSelectedProp }) {
  const baseClassName =
    "w-auto text-nowrap rounded-2xl border cursor-pointer focus:ring-neutral-500 focus:outline-none focus-visible:outline-none text-sm overflow-hidden whitespace-nowrap";
  const className =
    "bg-neutral-50 text-neutral-400 border-neutral-400 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:border-neutral-500 dark:hover:text-neutral-400 hover:border-neutral-400 hover:text-neutral-500 " +
    baseClassName;
  const classNameSelected =
    "bg-neutral-100 text-neutral-600 border-neutral-500 dark:bg-neutral-900 dark:border-neutral-300 dark:text-neutral-200 " +
    baseClassName;
  const getClassName = (value) =>
    value.id === selectedProp.id ? classNameSelected : className;
  //console.log("CompareFilter: selectedProp", selectedProp);
  return (
    <div className="flex flex-col justify-start items-start gap-2 w-40">
      {options.map((value) => {
        return (
          <Button
            key={value.id}
            className={getClassName(value)}
            onClick={() => setSelectedProp(value)}
          >
            <RippleFX className="flex justify-between items-center w-full px-3 py-0.75">
              {value.name}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="relative inline-block size-6 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </RippleFX>
          </Button>
        );
      })}
    </div>
  );
}

export default CompareFilter;
