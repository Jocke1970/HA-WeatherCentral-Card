import test from "node:test";
import assert from "node:assert/strict";
import { WeatherValueResolver } from "../src/resolver.js";

const nowIso = () => new Date().toISOString();
const oldIso = (minutes) =>
  new Date(Date.now() - minutes * 60000).toISOString();

function state(stateValue, unit = null, updated = nowIso(), attrs = {}) {
  return {
    state: String(stateValue),
    attributes: {
      ...(unit ? { unit_of_measurement: unit } : {}),
      ...attrs,
    },
    last_reported: updated,
    last_updated: updated,
    last_changed: updated,
  };
}

function weather(condition, attrs = {}, updated = nowIso()) {
  return {
    state: condition,
    attributes: attrs,
    last_reported: updated,
    last_updated: updated,
    last_changed: updated,
  };
}

function baseHass() {
  return {
    states: {
      "weather.smhi_local": weather("cloudy", {
        temperature: 5.2,
        temperature_unit: "°C",
        humidity: 90,
        wind_speed: 2,
        wind_speed_unit: "m/s",
        pressure: 1020,
        pressure_unit: "hPa",
      }),
      "sensor.smhi_local_temperatur": state(5.1, "°C"),
      "sensor.smhi_local_kanns_som": state(3.9, "°C"),
      "sensor.smhi_local_luftfuktighet": state(91, "%"),
      "sensor.smhi_local_molnmangd": state(100, "%"),
      "sensor.smhi_local_vindhastighet": state(18, "km/h"),
      "sensor.smhi_local_vindby": state(25.2, "km/h"),
      "sensor.smhi_local_lufttryck": state(1021.2, "hPa"),
      "sensor.smhi_local_sikt": state(8.5, "km"),
      "sensor.smhi_local_prognos_skapad": state(nowIso()),
      "weather.pirateweather": weather("cloudy", {
        temperature: 4.8,
        temperature_unit: "°C",
        visibility: 11,
        visibility_unit: "km",
      }),
    },
  };
}

test("SMHI Local wind is normalized from km/h to m/s", () => {
  const resolver = new WeatherValueResolver(baseHass(), {
    weather_entity: "weather.smhi_local",
    use_fallbacks: true,
  });

  const reading = resolver.resolve("wind_speed");

  assert.ok(reading);
  assert.equal(reading.source, "SMHI Local");
  assert.equal(reading.entityId, "sensor.smhi_local_vindhastighet");
  assert.equal(reading.value, 5);
});

test("missing provider value falls back to another weather integration", () => {
  const hass = baseHass();
  hass.states["sensor.smhi_local_sikt"] = state("unavailable");

  const resolver = new WeatherValueResolver(hass, {
    weather_entity: "weather.smhi_local",
    fallback_weather_1: "weather.pirateweather",
    use_fallbacks: true,
  });

  const reading = resolver.resolve("visibility");

  assert.ok(reading);
  assert.equal(reading.source, "Pirate Weather");
  assert.equal(reading.entityId, "weather.pirateweather");
  assert.equal(reading.value, 11);
  assert.ok(reading.fallbackLevel > 0);
});

test("explicit parameter fallback is tried before provider default", () => {
  const hass = baseHass();
  hass.states["sensor.custom_primary"] = state("unavailable");
  hass.states["sensor.custom_fallback"] = state(7.4, "°C");

  const resolver = new WeatherValueResolver(hass, {
    weather_entity: "weather.smhi_local",
    use_fallbacks: true,
    parameters: {
      temperature: {
        primary: "sensor.custom_primary",
        fallbacks: ["sensor.custom_fallback"],
      },
    },
  });

  const reading = resolver.resolve("temperature");

  assert.ok(reading);
  assert.equal(reading.entityId, "sensor.custom_fallback");
  assert.equal(reading.value, 7.4);
});

test("stale explicit primary falls through to fresh fallback", () => {
  const hass = baseHass();
  hass.states["sensor.custom_primary"] = state(
    9.1,
    "°C",
    oldIso(240)
  );
  hass.states["sensor.custom_fallback"] = state(6.8, "°C");

  const resolver = new WeatherValueResolver(hass, {
    weather_entity: "weather.smhi_local",
    use_fallbacks: true,
    recovery_grace_seconds: 0,
    parameters: {
      temperature: {
        primary: "sensor.custom_primary",
        fallbacks: ["sensor.custom_fallback"],
      },
    },
  });

  const reading = resolver.resolve("temperature");

  assert.ok(reading);
  assert.equal(reading.entityId, "sensor.custom_fallback");
  assert.equal(reading.freshness.status, "fresh");
});

test("unavailable data never becomes numeric zero", () => {
  const hass = baseHass();
  hass.states["sensor.smhi_local_sikt"] = state("unavailable");
  delete hass.states["weather.pirateweather"];

  const resolver = new WeatherValueResolver(hass, {
    weather_entity: "weather.smhi_local",
    use_fallbacks: false,
  });

  const reading = resolver.resolve("visibility");

  assert.equal(reading, null);
});

test("Weather Consensus remains an explicit named source", () => {
  const hass = baseHass();
  hass.states["sensor.vaderkonsensus_temperatur"] = state(5.35, "°C");

  const resolver = new WeatherValueResolver(hass, {
    weather_entity: "weather.smhi_local",
    use_fallbacks: true,
    parameters: {
      temperature: {
        primary: "sensor.vaderkonsensus_temperatur",
        fallbacks: ["sensor.smhi_local_temperatur"],
      },
    },
  });

  const reading = resolver.resolve("temperature");

  assert.ok(reading);
  assert.equal(reading.source, "Weather Consensus");
  assert.equal(reading.entityId, "sensor.vaderkonsensus_temperatur");
});
