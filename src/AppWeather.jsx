import {ModalProvider} from "./context/ModalContext";
import GlobalModal from "./modals/GlobalModal";
import Dashboard from "./components/dashboard/Dashboard";
import {ThemeProvider} from "./context/ThemeContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AuthProvider from "./context/AuthContext";

function AppWeather() {
  return (
    <div className="flex flex-col min-h-screen">
      <ThemeProvider>
        <AuthProvider>
          <ModalProvider>
            <Dashboard />
            <Footer />
            <GlobalModal />
          </ModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default AppWeather;
