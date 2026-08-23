import Layout from "./Layout";
import Router from "./Router";
import { OverlayProvider } from "./context/OverlayContext";
import { ThemeProvider } from "./context/ThemeContext";
import Toast from "./components/ui/Toast";

function App() {
  return (
    <>
      <ThemeProvider>
        <OverlayProvider>
          <Layout>
            <Router />
          </Layout>
          <Toast />
        </OverlayProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
