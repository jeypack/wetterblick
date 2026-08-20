import Layout from "./Layout";
import Router from "./Router";
import LoginOverlay from "./components/LoginOverlay";
import { ModalProvider } from "./context/ModalContext";
import GlobalModal from "./modals/GlobalModal";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <ModalProvider>
          <Layout>
            <Router />
          </Layout>
          {/* <LoginOverlay /> */}
          <GlobalModal />
        </ModalProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
