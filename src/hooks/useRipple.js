import { useState, useEffect } from "react";

export function useRipple(
  rippleRef,
  ms = 400,
) {
  const [isRippleActive, setIsRippleActive] = useState(false);
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0, size: 0 });

  useEffect(() => {
    if (!isRippleActive) return;

    const ripple = rippleRef.current;
    if (!ripple) return;

    ripple.style.left = `${ripplePos.x}px`;
    ripple.style.top = `${ripplePos.y}px`;
    // 2 ^ 1% | 128 ^ x% => 128px / 2 * 1 = 64%
    const scaleFactor = ripplePos.size / 2 + 2;
    //ripple.style.transition = `transform ${ms}ms ease-out, opacity ${ms}ms ease-out`;
    //console.log("Ripple ripplePos:", ripplePos, "scaleFactor:", scaleFactor);
    ripple.style.transform = `scale(${scaleFactor})`;
    ripple.style.opacity = "0";

    ripple.style.transitionProperty = "transform, opacity";
    ripple.style.transitionTimingFunction = "ease-out";
    ripple.style.transitionDuration = `${ms}ms`;

    // Reflow erzwingen
    //void ripple.offsetWidth;

    /* requestAnimationFrame(() => {
    ripple.style.transform = "scale(50)";
    ripple.style.opacity = "0";
    }); */

    const timer = setTimeout(() => {
      setIsRippleActive(false);
    }, ms);

    return () => clearTimeout(timer);
  }, [isRippleActive, ripplePos, ms]);

  const triggerRipple = (x, y, size) => {
    //console.log("Triggering ripple at:", x, y, "size:", size);
    setRipplePos({ x, y, size });
    setIsRippleActive(true);
  };

  return { isRippleActive, triggerRipple };
}
