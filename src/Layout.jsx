import Header from "./components/Header";

export default function Layout({ children }) {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 flex flex-col justify-start items-center gap-2 w-full min-h-screen text-neutral-100 dark:text-neutral-100">
      <Header />
      {children}
    </div>
  );
}
