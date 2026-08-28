// meteor call: https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=temperature_2m,relative_humidity_2m,precipitation,rain,snowfall,cloudcover,windspeed_10m,winddirection_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,snowfall_sum,cloudcover_max,windspeed_10m_max&current_weather=true&timezone=auto

import { resolveLocalImage } from "../utils/assets";

//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,apparent_temperature,weather_code&timezone=auto
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast";

export const weatherModels = [
  { name: "ECMWF IFS", model: "ecmwf_ifs" },
  { name: "UKMO Seamless", model: "ukmo_seamless" },
  { name: "DWD ICON", model: "dwd_icon_seamless" },
  { name: "CMC Gem", model: "cmc_gem_seamless" },
  { name: "MeteoSwiss ICON", model: "meteoswiss_icon_seamless" },
  { name: "Météo-France", model: "meteofrance_seamless" },
  { name: "KNMI Forecast", model: "knmi_seamless" },
];

export const getWeatherModel = (modelName) => {
  const model = weatherModels.find((item) => item.model === modelName);
  return model ? model : null;
};

async function getGeocoding(location) {
  const url = new URL(GEOCODING_URL);
  url.searchParams.append("name", location);
  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    return [];
  }
}

function getMappedWeatherDataForecast(location, weatherData, model) {
  if (!weatherData) {
    return null;
  }
  const mappedWeatherData = {
    id: `${location.latitude}-${location.longitude}`,
    location: location,
    model: model,
    current: {
      temperature: weatherData.current.temperature_2m,
      apparentTemperature: weatherData.current.apparent_temperature,
      relativeHumidity: weatherData.current.relative_humidity_2m,
      windSpeed: weatherData.current.windspeed_10m,
      windDirection: weatherData.current.winddirection_10m,
      time: weatherData.current.time,
      pressure: weatherData.current.surface_pressure,
      weatherCode: weatherData.current.weather_code,
    },
    currentUnits: {
      temperature: weatherData.current_units.temperature_2m,
      apparentTemperature: weatherData.current_units.apparent_temperature,
      relativeHumidity: weatherData.current_units.relative_humidity_2m,
      windSpeed: weatherData.current_units.windspeed_10m,
      windDirection: weatherData.current_units.winddirection_10m,
      pressure: weatherData.current_units.surface_pressure,
      weatherCode: weatherData.current_units.weather_code,
    },
    //weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min
    daily: {
      time: weatherData.daily.time,
      temperature: weatherData.daily.temperature_2m_max,
      temperatureMin: weatherData.daily.temperature_2m_min,
      apparentTemperatureMax: weatherData.daily.apparent_temperature_max,
      apparentTemperatureMin: weatherData.daily.apparent_temperature_min,
      weatherCode: weatherData.daily.weather_code,
    },
    dailyUnits: {
      temperature: weatherData.daily_units.temperature_2m_max,
      temperatureMin: weatherData.daily_units.temperature_2m_min,
      apparentTemperatureMax: weatherData.daily_units.apparent_temperature_max,
      apparentTemperatureMin: weatherData.daily_units.apparent_temperature_min,
      weatherCode: weatherData.daily_units.weather_code,
    },
  };
  //console.log("Weather mappedWeatherData:", mappedWeatherData);
  return mappedWeatherData;
}

async function getWeatherDataForecast(latitude, longitude, model) {
  const url = new URL(OPEN_METEO_URL);
  url.searchParams.append("latitude", latitude);
  url.searchParams.append("longitude", longitude);
  url.searchParams.append(
    "current",
    "apparent_temperature,temperature_2m,relative_humidity_2m,weather_code,rain,snowfall,cloudcover,surface_pressure,windspeed_10m,winddirection_10m",
  );
  url.searchParams.append(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min",
  );
  url.searchParams.append("forecast_days", "15");
  //url.searchParams.append("current_weather", "true");
  //url.searchParams.append("hourly", "temperature_2m,relative_humidity_2m,weather_code");
  url.searchParams.append("timezone", "auto");
  url.searchParams.append("models", model);
  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {};
  }
}

