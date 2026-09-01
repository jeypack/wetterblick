export default function Tooltip({ desc, children, position = "bottom-right" }) {
  return (
    <div className="relative group">
      {children}
      <div
        className={`absolute mb-2 px-2 py-1 bg-neutral-500 dark:bg-neutral-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all duration-200 select-none z-10 ${
          position === "center"
            ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            : position === "top"
              ? "top-0 left-1/2 transform -translate-x-1/2 -translate-y-full"
              : position === "bottom"
                ? "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
                :  position === "top-right"
                  ? "top-0 right-0 transform translate-x-1/2 -translate-y-full"
                  :  position === "top-left"
                    ? "top-0 left-0 transform -translate-x-1/2 -translate-y-full"
                    :  position === "bottom-right"
                      ? "bottom-0 right-0 transform translate-x-1/2 translate-y-full"
                      :  position === "bottom-left"
                        ? "bottom-0 left-0 transform -translate-x-1/2 translate-y-full"
                        : ""
        }`}
      >
        {desc}
      </div>
    </div>
  );
}
