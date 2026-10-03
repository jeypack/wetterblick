// meteor call: https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=temperature_2m,relative_humidity_2m,precipitation,rain,snowfall,cloudcover,windspeed_10m,winddirection_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,snowfall_sum,cloudcover_max,windspeed_10m_max&current_weather=true&timezone=auto

//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,apparent_temperature,weather_code&timezone=auto

//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m,cloud_cover,surface_pressure&utm_source=chatgpt.com

import { resolveLocalImage } from "../utils/assets";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Fetch geocoding data for a given location.
 * @param {string} location - The name of the location to geocode.
 * @returns {Promise<Array>} A promise that resolves to an array of geocoding results.
 */
async function getGeocoding(location) {
  const url = new URL(GEOCODING_URL);
  url.searchParams.append("name", location);
  url.searchParams.append("language", "de");
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

/**
 * Map raw weather data to a structured format for a given location and model.
 * @param {object} location - The location object containing latitude and longitude.
 * @param {object} weatherData - The raw weather data from the API.
 * @param {string} model - The weather model used for the forecast.
 * @returns {object|null} The mapped weather data or null if no data is available.
 */
function getMappedWeatherDataForecast(location, weatherData, model) {
  if (!weatherData) {
    return null;
  }

  const dailyData =
    weatherData.daily.time.map((t, index) => {
      const date = new Date(t);
      const day = date.getDay();
      return {
        date: DAYS_OF_WEEK[day] + " " + date.getDate() + "." + (date.getMonth() + 1),
        temperatureMax: weatherData.daily.temperature_2m_max[index],
        temperatureMin: weatherData.daily.temperature_2m_min[index],
        temperature: [
          weatherData.daily.temperature_2m_min[index],
          weatherData.daily.temperature_2m_max[index],
        ],
        apparentMax: weatherData.daily.apparent_temperature_max[index],
        apparentMin: weatherData.daily.apparent_temperature_min[index],
        weatherCode: weatherData.daily.weather_code[index],
      };
    }) || [];

  const hourlyData =
    weatherData.hourly.time.map((t, index) => {
      const date = new Date(t);
      const day = date.getDay();
      return {
        date: DAYS_OF_WEEK[day] + " " + date.getDate() + "." + (date.getMonth() + 1),
        time: (date.getHours() + 100).toString().slice(-2) + ":00",
        temperature: weatherData.hourly.temperature_2m[index].toFixed(1),
        apparent: weatherData.hourly.apparent_temperature[index],
        relativeHumidity: weatherData.hourly.relative_humidity_2m[index],
        windSpeed: weatherData.hourly.wind_speed_10m[index],
        weatherCode: weatherData.hourly.weather_code[index],
      };
    }) || [];

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
      isDay: weatherData.current.is_day,
    },
    daily: dailyData,
    hourly: hourlyData,
  };
  //console.log("Weather mappedWeatherData:", mappedWeatherData);
  return mappedWeatherData;
}
/**
 * Fetch weather forecast data for a specific location and model.
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @param {string} model - The weather model to use for the forecast.
 * @returns {Promise<object>} A promise that resolves to the weather forecast data.
 */
