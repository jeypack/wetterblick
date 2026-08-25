import {
  WiDaySunny,
  WiDayCloudy,
  WiDayRainMix,
  WiDayRain,
  WiDaySprinkle,
  WiDayRainWind,
  WiDaySnow,
  WiDaySnowWind,
  WiDayThunderstorm,
  WiDayFog,
  WiCloudyWindy,
  WiCloudyGusts,
  WiFog,
} from "react-icons/wi";

const WeatherIcon = ({ code, className, size }) => {
  switch (code) {
    case 0:
      return <WiDaySunny className={className} size={size} />;
    case 1:
    case 2:
    case 3:
      return <WiDayCloudy className={className} size={size} />;
    case 45:
    case 48:
      return <WiDayFog className={className} size={size} />;
    case 51:
    case 53:
      return <WiDaySprinkle className={className} size={size} />;
    case 55:
      return <WiDaySprinkle className={className} size={size} />;
    case 56:
    case 57:
      return <WiDayRainMix className={className} size={size} />;
    case 61:
      return <WiDayRainMix className={className} size={size} />;
    case 63:
      return <WiDayRain className={className} size={size} />;
    case 65:
      return <WiDayRain className={className} size={size} />;
    case 66:
    case 67:
      return <WiDayRain className={className} size={size} />;
    case 71:
      return <WiDaySnow className={className} size={size} />;
    case 73:
      return <WiDaySnow className={className} size={size} />;
    case 75:
      return <WiDaySnowWind className={className} size={size} />;
    case 77:
      return <WiDaySnow className={className} size={size} />;
    case 80:
    case 81:
    case 82:
      return <WiDayRain className={className} size={size} />;
    case 85:
    case 86:
      return <WiDaySnow className={className} size={size} />;
    case 95:
    case 96:
    case 99:
      return <WiDayThunderstorm className={className} size={size} />;
    default:
      return <WiDaySunny className={className} size={size} />;
  }
};

export default WeatherIcon;
