import { createContext, useState } from "react";

/* export const MODALS = {
    project: ProjectModal,
    image: ImageModal,
    confirm: ConfirmModal,
}; */

export const OverlayContext = createContext();

/**
 * OverlayProvider component that provides modal and toast overlay functionality
 * to the rest of the application via the OverlayContext.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the overlay context.
 * @returns {JSX.Element} The context provider wrapping the child components.
 */
export const OverlayProvider = ({ children }) => {
  const [modal, setModal] = useState({ type: null, props: {} });
  const [toast, setToast] = useState({ id: 0, text: "" });

  const setToastMessage = (text) => {
    //console.log("OverlayContext: setToastMessage", text);
    setToast({ id: Date.now(), text });
  };

  const openModal = (type, props = {}) => setModal({ type, props });
  const closeModal = () => setModal({ type: null, props: {} });

  return (
    <OverlayContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
        toastMessage: toast,
        setToastMessage,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};
