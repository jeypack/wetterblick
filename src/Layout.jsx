import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Layout({ children }) {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 flex flex-col justify-start items-start gap-2 w-full min-h-screen text-neutral-100 dark:text-neutral-100">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
