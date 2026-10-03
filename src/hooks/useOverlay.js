import { useContext } from "react";
import { OverlayContext } from "../context/OverlayContext";

/**
 * Custom hook to access the modal context.
 * @returns {{
 *   modal: boolean,
 *   openModal: function(): void,
 *   closeModal: function(): void
 * }} The current modal state and functions to open and close it.
 * @example
 * const { modal, openModal, closeModal } = useOverlay();
 */
export function useOverlay() {
  const context = useContext(OverlayContext);

  if (!context) {
    throw new Error("useOverlay must be used inside OverlayProvider");
  }

  return context;
}
