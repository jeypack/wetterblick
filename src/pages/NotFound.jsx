/**
 * NotFound page component.
 * Displays a 404 error message when the requested page does not exist.
 *
 * @returns {JSX.Element} The not found page component.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 mb-8">
      <h1 className="text-4xl text-red-700 font-bold mb-4">404 - Not Found</h1>
      <p className="text-red-200">The page you are looking for does not exist.</p>
    </div>
  );
}