//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m,cloud_cover,surface_pressure&utm_source=chatgpt.com
async function getWeatherDataListCurrent(latitudes, longitudes, model) {
  const url = new URL(OPEN_METEO_URL);
  url.searchParams.append("latitude", latitudes);
  url.searchParams.append("longitude", longitudes);
  url.searchParams.append(
    "current",
    "apparent_temperature,temperature_2m,relative_humidity_2m,weather_code,rain,snowfall,cloudcover,surface_pressure,windspeed_10m,winddirection_10m",
  );
  url.searchParams.append("timezone", "auto");
  //url.searchParams.append("models", model);
  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {};
  }
}

export async function getGeocodingData(location) {
  const geocodingResults = await getGeocoding(location);
  console.log("getGeocodingData: geocodingResults", geocodingResults);
  if (!geocodingResults || geocodingResults.length === 0) {
    return [];
  }
  const mappedResults = geocodingResults.map((item) => ({
    id: item.id,
    name: item.name,
    state: item.admin1 || "",
    country: item.country,
    latitude: item.latitude,
    longitude: item.longitude,
  }));
  return mappedResults;
}

export async function getWeather(geoCoding, model = "knmi_seamless") {
  const { latitude, longitude } = geoCoding;
  const weatherData = await getWeatherDataForecast(latitude, longitude, model);
  const mappedWeatherData = getMappedWeatherDataForecast(geoCoding, weatherData, model);
  console.log("Weather mappedWeatherData:", mappedWeatherData);
  return mappedWeatherData;
}

export async function getWeatherListCurrent(geoCodings, model = "knmi_seamless") {
  const latitudes = geoCodings.map(({ latitude }) => latitude).join(",");
  const longitudes = geoCodings.map(({ longitude }) => longitude).join(",");
  const weatherDataList = await getWeatherDataListCurrent(latitudes, longitudes, model);
  //console.log("getWeatherListCurrent weatherDataList:", weatherDataList, "geoCodings", geoCodings);
  const list = weatherDataList?.length > 0 ? weatherDataList : [weatherDataList];
  //console.log("Weather Data List:", list);
  const mappedWeatherDataList = geoCodings.map((geoCoding, index) => {
    // const geoCoding = geoCodings[index];
    const data = list[index];
    //console.log("getWeatherListCurrent geoCoding ", geoCoding);
    //console.log("getWeatherListCurrent Data ", data);
    return {
      id: `${geoCoding.latitude}-${geoCoding.longitude}`,
      location: geoCoding,
      model: getWeatherModel(model),
      temperature: data.current.temperature_2m,
      apparentTemperature: data.current.apparent_temperature,
      relativeHumidity: data.current.relative_humidity_2m,
      windSpeed: data.current.windspeed_10m,
      windDirection: data.current.winddirection_10m,
      time: data.current.time,
      pressure: data.current.surface_pressure,
      weatherCode: data.current.weather_code,
      cloudCover: data.current.cloudcover,
      rain: data.current.rain,
      snowfall: data.current.snowfall,
    };
  });
  return mappedWeatherDataList;
}

export async function getWeatherForecast(location, model = "knmi_seamless") {
  const geocodingResults = await getGeocoding(location);
  if (geocodingResults.length === 0) {
    return null;
  }
  const geoCoding = geocodingResults[0];
  const { latitude, longitude } = geoCoding;
  /* console.log(
    "Geocoding Results:",
    geocodingResults,
    "Latitude:",
    latitude,
    "Longitude:",
    longitude,
    "Model:",
    model,
  ); */
  const weatherData = await getWeatherDataForecast(latitude, longitude, model);
  //console.log("Weather Data:", weatherData);
  const mappedWeatherData = getMappedWeatherDataForecast(geoCoding, weatherData, model);
  //console.log("Weather mappedWeatherData:", mappedWeatherData);
  return mappedWeatherData;
  // return weatherData;
}

/* 
📍 Cities
🇩🇪 Essen
🇩🇪 Berlin
🇩🇪 Hamburg
🇫🇷 Paris
🇪🇸 Madrid
+ Add City
*/

