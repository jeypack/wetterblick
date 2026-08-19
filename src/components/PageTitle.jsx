import {useEffect} from "react";

/**
 * PageTitle component sets the document title for the current page.
 *
 * @param {Object} props - The props for the PageTitle component.
 * @param {string} props.title - The title to set for the document.
 * @returns {null} This component does not render any visible elements.
 */
export default function PageTitle({title}) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}
