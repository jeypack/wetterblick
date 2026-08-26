export default function Tooltip({ desc, children }) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-2 px-2 py-1 bg-neutral-500 dark:bg-neutral-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none z-10">
        {desc}
      </div>
    </div>
  );
}
