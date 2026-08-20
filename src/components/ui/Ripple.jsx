
export default function Ripple({ active, rippleRef, color }) {
  if (!active) return null;
  //console.log("Ripple active:", active, "Color:", color);
  const rippleClasses =
    color +
    " absolute top-0 left-0 w-1 h-1 rounded-full overflow-hidden opacity-35 user-select-none pointer-events-none z-20";

  return <span ref={rippleRef} className={rippleClasses} />;
}
