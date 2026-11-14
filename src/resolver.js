import {
  WEATHER_ATTRS,
  normalize,
  stateTimestamp,
  validState,
  weatherAttributeUnit,
} from "./core.js";
import { providerForEntity, providerForWeather } from "./providers.js";

function parseEntityTimestamp(hass, entityId) {
  const stateObj = hass?.states?.[entityId];
  if (!validState(stateObj)) return null;

  const parsed = Date.parse(stateObj.state);
  if (Number.isFinite(parsed)) return parsed;

  return stateTimestamp(stateObj);
}

function freshnessFor(hass, entityId, provider, useForecastClock = false) {
  const policy = useForecastClock
    ? provider?.forecastFreshness || { greenMinutes: 180, yellowMinutes: 360 }
    : provider?.freshness || { greenMinutes: 45, yellowMinutes: 120 };

  let timestamp = null;

  if (useForecastClock && provider?.forecastFreshnessEntity) {
    timestamp = parseEntityTimestamp(hass, provider.forecastFreshnessEntity);
  }

  if (!timestamp && entityId) {
    timestamp = stateTimestamp(hass?.states?.[entityId]);
  }

  if (!timestamp) {
    return { status: "unknown", ageMinutes: null, timestamp: null };
  }

  const ageMinutes = Math.max(0, (Date.now() - timestamp) / 60000);

  if (ageMinutes <= policy.greenMinutes) {
    return { status: "fresh", ageMinutes, timestamp };
  }

  if (ageMinutes <= policy.yellowMinutes) {
    return { status: "aging", ageMinutes, timestamp };
  }

  return { status: "stale", ageMinutes, timestamp };
}

function readWeatherAttribute(hass, weatherEntity, param) {
  const stateObj = hass?.states?.[weatherEntity];
  if (!validState(stateObj)) return null;

  for (const attr of WEATHER_ATTRS[param] || []) {
    const raw = stateObj.attributes?.[attr];
    if (raw === undefined || raw === null) continue;

    const value = normalize(
      param,
      raw,
      weatherAttributeUnit(stateObj, param)
    );

    if (value !== null) {
      return { value, entityId: weatherEntity, weatherAttribute: attr };
    }
  }

  return null;
}

function readEntity(hass, entityId, param) {
  if (!entityId) return null;

  if (entityId.startsWith("weather.")) {
    return readWeatherAttribute(hass, entityId, param);
  }

  const stateObj = hass?.states?.[entityId];
  if (!validState(stateObj)) return null;

  const value = normalize(
    param,
    stateObj.state,
    stateObj.attributes?.unit_of_measurement
  );

  if (value === null) return null;

  return { value, entityId };
}

export class WeatherValueResolver {
  constructor(hass, config) {
    this.hass = hass;
    this.config = config || {};
    this.selectedSources = new Map();
    this.freshSince = new Map();
  }

  update(hass, config) {
    this.hass = hass;
    this.config = config || {};
  }

  baseProvider() {
    return (
      providerForWeather(this.config.weather_entity) || {
        id: "generic",
        label:
          this.hass?.states?.[this.config.weather_entity]?.attributes
            ?.friendly_name || "Weather",
        entities: {},
        freshness: { greenMinutes: 45, yellowMinutes: 120 },
      }
    );
  }

  parameterConfig(param) {
    const raw = this.config.parameters?.[param] || {};
    return {
      primary: raw.primary || null,
      fallbacks: Array.isArray(raw.fallbacks)
        ? raw.fallbacks.filter(Boolean)
        : [],
    };
  }

  candidates(param) {
    const provider = this.baseProvider();
    const manual = this.parameterConfig(param);
    const result = [];

    const add = (entityId, role, useForecastClock = false) => {
      if (!entityId) return;
      if (result.some((candidate) => candidate.entityId === entityId)) return;
      result.push({ entityId, role, useForecastClock });
    };

    if (manual.primary) {
      add(manual.primary, "manual-primary");

      if (this.config.use_fallbacks !== false) {
        for (const entityId of manual.fallbacks) {
          add(entityId, "manual-fallback");
        }
      }
    }

    add(
      provider.entities?.[param],
      "provider",
      provider.id === "smhi_local"
    );
    add(
      this.config.weather_entity,
      "base-weather",
      provider.id === "smhi_local"
    );

    if (this.config.use_fallbacks !== false) {
      if (!manual.primary) {
        for (const entityId of manual.fallbacks) {
          add(entityId, "manual-fallback");
        }
      }

      add(this.config.fallback_weather_1, "fallback-weather");
      add(this.config.fallback_weather_2, "fallback-weather");
    }

    return result;
  }

  resolveCandidate(param, candidate, index) {
    const reading = readEntity(this.hass, candidate.entityId, param);
    if (!reading) return null;

    let provider = providerForEntity(candidate.entityId, this.hass);

    if (
      provider.id === "custom" &&
      candidate.entityId === this.config.weather_entity
    ) {
      provider = this.baseProvider();
    }

    const freshness = freshnessFor(
      this.hass,
      candidate.entityId,
      provider,
      candidate.useForecastClock && provider.id === "smhi_local"
    );

    return {
      param,
      value: reading.value,
      entityId: candidate.entityId,
      source: provider.label,
      sourceId: provider.id,
      role: candidate.role,
      fallbackLevel: index,
      freshness,
      stale: freshness.status === "stale",
    };
  }

  trackFresh(param, reading) {
    if (!reading) return;

    const key = `${param}:${reading.entityId}`;

    if (reading.freshness.status === "fresh") {
      if (!this.freshSince.has(key)) {
        this.freshSince.set(key, Date.now());
      }
    } else {
      this.freshSince.delete(key);
    }
  }

  resolve(param) {
    const readings = this.candidates(param)
      .map((candidate, index) =>
        this.resolveCandidate(param, candidate, index)
      )
      .filter(Boolean);

    for (const reading of readings) {
      this.trackFresh(param, reading);
    }

    if (!readings.length) return null;

    const nonStale = readings.filter((reading) => !reading.stale);
    let chosen = nonStale[0] || readings[0];

    const previousEntity = this.selectedSources.get(param);
    const previous = readings.find(
      (reading) => reading.entityId === previousEntity
    );

    if (
      previous &&
      !previous.stale &&
      chosen.entityId !== previous.entityId &&
      chosen.fallbackLevel < previous.fallbackLevel
    ) {
      const key = `${param}:${chosen.entityId}`;
      const freshSince = this.freshSince.get(key) || Date.now();
      const graceMs =
        Math.max(
          0,
          Number(this.config.recovery_grace_seconds ?? 120)
        ) * 1000;

      if (Date.now() - freshSince < graceMs) {
        chosen = previous;
      }
    }

    this.selectedSources.set(param, chosen.entityId);
    return chosen;
  }
}
