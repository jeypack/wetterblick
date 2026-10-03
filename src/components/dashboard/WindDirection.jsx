import React, { useEffect } from "react";

/**
 * WindDirection component for displaying wind direction with an arrow and compass.
 * 
 * @param {Object} props - The component props.
 * @param {number} props.angle - The wind direction angle in degrees.
 * @param {number} [props.size=60] - The size of the compass SVG.
 * @param {string} [props.className="w-auto"] - The CSS class for the container.
 * @returns {JSX.Element} The rendered wind direction component.
 */
export default function WindDirection({ angle, size = 60, className = "w-auto" }) {
  //console.log("WindDirection: angle", angle);
  const arrowRef = React.useRef(null);
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const roundedAngle = Math.round(angle / 45) % 8;
  const direction = directions[roundedAngle];
  const startPos = { x: 35, y: 35, dif: 12 };
  //console.log("WindDirection: angle", angle, "roundedAngle", roundedAngle, "direction", direction);
  /*
          N
     NW       NE

  W                E

     SW       SE
          S
  */
  useEffect(() => {
    //console.log("WindDirection: angle", angle);
    if (arrowRef.current) {
      arrowRef.current.style.transform = `rotate(${angle}deg)`;
    }
  }, [angle]);

  return (
    <div className={`flex justify-center items-center rounded-md ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={"0 0 70 70"}
        style={{ textRendering: "geometricPrecision" }}
      >
        {directions.map((dir, i) => {
          const angle = i * 45 - 90; // Adjusting angle to start from North (-90)
          const isHighlighted = i === roundedAngle;
          //console.log("angle", angle, "isHighlighted", isHighlighted, "roundedAngle", roundedAngle);
          return (
            <React.Fragment key={i}>
              <line
                stroke="rgb(168, 173, 186)"
                strokeWidth="1"
                x1={startPos.x + startPos.dif * Math.cos((angle * Math.PI) / 180)}
                x2={startPos.x + 1.5 * startPos.dif * Math.cos((angle * Math.PI) / 180)}
                y1={startPos.y + startPos.dif * Math.sin((angle * Math.PI) / 180)}
                y2={startPos.y + 1.5 * startPos.dif * Math.sin((angle * Math.PI) / 180)}
                /* transform={`rotate(${angle} 30 30)`} */
              />
              {i % 2 === 0 && (
                <text
                  fill={isHighlighted ? "rgb(65, 67, 73)" : "rgb(101, 107, 122)"}
                  fontSize="10"
                  textAnchor="middle"
                  textLength="2"
                  alignmentBaseline="middle"
                  x={startPos.x + 2.2 * startPos.dif * Math.cos((angle * Math.PI) / 180)}
                  y={startPos.y + 2.2 * startPos.dif * Math.sin((angle * Math.PI) / 180)}
                >
                  {directions[i]}
                </text>
              )}
            </React.Fragment>
          );
        })}
      </svg>
      <div
        ref={arrowRef}
        data-testid="wind-direction-svg"
        className="absolute box transform rotate-0 transition duration-600 delay-150 ease-in-out"
      >
        <svg width="30" height="40" viewBox="0 0 30 40">
          <polygon points="14,6 8,28 14,22 20,28" fill="rgb(114, 115, 118)" />
        </svg>
      </div>
    </div>
  );
}
