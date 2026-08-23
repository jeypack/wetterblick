import {useOverlay} from "../hooks/useOverlay";
import ImageModal from "./ImageModal";
import ProjectModal from "./ProjectModal";

/**
 * Global modal component that renders the appropriate modal based on the current modal state.
 * @returns {JSX.Element|null} The modal component or null if no modal is open.
 */
export default function GlobalModal() {
  const {modal, closeModal} = useOverlay();

  if (!modal || !modal.type) return null;

  if (modal.type === "project") {
    return <ProjectModal {...modal.props} />;
  }

  if (modal.type === "image") {
    return <ImageModal {...modal.props} />;
  }

  /* if (modal.type === "confirm") {
    return <ConfirmModal {...modal.props} />;
  } */

  return null;
}
