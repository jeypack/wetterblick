import {Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import CityDetail from "./pages/CityDetail";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/login" element={<Login />} />
      <Route path="/city/:id" element={<CityDetail />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
