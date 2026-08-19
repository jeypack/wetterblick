export default function ScrollTop() {
  return (
    <div
      className="flex cursor-pointer items-center justify-center rounded-full bg-secondary-850 p-2 text-secondary-400 transition-colors duration-200 hover:bg-secondary-800 hover:text-secondary-300"
      onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
        />
      </svg>
    </div>
  );
}
