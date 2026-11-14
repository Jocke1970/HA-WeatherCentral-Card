export const INVALID_STATES = new Set(["unknown", "unavailable", "none", "null", ""]);

export const PARAMS = [
  "temperature",
  "apparent_temperature",
  "humidity",
  "cloud_coverage",
  "dew_point",
  "precipitation",
  "wind_speed",
  "wind_gust",
  "wind_bearing",
  "pressure",
  "visibility",
];

export const PARAM_META = {
  temperature: { icon: "mdi:thermometer", unit: "°C", decimals: 1 },
  apparent_temperature: { icon: "mdi:thermometer-lines", unit: "°C", decimals: 1 },
  humidity: { icon: "mdi:water-percent", unit: "%", decimals: 0 },
  cloud_coverage: { icon: "mdi:weather-cloudy", unit: "%", decimals: 0 },
  dew_point: { icon: "mdi:water-thermometer-outline", unit: "°C", decimals: 1 },
  precipitation: { icon: "mdi:weather-rainy", unit: "mm", decimals: 1 },
  wind_speed: { icon: "mdi:weather-windy", unit: "m/s", decimals: 1 },
  wind_gust: { icon: "mdi:weather-windy-variant", unit: "m/s", decimals: 1 },
  wind_bearing: { icon: "mdi:compass-outline", unit: "°", decimals: 0 },
  pressure: { icon: "mdi:gauge", unit: "mbar", decimals: 0 },
  visibility: { icon: "mdi:eye-outline", unit: "km", decimals: 1 },
};

export const WEATHER_ATTRS = {
  temperature: ["temperature"],
  apparent_temperature: ["apparent_temperature"],
  humidity: ["humidity"],
  cloud_coverage: ["cloud_coverage"],
  dew_point: ["dew_point"],
  precipitation: ["precipitation"],
  wind_speed: ["wind_speed"],
  wind_gust: ["wind_gust_speed", "wind_gust"],
  wind_bearing: ["wind_bearing"],
  pressure: ["pressure"],
  visibility: ["visibility"],
};

export function finite(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function validState(stateObj) {
  return Boolean(
    stateObj &&
    !INVALID_STATES.has(String(stateObj.state ?? "").toLowerCase())
  );
}

export function stateTimestamp(stateObj) {
  const raw =
    stateObj?.last_reported ||
    stateObj?.last_updated ||
    stateObj?.last_changed;
  if (!raw) return null;
  const ts = Date.parse(raw);
  return Number.isFinite(ts) ? ts : null;
}

export function normalize(param, value, unit) {
  const n = finite(value);
  if (n === null) return null;
  const u = String(unit || "").trim().toLowerCase();

  if (["temperature", "apparent_temperature", "dew_point"].includes(param)) {
    return ["°f", "f", "fahrenheit"].includes(u) ? (n - 32) * 5 / 9 : n;
  }

  if (["wind_speed", "wind_gust"].includes(param)) {
    if (["km/h", "kmh", "kph"].includes(u)) return n / 3.6;
    if (u === "mph") return n * 0.44704;
    if (["kn", "kt", "knot", "knots"].includes(u)) return n * 0.514444;
    return n;
  }

  if (param === "pressure") {
    if (u === "pa") return n / 100;
    if (u === "kpa") return n * 10;
    return n;
  }

  if (param === "visibility") {
    if (u === "m") return n / 1000;
    if (["mi", "mile", "miles"].includes(u)) return n * 1.609344;
    return n;
  }

  return n;
}

export function weatherAttributeUnit(weatherState, param) {
  const a = weatherState?.attributes || {};
  if (["temperature", "apparent_temperature", "dew_point"].includes(param)) {
    return a.temperature_unit || "°C";
  }
  if (["wind_speed", "wind_gust"].includes(param)) {
    return a.wind_speed_unit || "m/s";
  }
  if (param === "pressure") return a.pressure_unit || "hPa";
  if (param === "visibility") return a.visibility_unit || "km";
  if (["humidity", "cloud_coverage"].includes(param)) return "%";
  if (param === "wind_bearing") return "°";
  if (param === "precipitation") return a.precipitation_unit || "mm";
  return null;
}

export function formatValue(value, decimals = 1) {
  if (!Number.isFinite(value)) return "–";
  return value.toLocaleString("sv-SE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function windDirection(deg, language = "sv") {
  if (!Number.isFinite(deg)) return "–";
  const sv = ["N", "NÖ", "Ö", "SÖ", "S", "SV", "V", "NV"];
  const en = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const dirs = language === "sv" ? sv : en;
  return dirs[Math.round((((deg % 360) + 360) % 360) / 45) % 8];
}
