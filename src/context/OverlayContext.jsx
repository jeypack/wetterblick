import {createContext, useState} from "react";

export const OverlayContext = createContext();

/* export const MODALS = {
    project: ProjectModal,
    image: ImageModal,
    confirm: ConfirmModal,
}; */

export const OverlayProvider = ({children}) => {
  const [modal, setModal] = useState({type: null, props: {}});
  const [toastMessage, setToastMessage] = useState(null);

  const openModal = (type, props = {}) => setModal({type, props});
  const closeModal = () => setModal({type: null, props: {}});

  return (
    <OverlayContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};