/* 
Code	Beschreibung
0	Klarer Himmel
1, 2, 3	Überwiegend klar, teils bewölkt und bedeckt
45, 48	Nebel und sich ablagernder Raureifnebel
51, 53, 55	Nieselregen: Leichte, mittlere und starke Intensität
56, 57	Gefrierender Nieselregen: Leichte und dichte Intensität
61, 63, 65	Regen: Leichte, mäßige und starke Intensität
66, 67	Gefrierender Regen: Leichte und starke Intensität
71, 73, 75	Schneefall: Leichte, mäßige und starke Intensität
77	Schneekörner
80, 81, 82	Regenschauer: Leicht, mäßig und heftig
85, 86	Leichte und starke Schneeschauer
95 *	Gewitter: Leicht bis mäßig
96, 99 *	Gewitter mit leichtem und schwerem Hagel
*/
/* Weather Codes (WMO)*/
export const weatherCodes = [
  { code: 0, name: "Sunny", de: "Klarer Himmel", image: resolveLocalImage("sunny.jpg") },
  {
    code: 1,
    name: "Mostly Clear",
    de: "Überwiegend klar",
    image: resolveLocalImage("mostly_clear.jpg"),
  },
  {
    code: 2,
    name: "Partly Cloudy",
    de: "Teils bewölkt",
    image: resolveLocalImage("partly_cloudy.jpg"),
  },
  {
    code: 3,
    name: "Cloudy",
    de: "Bedeckt",
    image: resolveLocalImage("partly_cloudy.jpg"),
  },
  { code: 45, name: "Fog", de: "Nebel", image: resolveLocalImage("fog.jpg") },
  {
    code: 48,
    name: "Freezing Fog",
    de: "Raureifnebel",
    image: resolveLocalImage("fog.jpg"),
  },
  {
    code: 51,
    name: "Light Drizzle",
    de: "Leichter Nieselregen",
    image: resolveLocalImage("rain.jpg"),
  },
  {
    code: 53,
    name: "Drizzle",
    de: "Mäßiger Nieselregen",
    image: resolveLocalImage("rain.jpg"),
  },
  {
    code: 55,
    name: "Heavy Drizzle",
    de: "Starker Nieselregen",
    image: resolveLocalImage("rain.jpg"),
  },
  {
    code: 56,
    name: "Light Freezing Drizzle",
    de: "Leichter gefrierender Nieselregen",
    image: resolveLocalImage("rain.jpg"),
  },
  {
    code: 57,
    name: "Freezing Drizzle",
    de: "Dichter gefrierender Nieselregen",
    image: resolveLocalImage("rain.jpg"),
  },
  {
    code: 61,
    name: "Light Rain",
    de: "Leichter Regen",
    image: resolveLocalImage("rain.jpg"),
  },
  { code: 63, name: "Rain", de: "Mäßiger Regen", image: resolveLocalImage("rain.jpg") },
  {
    code: 65,
    name: "Heavy Rain",
    de: "Starker Regen",
    image: resolveLocalImage("rain.jpg"),
  },
  {
    code: 66,
    name: "Light Freezing Rain",
    de: "Leichter gefrierender Regen",
    image: resolveLocalImage("rain.jpg"),
  },
  {
    code: 67,
    name: "Freezing Rain",
    de: "Starker gefrierender Regen",
    image: resolveLocalImage("rain.jpg"),
  },
  {
    code: 71,
    name: "Light Snow",
    de: "Leichter Schneefall",
    image: resolveLocalImage("snowing.jpg"),
  },
  {
    code: 73,
    name: "Snow",
    de: "Mäßiger Schneefall",
    image: resolveLocalImage("snowing.jpg"),
  },
  {
    code: 75,
    name: "Heavy Snow",
    de: "Starker Schneefall",
    image: resolveLocalImage("snowing.jpg"),
  },
  {
    code: 77,
    name: "Snow Grains",
    de: "Schneekörner",
    image: resolveLocalImage("snowing.jpg"),
  },
  {
    code: 80,
    name: "Light Rain Shower",
    de: "Leichte Regenschauer",
    image: resolveLocalImage("rain.jpg"),
  },
  {
    code: 81,
    name: "Rain Shower",
    de: "Mäßige Regenschauer",
    image: resolveLocalImage("rain.jpg"),
  },
  {
    code: 82,
    name: "Heavy Rain Shower",
    de: "Heftige Regenschauer",
    image: resolveLocalImage("rain.jpg"),
  },
  {
    code: 85,
    name: "Snow Shower",
    de: "Leichte Schneeschauer",
    image: resolveLocalImage("snowing.jpg"),
  },
  {
    code: 86,
    name: "Heavy Snow Shower",
    de: "Starke Schneeschauer",
    image: resolveLocalImage("snowing.jpg"),
  },
  {
    code: 95,
    name: "Thunderstorm",
    de: "Gewitter: Leicht bis mäßig",
    image: resolveLocalImage("thunderstorm.jpg"),
  },
  {
    code: 96,
    name: "Hailstorm",
    de: "Gewitter mit leichtem Hagel",
    image: resolveLocalImage("thunderstorm.jpg"),
  },
  {
    code: 99,
    name: "Heavy Hailstorm",
    de: "Gewitter mit schwerem Hagel",
    image: resolveLocalImage("thunderstorm.jpg"),
  },
];
/* 
const sampleWeatherData = {
  latitude: 51.447998,
  longitude: 7.0179996,
  generationtime_ms: 0.5033016204833984,
  utc_offset_seconds: 7200,
  timezone: "Europe/Berlin",
  timezone_abbreviation: "GMT+2",
  elevation: 83,
  current_weather_units: {
    time: "iso8601",
    interval: "seconds",
    temperature: "°C",
    windspeed: "km/h",
    winddirection: "°",
    is_day: "",
    weathercode: "wmo code",
  },
  current_weather: {
    time: "2026-07-27T14:30",
    interval: 900,
    temperature: 20.1,
    windspeed: 10.4,
    winddirection: 275,
    is_day: 1,
    weathercode: 2,
  },
  hourly_units: {
    time: "iso8601",
    temperature_2m: "°C",
    relative_humidity_2m: "%",
    precipitation: "mm",
    rain: "mm",
    snowfall: "cm",
    cloudcover: "%",
    windspeed_10m: "km/h",
    winddirection_10m: "°",
  },
  hourly: {
    time: [
      "2026-07-27T00:00",
      "2026-07-27T01:00",
      "2026-07-27T02:00",
      "2026-07-27T03:00",
      "2026-07-27T04:00",
      "2026-07-27T05:00",
      "2026-07-27T06:00",
      "2026-07-27T07:00",
      "2026-07-27T08:00",
      "2026-07-27T09:00",
      "2026-07-27T10:00",
      "2026-07-27T11:00",
      "2026-07-27T12:00",
      "2026-07-27T13:00",
      "2026-07-27T14:00",
      "2026-07-27T15:00",
      "2026-07-27T16:00",
      "2026-07-27T17:00",
      "2026-07-27T18:00",
      "2026-07-27T19:00",
      "2026-07-27T20:00",
      "2026-07-27T21:00",
      "2026-07-27T22:00",
      "2026-07-27T23:00",
      "2026-07-28T00:00",
      "2026-07-28T01:00",
      "2026-07-28T02:00",
      "2026-07-28T03:00",
      "2026-07-28T04:00",
      "2026-07-28T05:00",
      "2026-07-28T06:00",
      "2026-07-28T07:00",
      "2026-07-28T08:00",
      "2026-07-28T09:00",
      "2026-07-28T10:00",
      "2026-07-28T11:00",
      "2026-07-28T12:00",
      "2026-07-28T13:00",
      "2026-07-28T14:00",
      "2026-07-28T15:00",
      "2026-07-28T16:00",
      "2026-07-28T17:00",
      "2026-07-28T18:00",
      "2026-07-28T19:00",
      "2026-07-28T20:00",
      "2026-07-28T21:00",
      "2026-07-28T22:00",
      "2026-07-28T23:00",
      "2026-07-29T00:00",
      "2026-07-29T01:00",
      "2026-07-29T02:00",
      "2026-07-29T03:00",
      "2026-07-29T04:00",
      "2026-07-29T05:00",
      "2026-07-29T06:00",
      "2026-07-29T07:00",
      "2026-07-29T08:00",
      "2026-07-29T09:00",
      "2026-07-29T10:00",
      "2026-07-29T11:00",
      "2026-07-29T12:00",
      "2026-07-29T13:00",
      "2026-07-29T14:00",
      "2026-07-29T15:00",
      "2026-07-29T16:00",
      "2026-07-29T17:00",
      "2026-07-29T18:00",
      "2026-07-29T19:00",
      "2026-07-29T20:00",
      "2026-07-29T21:00",
      "2026-07-29T22:00",
      "2026-07-29T23:00",
      "2026-07-30T00:00",
      "2026-07-30T01:00",
      "2026-07-30T02:00",
      "2026-07-30T03:00",
      "2026-07-30T04:00",
      "2026-07-30T05:00",
      "2026-07-30T06:00",
      "2026-07-30T07:00",
      "2026-07-30T08:00",
      "2026-07-30T09:00",
      "2026-07-30T10:00",
      "2026-07-30T11:00",
      "2026-07-30T12:00",
      "2026-07-30T13:00",
      "2026-07-30T14:00",
      "2026-07-30T15:00",
      "2026-07-30T16:00",
      "2026-07-30T17:00",
      "2026-07-30T18:00",
      "2026-07-30T19:00",
      "2026-07-30T20:00",
      "2026-07-30T21:00",
      "2026-07-30T22:00",
      "2026-07-30T23:00",
      "2026-07-31T00:00",
      "2026-07-31T01:00",
      "2026-07-31T02:00",
      "2026-07-31T03:00",
      "2026-07-31T04:00",
      "2026-07-31T05:00",
      "2026-07-31T06:00",
      "2026-07-31T07:00",
      "2026-07-31T08:00",
      "2026-07-31T09:00",
      "2026-07-31T10:00",
      "2026-07-31T11:00",
      "2026-07-31T12:00",
      "2026-07-31T13:00",
      "2026-07-31T14:00",
      "2026-07-31T15:00",
      "2026-07-31T16:00",
      "2026-07-31T17:00",
      "2026-07-31T18:00",
      "2026-07-31T19:00",
      "2026-07-31T20:00",
      "2026-07-31T21:00",
      "2026-07-31T22:00",
      "2026-07-31T23:00",
      "2026-08-01T00:00",
      "2026-08-01T01:00",
      "2026-08-01T02:00",
      "2026-08-01T03:00",
      "2026-08-01T04:00",
      "2026-08-01T05:00",
      "2026-08-01T06:00",
      "2026-08-01T07:00",
      "2026-08-01T08:00",
      "2026-08-01T09:00",
      "2026-08-01T10:00",
      "2026-08-01T11:00",
      "2026-08-01T12:00",
      "2026-08-01T13:00",
      "2026-08-01T14:00",
      "2026-08-01T15:00",
      "2026-08-01T16:00",
      "2026-08-01T17:00",
      "2026-08-01T18:00",
      "2026-08-01T19:00",
      "2026-08-01T20:00",
      "2026-08-01T21:00",
      "2026-08-01T22:00",
      "2026-08-01T23:00",
      "2026-08-02T00:00",
      "2026-08-02T01:00",
      "2026-08-02T02:00",
      "2026-08-02T03:00",
      "2026-08-02T04:00",
      "2026-08-02T05:00",
      "2026-08-02T06:00",
      "2026-08-02T07:00",
      "2026-08-02T08:00",
      "2026-08-02T09:00",
      "2026-08-02T10:00",
      "2026-08-02T11:00",
      "2026-08-02T12:00",
      "2026-08-02T13:00",
      "2026-08-02T14:00",
      "2026-08-02T15:00",
      "2026-08-02T16:00",
      "2026-08-02T17:00",
      "2026-08-02T18:00",
      "2026-08-02T19:00",
      "2026-08-02T20:00",
      "2026-08-02T21:00",
      "2026-08-02T22:00",
      "2026-08-02T23:00",
    ],
    temperature_2m: [
      18.8, 18.7, 18.5, 18.6, 18.2, 17.4, 17.1, 17.1, 17.4, 17.5, 18.3, 17.6,
      19.7, 18.5, 18.4, 21.5, 20.3, 20.6, 21.7, 21.3, 20.7, 20.1, 19.1, 18.6,
      18, 17.5, 17, 16.6, 15.9, 16.6, 16.9, 16.8, 18.7, 20.4, 22, 23.7, 25.8,
      27.6, 29, 30.3, 30.9, 31.1, 31.2, 31.1, 30.5, 29.7, 27.9, 26.6, 26.1,
      25.6, 25, 24.5, 24, 23.8, 23.6, 24.1, 25.6, 27.5, 29.6, 31.6, 33.2, 34.7,
      36.2, 36.9, 37.6, 37.8, 37.6, 37.5, 36.7, 35.3, 32.3, 30.1, 27.7, 25.2,
      24.3, 23.6, 23, 22.4, 22.2, 23.1, 25.4, 28.1, 29.9, 31.5, 33.4, 34.2,
      34.4, 34.9, 35.8, 34.8, 33.4, 30.2, 26.2, 26.6, 26.1, 24.7, 23.3, 22.4,
      22, 21.2, 20.5, 20.1, 20, 20.1, 20.8, 22.2, 24.1, 25.8, 27.1, 28.2, 29,
      29.3, 29.2, 28.9, 28.2, 27.3, 26.4, 25.4, 24.4, 23.4, 22.4, 21.3, 20.2,
      19.2, 18.3, 17.6, 17.3, 17.3, 17.7, 19, 20.7, 22.3, 23.5, 24.6, 25.5,
      26.5, 27.3, 27.8, 27.8, 27.4, 26.8, 25.8, 24.5, 23.3, 22.2, 21.2, 20.3,
      19.4, 18.6, 18.1, 18.1, 18.5, 18.7, 20.1, 22.3, 24.8, 27.3, 29.4, 30.8,
      31.5, 31.6, 31.5, 31, 30.4, 29.9, 29.2, 28.2, 27.2,
    ],
    relative_humidity_2m: [
      91, 91, 83, 87, 86, 86, 86, 86, 84, 86, 80, 85, 78, 78, 81, 66, 69, 66,
      57, 59, 59, 61, 64, 65, 65, 67, 67, 68, 72, 66, 60, 67, 61, 56, 50, 44,
      37, 33, 31, 28, 28, 27, 27, 27, 28, 30, 35, 40, 41, 43, 44, 43, 43, 43,
      43, 41, 39, 36, 32, 28, 26, 24, 22, 21, 19, 19, 19, 18, 17, 20, 29, 35,
      41, 48, 50, 52, 56, 58, 59, 55, 48, 41, 35, 31, 27, 24, 25, 22, 21, 21,
      25, 36, 58, 56, 60, 65, 68, 69, 70, 72, 76, 78, 79, 79, 75, 68, 59, 52,
      46, 42, 39, 38, 38, 38, 40, 42, 45, 48, 51, 55, 60, 65, 70, 75, 81, 84,
      86, 85, 82, 74, 64, 56, 49, 43, 38, 34, 30, 28, 28, 30, 33, 36, 41, 45,
      50, 55, 59, 62, 65, 66, 66, 65, 64, 62, 56, 49, 44, 39, 37, 37, 37, 38,
      40, 42, 44, 47, 51, 55,
    ],
    precipitation: [
      0.2, 0, 0, 0, 0, 0, 0, 0, 0, 0.1, 0.2, 0, 0, 0.3, 0.4, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1, 0, 0, 0, 0, 0, 0, 1, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    rain: [
      0.2, 0, 0, 0, 0, 0, 0, 0, 0, 0.1, 0.2, 0, 0, 0.3, 0.4, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.3, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    snowfall: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    cloudcover: [
      100, 100, 100, 100, 95, 11, 100, 100, 33, 100, 99, 100, 100, 100, 100, 52,
      100, 99, 89, 100, 99, 10, 0, 0, 0, 0, 0, 0, 47, 99, 66, 1, 0, 87, 35, 0,
      0, 0, 0, 1, 0, 23, 75, 93, 56, 0, 0, 0, 31, 53, 21, 0, 0, 0, 0, 0, 0, 0,
      15, 0, 0, 0, 0, 0, 0, 65, 57, 13, 57, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      9, 16, 94, 99, 100, 100, 99, 98, 99, 98, 99, 20, 2, 8, 41, 29, 88, 92, 98,
      98, 94, 87, 76, 63, 44, 23, 8, 6, 11, 15, 15, 15, 13, 6, 0, 2, 33, 76, 98,
      74, 29, 0, 6, 28, 47, 57, 64, 71, 81, 92, 98, 99, 97, 86, 61, 29, 5, 0, 0,
      0, 23, 56, 80, 88, 87, 79, 55, 24, 9, 28, 64, 91, 100, 100, 93, 85, 77,
      70, 63, 55, 47, 39, 32, 27, 24, 22, 22,
    ],
    windspeed_10m: [
      14.4, 13.3, 11.9, 18.4, 20.2, 16.2, 12.2, 10.8, 13, 9, 7.2, 9.7, 7.2,
      10.4, 7.6, 14.8, 20.9, 14, 16.6, 16.6, 14.4, 14.4, 12.6, 13.3, 10.4, 9,
      7.2, 5, 7.6, 7.9, 9, 10.4, 13, 13.7, 14.4, 14.4, 12.6, 11.5, 10.4, 9.7,
      8.6, 6.8, 5.4, 7.2, 7.9, 7.6, 12.2, 12.2, 13.3, 13.3, 13, 13.3, 14, 14,
      14.4, 14, 13.3, 11.5, 10.1, 10.1, 11.5, 12.2, 14, 13.3, 10.4, 7.2, 8.3,
      11.2, 11.5, 11.9, 9.1, 6.2, 6.7, 6.4, 5.3, 8.6, 10.2, 10.3, 10.6, 10.7,
      11, 11.2, 12.7, 10.9, 11.3, 15.6, 10.2, 10.4, 16.4, 25.9, 20.5, 13.1, 7.7,
      6.9, 13, 12.2, 9.5, 6.5, 6.7, 6.3, 6.1, 5.9, 6.5, 8.2, 9.1, 7.7, 4.9, 2.7,
      3.5, 6.6, 9.3, 10.7, 11.3, 11.4, 11, 10.7, 10.9, 11.1, 11.4, 11.6, 11.6,
      11.2, 10.9, 10.6, 10.6, 10.3, 9.6, 9.1, 8.9, 9, 9.2, 9.2, 8.6, 7.8, 7.3,
      7.2, 7.2, 7.2, 7.5, 8.5, 9.1, 8.9, 8.7, 9.2, 10.7, 12.4, 13.8, 14.2, 13.9,
      13.5, 12.5, 11.1, 10.1, 10, 9.3, 8.6, 8, 7.6, 7.4, 7.5, 8.2, 9.2, 10.3,
      11.1, 11.5, 11.2, 10.8, 10.3,
    ],
    winddirection_10m: [
      284, 291, 292, 273, 279, 272, 273, 274, 286, 289, 273, 234, 302, 282, 293,
      256, 293, 282, 287, 299, 297, 292, 273, 276, 274, 277, 283, 256, 188, 183,
      188, 175, 181, 190, 199, 207, 225, 234, 245, 264, 271, 264, 241, 232, 230,
      200, 165, 168, 165, 157, 158, 155, 154, 154, 156, 152, 151, 151, 154, 157,
      160, 157, 172, 181, 204, 222, 254, 262, 271, 324, 14, 44, 119, 122, 162,
      192, 187, 185, 183, 174, 180, 177, 193, 199, 200, 218, 231, 201, 184, 219,
      225, 207, 229, 263, 314, 334, 339, 355, 8, 13, 14, 20, 39, 58, 65, 65, 57,
      23, 321, 299, 294, 292, 292, 295, 305, 319, 331, 340, 348, 353, 354, 354,
      353, 356, 1, 6, 14, 25, 32, 31, 28, 23, 20, 13, 9, 4, 1, 4, 15, 29, 41,
      54, 69, 78, 74, 68, 64, 64, 65, 65, 65, 65, 65, 67, 66, 64, 63, 65, 67,
      73, 82, 91, 97, 99, 100, 96, 88, 78,
    ],
  },
  daily_units: {
    time: "iso8601",
    temperature_2m_max: "°C",
    temperature_2m_min: "°C",
    precipitation_sum: "mm",
    rain_sum: "mm",
    snowfall_sum: "cm",
    cloudcover_max: "%",
    windspeed_10m_max: "km/h",
  },
  daily: {
    time: [
      "2026-07-27",
      "2026-07-28",
      "2026-07-29",
      "2026-07-30",
      "2026-07-31",
      "2026-08-01",
      "2026-08-02",
    ],
    temperature_2m_max: [21.7, 31.2, 37.8, 35.8, 29.3, 27.8, 31.6],
    temperature_2m_min: [17.1, 15.9, 23.6, 22.2, 20, 17.3, 18.1],
    precipitation_sum: [1.2, 0, 0, 1.1, 0, 0, 0],
    rain_sum: [1.2, 0, 0, 0.3, 0, 0, 0],
    snowfall_sum: [0, 0, 0, 0, 0, 0, 0],
    cloudcover_max: [100, 99, 65, 100, 98, 99, 100],
    windspeed_10m_max: [20.9, 14.4, 14.4, 25.9, 11.6, 11.6, 14.2],
  },
};
 */
