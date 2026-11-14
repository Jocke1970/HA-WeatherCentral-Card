import test from "node:test";
import assert from "node:assert/strict";
import {
  deriveFrostRisk,
  getRiskData,
  getAlertsData,
  getAirQualityData,
  getSkyData,
  getComparisonData,
} from "../src/extras.js";

const now = new Date().toISOString();

function state(value, attrs = {}) {
  return {
    state: String(value),
    attributes: attrs,
    last_reported: now,
    last_updated: now,
    last_changed: now,
  };
}

function weather(attrs = {}) {
  return state("cloudy", {
    temperature_unit: "°C",
    wind_speed_unit: "m/s",
    pressure_unit: "hPa",
    ...attrs,
  });
}

test("frost risk is unknown when no usable forecast exists", () => {
  const frost = deriveFrostRisk({ forecast: [] });

  assert.equal(frost.available, false);
  assert.equal(frost.level, 0);
});

test("frost risk derives a high risk from freezing precipitation", () => {
  const frost = deriveFrostRisk({
    forecast: [
      {
        datetime: now,
        temperature: 0.2,
        precipitation: 0.5,
        humidity: 95,
      },
    ],
  });

  assert.equal(frost.available, true);
  assert.equal(frost.level, 3);
});

test("explicit risk binary sensor can establish no-risk instead of unknown", () => {
  const hass = {
    states: {
      "binary_sensor.frost_halka_relevant": state("off"),
    },
  };

  const risks = getRiskData(
    hass,
    {},
    { forecast: [] }
  );

  assert.equal(risks.frost.available, true);
  assert.equal(risks.frost.level, 0);
});

test("missing thunder data stays unknown", () => {
  const risks = getRiskData(
    { states: {} },
    {},
    { forecast: [] }
  );

  assert.equal(risks.thunder.available, false);
});

test("alert adapter distinguishes missing integration from zero alerts", () => {
  const missing = getAlertsData(
    { states: {} },
    {}
  );

  assert.equal(missing.available, false);

  const hass = {
    states: {
      "binary_sensor.smhi_alerts_active_stockholms_lan":
        state("off", {
          warnings_count: 0,
          messages_count: 0,
        }),
      "sensor.smhi_alerts_stockholms_lan":
        state(0, { messages: [] }),
    },
  };

  const available = getAlertsData(hass, {});

  assert.equal(available.available, true);
  assert.equal(available.warnings, 0);
  assert.equal(available.messagesCount, 0);
});

test("air quality adapter reads the existing dashboard entities", () => {
  const hass = {
    states: {
      "sensor.stockholm_sodermalm_sweden_luftkvalitetsindex": state(42),
      "sensor.stockholm_sodermalm_sweden_dominerande_fororening": state("pm25"),
      "sensor.stockholm_sodermalm_sweden_ozon": state(31),
      "sensor.stockholm_sodermalm_sweden_kvavedioxid": state(18),
      "sensor.stockholm_sodermalm_sweden_pm25": state(7.5),
      "sensor.stockholm_sodermalm_sweden_pm10": state(11),
    },
  };

  const data = getAirQualityData(hass, {});

  assert.equal(data.aqi, 42);
  assert.equal(data.dominant, "pm25");
  assert.equal(data.pm25, 7.5);
});

test("sky adapter auto-detects existing standard entities", () => {
  const hass = {
    states: {
      "sun.sun": state("above_horizon", {
        elevation: 10,
        next_setting: now,
      }),
      "sensor.moon_phase": state("full_moon"),
      "sensor.openuv_aktuellt_uv_index": state(1.5),
      "sensor.aurora_59_18": state(12),
    },
  };

  const sky = getSkyData(hass, {});

  assert.equal(sky.sun.state, "above_horizon");
  assert.equal(sky.moon.phase, "full_moon");
  assert.equal(sky.uv.value, 1.5);
  assert.equal(sky.aurora.value, 12);
});

test("comparison discovers known providers without calculating consensus itself", () => {
  const hass = {
    states: {
      "weather.smhi_local": weather({
        temperature: 5,
        wind_speed: 2,
        pressure: 1005,
        cloud_coverage: 80,
      }),
      "weather.pirateweather": weather({
        temperature: 4,
        wind_speed: 1.5,
        pressure: 1006,
        cloud_coverage: 90,
      }),
      "sensor.vaderkonsensus_temperatur": state(4.8),
      "sensor.vaderkonsensus_vind": state(1.9),
    },
  };

  const data = getComparisonData(hass, {
    weather_entity: "weather.smhi_local",
  });

  assert.equal(data.providers.length, 2);
  assert.equal(data.providers[0].source, "SMHI Local");
  assert.equal(data.consensus.temperature.value, 4.8);
  assert.equal(data.consensus.wind.value, 1.9);
});
