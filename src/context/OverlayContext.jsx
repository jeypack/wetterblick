import { createContext, useState } from "react";

export const OverlayContext = createContext();

/* export const MODALS = {
    project: ProjectModal,
    image: ImageModal,
    confirm: ConfirmModal,
}; */

export const OverlayProvider = ({ children }) => {
  const [modal, setModal] = useState({ type: null, props: {} });
  const [toast, setToast] = useState({ id: 0, text: "" });

  const setToastMessage = (text) => {
    console.log("OverlayContext: setToastMessage", text);
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
