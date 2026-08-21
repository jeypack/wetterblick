import Layout from "./Layout";
import Router from "./Router";
import { ModalProvider } from "./context/ModalContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <ModalProvider>
          <Layout>
            <Router />
          </Layout>
        </ModalProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
