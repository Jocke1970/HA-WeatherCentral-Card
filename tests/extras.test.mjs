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


test("comparison prefers Weather Comparison v2 sensor metadata when available", () => {
  const hass = {
    states: {
      "weather.smhi_local": weather({
        temperature: 99,
        wind_speed: 99,
      }),
      "sensor.vaderjamforelse_v2_smhi_local_temperatur": state(5.1, {
        friendly_name: "Väderjämförelse v2 SMHI Local temperatur",
        source: "SMHI Local",
        model_family: "SMHI snow1g",
        implementation: "SMHI Local",
        parameter: "temperature",
        sampled_at: now,
      }),
      "sensor.vaderjamforelse_v2_smhi_local_vind": state(2.4, {
        friendly_name: "Väderjämförelse v2 SMHI Local vind",
        source: "SMHI Local",
        model_family: "SMHI snow1g",
        implementation: "SMHI Local",
        parameter: "wind_speed",
        sampled_at: now,
      }),
      "sensor.vaderjamforelse_v2_met_temperatur": state(5.5, {
        friendly_name: "Väderjämförelse v2 MET temperatur",
        source: "MET Norway",
        parameter: "temperature",
        sampled_at: now,
      }),
      "sensor.vaderjamforelse_v2_met_vind": state(2.7, {
        friendly_name: "Väderjämförelse v2 MET vind",
        source: "MET Norway",
        parameter: "wind_speed",
        sampled_at: now,
      }),
    },
  };

  const data = getComparisonData(hass, {
    weather_entity: "weather.smhi_local",
  });

  assert.equal(data.providers.length, 2);

  const local = data.providers.find(
    (provider) => provider.source === "SMHI Local"
  );
  const met = data.providers.find(
    (provider) => provider.source === "MET Norway"
  );

  assert.equal(local.values.temperature, 5.1);
  assert.equal(local.values.wind_speed, 2.4);
  assert.equal(local.modelFamily, "SMHI snow1g");
  assert.equal(local.implementation, "SMHI Local");
  assert.equal(met.values.temperature, 5.5);
  assert.equal(met.values.wind_speed, 2.7);
});

test("frost risk matches original elevated-risk dew-point threshold", () => {
  const frost = deriveFrostRisk({
    forecast: [
      {
        datetime: now,
        temperature: 1.0,
        dew_point: 1.0,
        precipitation: 0,
      },
    ],
  });

  assert.equal(frost.available, true);
  assert.equal(frost.level, 2);
  assert.equal(frost.minSpread, 0);
  assert.equal(frost.first.reason, "cold_humid");
});

test("explicit frost max_risk never gets downgraded by card derivation", () => {
  const hass = {
    states: {
      "binary_sensor.frost_halka_relevant": state("on", {
        max_risk: 2,
      }),
    },
  };

  const risks = getRiskData(
    hass,
    {},
    {
      forecast: [
        {
          datetime: now,
          temperature: 2.5,
          dew_point: 2.0,
          precipitation: 0,
        },
      ],
      source: "SMHI Local",
      freshness: { status: "fresh" },
    }
  );

  assert.equal(risks.frost.level, 2);
  assert.equal(risks.frost.active, true);
});

test("fire risk becomes active at moderate index and exposes 12h legacy timeline", () => {
  const states = {
    "binary_sensor.brandrisk_relevant": state("on", {
      max_index_12h: 15,
    }),
    "sensor.pirateweather_fire_index": state(8),
  };

  for (let i = 1; i <= 12; i += 1) {
    states[`sensor.pirateweather_fire_index_${i}h`] =
      state(i === 5 ? 15 : 7);
  }

  const risks = getRiskData(
    { states },
    {},
    { forecast: [] }
  );

  assert.equal(risks.fire.active, true);
  assert.equal(risks.fire.index, 15);
  assert.equal(risks.fire.current, 8);
  assert.equal(risks.fire.timeline.length, 12);
  assert.equal(risks.fire.peak.hour, 5);
});

test("one percent thunder risk is not treated as active", () => {
  const hass = {
    states: {
      "sensor.smhi_local_askrisk_nu": state(1),
    },
  };

  const risks = getRiskData(
    hass,
    {},
    { forecast: [] }
  );

  assert.equal(risks.thunder.available, true);
  assert.equal(risks.thunder.active, false);
});

