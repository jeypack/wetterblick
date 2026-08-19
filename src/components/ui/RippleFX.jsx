import { useRipple } from "../../hooks/useRipple";
import { useRef } from "react";
import Ripple from "./Ripple";

export default function RippleFFx(props) {
  //console.log("RippleFFx props:", props);
  const { ffxMs, ffx = "ripple", onClick } = props;
  //console.log("RippleFFx ffx:", ffx);
  const className = "overflow-hidden relative block " + (props?.className ?? "w-auto");
  const rippleRef = useRef(null);

  const { isRippleActive, triggerRipple } = useRipple(rippleRef, ffxMs ?? 500);
  
  if (ffx === "none") {
    return <>{props.children}</>;
  }

  const handleClick = (event) => {
    if (ffx === "ripple") {
      const { nativeEvent } = event;
      const posX = nativeEvent.layerX - 2; // Adjust for the ripple's size (2px radius)
      const posY = nativeEvent.layerY - 2; // Adjust for the ripple's size (2px radius)
      const rect = nativeEvent.target.getBoundingClientRect();
      //console.log("RippleFFx handleClick rect:", rect);
      triggerRipple(posX, posY, Math.max(rect.width, rect.height)); // Set size to cover the entire element
    }
    if (onClick) {
      onClick(event);
    }
  };
  return (
    <div className={className} onClick={handleClick}>
      {props.children}
      <Ripple
        active={isRippleActive}
        rippleRef={rippleRef}
        color={props?.ffxClass ?? "bg-sky-500"}
      />
    </div>
  );
}
