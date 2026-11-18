import { finite, normalize, stateTimestamp } from "./core.js";
import { providerForEntity } from "./providers.js";

function parseTimestampEntity(hass, entityId) {
  const stateObj = hass?.states?.[entityId];
  if (!stateObj) return null;

  const parsed = Date.parse(stateObj.state);
  if (Number.isFinite(parsed)) return parsed;

  return stateTimestamp(stateObj);
}

function forecastFreshness(hass, entityId, provider, receivedAt) {
  const policy =
    provider?.forecastFreshness ||
    { greenMinutes: 90, yellowMinutes: 240 };

  let timestamp = null;

  if (provider?.forecastFreshnessEntity) {
    timestamp = parseTimestampEntity(
      hass,
      provider.forecastFreshnessEntity
    );
  }

  if (!timestamp) timestamp = receivedAt || null;

  if (!timestamp) {
    return {
      status: "unknown",
      ageMinutes: null,
      timestamp: null,
    };
  }

  const ageMinutes = Math.max(
    0,
    (Date.now() - timestamp) / 60000
  );

  if (ageMinutes <= policy.greenMinutes) {
    return { status: "fresh", ageMinutes, timestamp };
  }

  if (ageMinutes <= policy.yellowMinutes) {
    return { status: "aging", ageMinutes, timestamp };
  }

  return { status: "stale", ageMinutes, timestamp };
}

export function normalizeForecastEntry(
  hass,
  weatherEntity,
  entry
) {
  if (!entry || !entry.datetime) return null;

  const weather = hass?.states?.[weatherEntity];
  const attrs = weather?.attributes || {};

  const temperatureUnit =
    attrs.temperature_unit || "°C";
  const windUnit =
    attrs.wind_speed_unit || "m/s";
  const pressureUnit =
    attrs.pressure_unit || "hPa";
  const precipitationUnit =
    attrs.precipitation_unit || "mm";

  const numeric = (key) => {
    const n = finite(entry[key]);
    return n === null ? null : n;
  };

  const temperature =
    entry.temperature == null
      ? null
      : normalize(
          "temperature",
          entry.temperature,
          temperatureUnit
        );

  const templow =
    entry.templow == null
      ? null
      : normalize(
          "temperature",
          entry.templow,
          temperatureUnit
        );

  const apparentTemperature =
    entry.apparent_temperature == null
      ? null
      : normalize(
          "apparent_temperature",
          entry.apparent_temperature,
          temperatureUnit
        );

  const dewPoint =
    entry.dew_point == null
      ? null
      : normalize(
          "dew_point",
          entry.dew_point,
          temperatureUnit
        );

  const precipitation =
    entry.precipitation == null
      ? null
      : normalize(
          "precipitation",
          entry.precipitation,
          precipitationUnit
        );

  const pressure =
    entry.pressure == null
      ? null
      : normalize(
          "pressure",
          entry.pressure,
          pressureUnit
        );

  const windSpeed =
    entry.wind_speed == null
      ? null
      : normalize(
          "wind_speed",
          entry.wind_speed,
          windUnit
        );

  const windGust =
    entry.wind_gust_speed == null
      ? null
      : normalize(
          "wind_gust",
          entry.wind_gust_speed,
          windUnit
        );

  return {
    datetime: entry.datetime,
    condition: entry.condition || null,
    is_daytime:
      typeof entry.is_daytime === "boolean"
        ? entry.is_daytime
        : null,
    temperature,
    templow,
    apparent_temperature: apparentTemperature,
    dew_point: dewPoint,
    precipitation,
    precipitation_probability:
      numeric("precipitation_probability"),
    precipitation_category:
      numeric("precipitation_category"),
    precipitation_frozen_part:
      numeric("precipitation_frozen_part"),
    humidity: numeric("humidity"),
    cloud_coverage: numeric("cloud_coverage"),
    pressure,
    wind_bearing:
      entry.wind_bearing ?? null,
    wind_speed: windSpeed,
    wind_gust_speed: windGust,
  };
}

