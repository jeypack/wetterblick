import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";

const CityDetail = lazy(() => import("./pages/CityDetail"));
const Login = lazy(() => import("./pages/Login"));

/**
 * Router component that defines the application's routes.
 * Uses React Router for navigation and lazy loading for certain pages.
 * Defines routes for the main dashboard, settings, favorites, city details, and login pages.
 * Handles lazy loading for the CityDetail and Login pages.
 * Handles the fallback UI while the lazy-loaded components are being fetched.
 *
 * @returns {JSX.Element} The router component with all defined routes.
 */
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route
        path="/login/:type"
        element={
          <Suspense
            fallback={
              <main className="container flex-1 flex flex-row justify-start items-start mx-auto py-2">
                <span>Anmeldung wird geladen...</span>
                <span id="search-spinner" className="ml-2" />
              </main>
            }
          >
            <Login />
          </Suspense>
        }
      />
      <Route path="/city" element={<Dashboard />} />
      <Route
        path="/city/:id"
        element={
          <Suspense
            fallback={
              <main className="container flex-1 flex flex-row justify-start items-start mx-auto py-2">
                <span>Wetterdetails werden geladen...</span>
                <span id="search-spinner" className="ml-2" />
              </main>
            }
          >
            <CityDetail />
          </Suspense>
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
