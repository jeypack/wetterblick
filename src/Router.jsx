import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/projects" element={<Projects />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/contact" element={<Contact />} /> */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
