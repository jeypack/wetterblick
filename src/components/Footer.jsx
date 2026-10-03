/**
 * Footer component for displaying the footer information.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center p-6 text-olive-400 w-full border-t-2 border-neutral-300 dark:border-olive-600">
      <div className="text-sm">Jörg Pfeifer - 08/2026</div>
      <div className="text-sm">Made with Vite, React, TailwindCSS and the Meteo-Api</div>
    </footer>
  );
};

export default Footer;
