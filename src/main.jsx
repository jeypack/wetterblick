import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import WeatherDataProvider from "./context/WeatherDataContext";
import UserDataProvider from "./context/UserDataContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserDataProvider>
        <WeatherDataProvider>
          <BrowserRouter basename="demos/weather/">
            <App />
          </BrowserRouter>
        </WeatherDataProvider>
      </UserDataProvider>
    </AuthProvider>
  </StrictMode>,
);
