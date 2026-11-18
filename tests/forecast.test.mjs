import test from "node:test";
import assert from "node:assert/strict";
import {
  ForecastSeriesManager,
  normalizeForecastEntry,
  selectForecastSeries,
} from "../src/forecast.js";

const now = new Date().toISOString();

function weather(attrs = {}) {
  return {
    state: "cloudy",
    attributes: {
      temperature_unit: "°C",
      wind_speed_unit: "m/s",
      pressure_unit: "hPa",
      precipitation_unit: "mm",
      ...attrs,
    },
    last_reported: now,
    last_updated: now,
    last_changed: now,
  };
}

test("forecast normalization uses weather entity units", () => {
  const hass = {
    states: {
      "weather.test": weather({
        temperature_unit: "°F",
        wind_speed_unit: "km/h",
        precipitation_unit: "in",
      }),
    },
  };

  const entry = normalizeForecastEntry(
    hass,
    "weather.test",
    {
      datetime: now,
      temperature: 50,
      wind_speed: 18,
      precipitation: 1,
      precipitation_probability: 70,
    }
  );

  assert.ok(entry);
  assert.equal(entry.temperature, 10);
  assert.equal(entry.wind_speed, 5);
  assert.equal(entry.precipitation, 25.4);
  assert.equal(entry.precipitation_probability, 70);
});

test("series selection chooses one complete non-stale provider", () => {
  const base = {
    entityId: "weather.primary",
    forecast: [{ datetime: now, temperature: 5 }],
    freshness: { status: "stale" },
  };

  const fallback = {
    entityId: "weather.fallback",
    forecast: [
      { datetime: now, temperature: 6 },
      { datetime: now, temperature: 7 },
    ],
    freshness: { status: "fresh" },
  };

  const selected = selectForecastSeries([
    base,
    fallback,
  ]);

  assert.equal(selected.entityId, "weather.fallback");
  assert.equal(selected.forecast.length, 2);
});

test("series selection never splices entries across providers", () => {
  const selected = selectForecastSeries([
    {
      entityId: "weather.a",
      forecast: [
        { datetime: "2026-01-01T00:00:00Z", temperature: 1 },
        { datetime: "2026-01-01T01:00:00Z", temperature: 2 },
      ],
      freshness: { status: "fresh" },
    },
    {
      entityId: "weather.b",
      forecast: [
        { datetime: "2026-01-01T02:00:00Z", temperature: 3 },
      ],
      freshness: { status: "fresh" },
    },
  ]);

  assert.equal(selected.entityId, "weather.a");
  assert.deepEqual(
    selected.forecast.map((x) => x.temperature),
    [1, 2]
  );
});

test("subscription payload matches Home Assistant weather API", async () => {
  let message = null;
  let callback = null;

  const connection = {
    subscribeMessage(cb, msg) {
      callback = cb;
      message = msg;
      return Promise.resolve(() => {});
    },
  };

  const hass = {
    connection,
    states: {
      "weather.smhi_local": weather(),
      "sensor.smhi_local_prognos_skapad": {
        state: now,
        attributes: {},
        last_reported: now,
        last_updated: now,
        last_changed: now,
      },
    },
  };

  const manager = new ForecastSeriesManager(() => {});
  manager.update(hass, {
    weather_entity: "weather.smhi_local",
    use_fallbacks: true,
  });

  manager.ensure("hourly");
  await new Promise((resolve) => setImmediate(resolve));

  assert.deepEqual(message, {
    type: "weather/subscribe_forecast",
    forecast_type: "hourly",
    entity_id: "weather.smhi_local",
  });

  callback({
    type: "hourly",
    forecast: [
      {
        datetime: now,
        temperature: 5,
      },
    ],
  });

  const series = manager.get("hourly");
  assert.ok(series);
  assert.equal(series.entityId, "weather.smhi_local");
  assert.equal(series.forecast[0].temperature, 5);

  manager.disconnect();
});

test("forecast normalization preserves precipitation condition such as snow", () => {
  const hass = {
    states: {
      "weather.test": weather(),
    },
  };

  const entry = normalizeForecastEntry(
    hass,
    "weather.test",
    {
      datetime: now,
      condition: "snowy",
      precipitation: 0.1,
      precipitation_probability: 60,
    }
  );

  assert.ok(entry);
  assert.equal(entry.condition, "snowy");
  assert.equal(entry.precipitation, 0.1);
  assert.equal(entry.precipitation_probability, 60);
});

test("forecast normalization preserves SMHI precipitation metadata", () => {
  const hass = {
    states: {
      "weather.test": weather(),
    },
  };

  const entry = normalizeForecastEntry(
    hass,
    "weather.test",
    {
      datetime: now,
      condition: "cloudy",
      temperature: 1,
      precipitation: 0.1,
      precipitation_probability: 30,
      precipitation_category: 1,
      precipitation_frozen_part: 100,
    }
  );

  assert.ok(entry);
  assert.equal(entry.precipitation_category, 1);
  assert.equal(entry.precipitation_frozen_part, 100);
});

