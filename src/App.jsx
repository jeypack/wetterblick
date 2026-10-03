import Layout from "./Layout";
import Router from "./Router";
import { OverlayProvider } from "./context/OverlayContext";
import { ThemeProvider } from "./context/ThemeContext";
import Toast from "./components/ui/Toast";


/**
 * The main application component that wraps the entire app with necessary context providers and layout.
 *
 * @returns {JSX.Element} The main application component wrapped with context providers and layout.
 */
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
