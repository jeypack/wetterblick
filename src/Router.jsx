import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";

const CityDetail = lazy(() => import("./pages/CityDetail"));
const Login = lazy(() => import("./pages/Login"));

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route
        path="/login/:type"
        element={
          <Suspense fallback={<div>Anmeldung wird geladen...</div>}>
            <Login />
          </Suspense>
        }
      />
      <Route path="/city" element={<Dashboard />} />
      <Route
        path="/city/:id"
        element={
          <Suspense fallback={<div>Wetterdetails werden geladen...</div>}>
            <CityDetail />
          </Suspense>
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
