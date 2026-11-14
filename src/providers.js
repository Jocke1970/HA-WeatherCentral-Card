export const PROVIDERS = [
  {
    id: "smhi_local",
    label: "SMHI Local",
    matchWeather: (id) =>
      id === "weather.smhi_local" || String(id || "").includes("smhi_local"),
    entities: {
      temperature: "sensor.smhi_local_temperatur",
      apparent_temperature: "sensor.smhi_local_kanns_som",
      humidity: "sensor.smhi_local_luftfuktighet",
      cloud_coverage: "sensor.smhi_local_molnmangd",
      wind_speed: "sensor.smhi_local_vindhastighet",
      wind_gust: "sensor.smhi_local_vindby",
      pressure: "sensor.smhi_local_lufttryck",
      visibility: "sensor.smhi_local_sikt",
    },
    forecastFreshnessEntity: "sensor.smhi_local_prognos_skapad",
    freshness: { greenMinutes: 20, yellowMinutes: 90 },
    forecastFreshness: { greenMinutes: 180, yellowMinutes: 360 },
  },
  {
    id: "pirateweather",
    label: "Pirate Weather",
    matchWeather: (id) =>
      id === "weather.pirateweather" ||
      String(id || "").includes("pirateweather"),
    entities: {
      apparent_temperature: "sensor.pirateweather_apparent_temperature",
      humidity: "sensor.pirateweather_humidity",
      cloud_coverage: "sensor.pirateweather_cloud_coverage",
      dew_point: "sensor.pirateweather_dew_point",
      precipitation: "sensor.pirateweather_precip_intensity",
      wind_gust: "sensor.pirateweather_wind_gust",
      wind_bearing: "sensor.pirateweather_wind_bearing",
      pressure: "sensor.pirateweather_pressure",
      visibility: "sensor.pirateweather_visibility",
    },
    freshness: { greenMinutes: 35, yellowMinutes: 120 },
  },
  {
    id: "met",
    label: "MET Norway",
    matchWeather: (id) =>
      /forecast_home|met_no|met\.no|met_norway/i.test(String(id || "")),
    entities: {},
    freshness: { greenMinutes: 35, yellowMinutes: 120 },
  },
  {
    id: "open_meteo",
    label: "Open-Meteo",
    matchWeather: (id) =>
      /open.?meteo|weather\.garaget/i.test(String(id || "")),
    entities: {},
    freshness: { greenMinutes: 45, yellowMinutes: 150 },
  },
  {
    id: "owm",
    label: "OpenWeatherMap",
    matchWeather: (id) =>
      /openweathermap|owm/i.test(String(id || "")),
    entities: {},
    freshness: { greenMinutes: 45, yellowMinutes: 150 },
  },
];

export function providerForWeather(entityId) {
  return PROVIDERS.find((provider) => provider.matchWeather(entityId)) || null;
}

export function providerForEntity(entityId, hass) {
  if (!entityId) return { id: "unknown", label: "Unknown", entities: {} };

  if (/vaderkonsensus|weather_consensus|weather.*consensus/i.test(entityId)) {
    return { id: "consensus", label: "Weather Consensus", entities: {} };
  }

  for (const provider of PROVIDERS) {
    if (provider.matchWeather(entityId)) return provider;
    if (Object.values(provider.entities || {}).includes(entityId)) return provider;
  }

  const friendlyName = hass?.states?.[entityId]?.attributes?.friendly_name;
  return {
    id: "custom",
    label: friendlyName || entityId,
    entities: {},
    freshness: { greenMinutes: 45, yellowMinutes: 120 },
  };
}
