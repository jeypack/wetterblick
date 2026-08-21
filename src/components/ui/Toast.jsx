import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

function Toast({ message }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!message) return;
    setIsOpen(true);
    const timer = setTimeout(() => {
      setIsOpen(false);
      //if (onClose) onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [message]);
console.log("Toast: message", message, "isOpen", isOpen);
  if (!isOpen) return null;

  return (
    <Transition show={isOpen} appear={true}>
      <div className="fixed top-17 right-0 transition duration-300 delay-150 ease-in-out data-closed:translate-x-full data-closed:opacity-0 max-w-xs p-2 border-l border-t border-b border-neutral-700 bg-neutral-200 font-bold text-neutral-700 dark:bg-neutral-800 dark:border-neutral-500 dark:text-neutral-400 rounded-l-md w-fit">
        {message}
      </div>
    </Transition>
  );
}

export default Toast;
