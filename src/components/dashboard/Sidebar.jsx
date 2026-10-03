/**
 * Sidebar component for displaying a sidebar with a list of children elements.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child elements to be displayed in the sidebar.
 * @returns {JSX.Element} The rendered sidebar component.
 */
export default function Sidebar({ children }) {
  return (
    <aside className="flex flex-col justify-start items-start gap-2 p-2 rounded-br-2xl w-full min-h-auto md:w-sm md:min-h-fit">
      <p className="text-neutral-500 dark:text-olive-400 pl-1">Finde deine Orte...</p>
      {children}
    </aside>
  );
}
