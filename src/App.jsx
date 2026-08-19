import Layout from "./Layout";
import Router from "./Router";
import LoginOverlay from "./components/LoginOverlay";
import AuthProvider from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import GlobalModal from "./modals/GlobalModal";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <ModalProvider>
            <Layout>
              <Router />
            </Layout>
            {/* <LoginOverlay /> */}
            <GlobalModal />
          </ModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