export function selectForecastSeries(seriesList) {
  const valid = seriesList.filter(
    (series) =>
      Array.isArray(series?.forecast) &&
      series.forecast.length > 0
  );

  if (!valid.length) return null;

  const nonStale = valid.find(
    (series) => series.freshness?.status !== "stale"
  );

  return nonStale || valid[0];
}

export class ForecastSeriesManager {
  constructor(onChange) {
    this.onChange = onChange;
    this.hass = null;
    this.config = {};
    this.connection = null;
    this.subscriptions = new Map();
    this.series = new Map();
  }

  update(hass, config) {
    const connectionChanged =
      this.connection &&
      hass?.connection &&
      this.connection !== hass.connection;

    if (connectionChanged) {
      this.disconnect();
    }

    this.hass = hass;
    this.config = config || {};
    this.connection = hass?.connection || null;
  }

  entities() {
    const result = [];
    const add = (entityId) => {
      if (
        entityId &&
        entityId.startsWith("weather.") &&
        !result.includes(entityId)
      ) {
        result.push(entityId);
      }
    };

    add(this.config.weather_entity);

    if (this.config.use_fallbacks !== false) {
      add(this.config.fallback_weather_1);
      add(this.config.fallback_weather_2);
    }

    return result;
  }

  ensure(type) {
    this._ensure(type).catch((error) => {
      console.warn(
        "Weather Central forecast subscription failed",
        type,
        error
      );
    });
  }

  async _ensure(type) {
    if (!this.connection) return;

    const desired = new Set(
      this.entities().map(
        (entityId) => `${entityId}|${type}`
      )
    );

    for (const [key, subscription] of this.subscriptions) {
      if (key.endsWith(`|${type}`) && !desired.has(key)) {
        this.subscriptions.delete(key);
        try {
          const unsubscribe =
            await subscription.unsubscribePromise;
          unsubscribe?.();
        } catch {
          // Subscription may already be gone after reconnect.
        }
      }
    }

    for (const entityId of this.entities()) {
      const key = `${entityId}|${type}`;

      if (this.subscriptions.has(key)) continue;

      const unsubscribePromise =
        this.connection.subscribeMessage(
          (event) => {
            const forecast = Array.isArray(event?.forecast)
              ? event.forecast
                  .map((entry) =>
                    normalizeForecastEntry(
                      this.hass,
                      entityId,
                      entry
                    )
                  )
                  .filter(Boolean)
              : [];

            this.series.set(key, {
              entityId,
              type,
              forecast,
              receivedAt: Date.now(),
            });

            this.onChange?.();
          },
          {
            type: "weather/subscribe_forecast",
            forecast_type: type,
            entity_id: entityId,
          }
        );

      this.subscriptions.set(key, {
        entityId,
        type,
        unsubscribePromise,
      });
    }
  }

  get(type) {
    const candidates = this.entities()
      .map((entityId, index) => {
        const key = `${entityId}|${type}`;
        const stored = this.series.get(key);

        if (!stored) return null;

        const provider =
          providerForEntity(entityId, this.hass);

        return {
          ...stored,
          source: provider.label,
          sourceId: provider.id,
          fallbackLevel: index,
          freshness: forecastFreshness(
            this.hass,
            entityId,
            provider,
            stored.receivedAt
          ),
        };
      })
      .filter(Boolean);

    return selectForecastSeries(candidates);
  }

  disconnect() {
    const subscriptions = [
      ...this.subscriptions.values(),
    ];

    this.subscriptions.clear();
    this.series.clear();

    for (const subscription of subscriptions) {
      Promise.resolve(
        subscription.unsubscribePromise
      )
        .then((unsubscribe) => unsubscribe?.())
        .catch(() => {});
    }
  }
}
