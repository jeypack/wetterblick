import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

/**
 * Custom hook to access the modal context.
 * @returns {{modal: boolean, openModal: () => void, closeModal: () => void}} The current modal state and functions to open and close it.
 * @example const { modal, openModal, closeModal } = useModal();
 */
export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used inside ModalProvider");
  }

  return context;
}