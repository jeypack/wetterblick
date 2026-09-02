import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Layout({ children }) {
  return (
    <div className="relative bg-neutral-50 dark:bg-neutral-900 flex flex-col justify-start items-start gap-0 w-full min-h-screen text-neutral-100 dark:text-neutral-100">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-neutral-300/40 blur-3xl dark:bg-olive-400/20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(160, 184, 148, 0.12),transparent_28%)] dark:bg-[radial-gradient(circle_at_12%_10%,rgba(168, 211, 52, 0.18),transparent_28%)]" />
      <div className="pointer-events-none absolute bottom-0 right-20 h-64 w-96 rounded-full bg-olive-400/15 blur-3xl dark:bg-olive-400/25" />

      <div className="flex flex-col justify-start items-start relative min-h-screen z-10 w-full">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
