import {createContext, useState} from "react";

export const ModalContext = createContext();

/* export const MODALS = {
    project: ProjectModal,
    image: ImageModal,
    confirm: ConfirmModal,
}; */

export const ModalProvider = ({children}) => {
  const [modal, setModal] = useState({type: null, props: {}});
  const [message, setMessage] = useState(null);

  const openModal = (type, props = {}) => setModal({type, props});
  const closeModal = () => setModal({type: null, props: {}});

  return (
    <ModalContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
        message,
        setMessage,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