async function getWeatherDataForecast(latitude, longitude, model) {
  //current=is_day
  const url = new URL(OPEN_METEO_URL);
  url.searchParams.append("latitude", latitude);
  url.searchParams.append("longitude", longitude);
  url.searchParams.append(
    "current",
    "apparent_temperature,temperature_2m,relative_humidity_2m,weather_code,rain,snowfall,cloudcover,surface_pressure,windspeed_10m,winddirection_10m,is_day",
  );
  url.searchParams.append(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min",
  );
  url.searchParams.append("forecast_days", "15");
  url.searchParams.append("forecast_hours", "24");
  //url.searchParams.append("current_weather", "true");
  url.searchParams.append(
    "hourly",
    "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,apparent_temperature",
  );
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

/**
 * Fetch current weather data for a list of locations.
 * @param {Array<number>} latitudes - The latitudes of the locations.
 * @param {Array<number>} longitudes - The longitudes of the locations.
 * @param {string} model - The weather model to use for the forecast.
 * @returns {Promise<object>} A promise that resolves to the current weather data for the locations.
 */
async function getWeatherDataListCurrent(latitudes, longitudes, model) {
  const url = new URL(OPEN_METEO_URL);
  url.searchParams.append("latitude", latitudes);
  url.searchParams.append("longitude", longitudes);
  url.searchParams.append(
    "current",
    "apparent_temperature,temperature_2m,relative_humidity_2m,weather_code,rain,snowfall,cloudcover,surface_pressure,windspeed_10m,winddirection_10m,is_day",
  );
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

/**
 * List of available weather models with their display names and model identifiers.
 */
export const weatherModels = [
  { name: "ECMWF IFS", model: "ecmwf_ifs" },
  { name: "UKMO Seamless", model: "ukmo_seamless" },
  { name: "DWD ICON", model: "dwd_icon_seamless" },
  { name: "CMC Gem", model: "cmc_gem_seamless" },
  { name: "MeteoSwiss ICON", model: "meteoswiss_icon_seamless" },
  { name: "Météo-France", model: "meteofrance_seamless" },
  { name: "KNMI Forecast", model: "knmi_seamless" },
];

/**
 * Get the weather model object by its model identifier.
 * @param {string} modelName - The model identifier.
 * @returns {object|null} The weather model object or null if not found.
 * @see {@link ./api.js weatherModels} for the list of available weather models.
 */
export const getWeatherModel = (modelName) => {
  const model = weatherModels.find((item) => item.model === modelName);
  return model ? model : null;
};

/**
 * Fetch geocoding data for a given location.
 * @param {string} location - The location to geocode.
 * @see {@link ./api.js getGeocoding} for the function that performs the actual geocoding request.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of geocoding results.
 */
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

/**
 * Fetch weather forecast data for a specific location and model.
 * @param {object} geoCoding - The geocoding information of the location.
 * @param {string} model - The weather model to use for the forecast.
 * @see {@link ./api.js getWeatherDataForecast} for the function that performs the actual weather data request.
 * @see {@link ./api.js getMappedWeatherDataForecast} for the function that maps the raw weather data to the desired format.
 * @returns {Promise<object>} A promise that resolves to the mapped weather forecast data.
 */
export async function getWeather(geoCoding, model = "knmi_seamless") {
  const { latitude, longitude } = geoCoding;
  const weatherData = await getWeatherDataForecast(latitude, longitude, model);
  console.log("Weather Data:", weatherData);
  const mappedWeatherData = getMappedWeatherDataForecast(geoCoding, weatherData, model);
  console.log("Weather mappedWeatherData:", mappedWeatherData);
  return mappedWeatherData;
}

/**
 * Fetch current weather data for a list of locations.
 * @param {Array<object>} geoCodings - The geocoding information of the locations.
 * @param {string} model - The weather model to use for the forecast.
 * @see {@link ./api.js getWeatherDataListCurrent} for the function that performs the actual weather data request.
 * @see {@link ./api.js getMappedWeatherDataListCurrent} for the function that maps the raw weather data to the desired format.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of mapped current weather data.
 */
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
      temperature: data.current.temperature_2m.toFixed(1),
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
      isDay: data.current.is_day,
    };
  });
  return mappedWeatherDataList;
}

/**
 * Fetch weather forecast data for a specific location.
 * @param {string} location - The location to fetch the forecast for.
 * @param {string} model - The weather model to use for the forecast.
 * @see {@link ./api.js getGeocoding} for the function that performs the actual geocoding request.
 * @see {@link ./api.js getWeatherDataForecast} for the function that performs the actual weather data request.
 * @see {@link ./api.js getMappedWeatherDataForecast} for the function that maps the raw weather data to the desired format.
 * @returns {Promise<object|null>} A promise that resolves to the mapped weather forecast data or null if the location is not found.
 */
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

/**
 * List of weather codes with their English and German descriptions and associated images.
 * Weather Codes (WMO)
 * Code	Beschreibung
 * 0	Klarer Himmel
 * 1, 2, 3	Überwiegend klar, teils bewölkt und bedeckt
 * 45, 48	Nebel und sich ablagernder Raureifnebel
 * 51, 53, 55	Nieselregen: Leichte, mittlere und starke Intensität
 * 56, 57	Gefrierender Nieselregen: Leichte und dichte Intensität
 * 61, 63, 65	Regen: Leichte, mäßige und starke Intensität
 * 66, 67	Gefrierender Regen: Leichte und starke Intensität
 * 71, 73, 75	Schneefall: Leichte, mäßige und starke Intensität
 * 77	Schneekörner
 * 80, 81, 82	Regenschauer: Leicht, mäßig und heftig
 * 85, 86	Leichte und starke Schneeschauer
 * 95 *	Gewitter: Leicht bis mäßig
 * 96, 99 *	Gewitter mit leichtem und schwerem Hagel
 * @see {@link ./api.js weatherCodes} for the list of weather codes with their descriptions and associated images.
*/
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
📍 Cities
🇩🇪 Essen
🇩🇪 Berlin
🇩🇪 Hamburg
🇫🇷 Paris
🇪🇸 Madrid
+ Add City
*/
