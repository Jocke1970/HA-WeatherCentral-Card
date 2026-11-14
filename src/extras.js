import {
  normalize,
  validState,
  weatherAttributeUnit,
} from "./core.js";
import {
  providerForEntity,
  providerForWeather,
} from "./providers.js";

export const EXTRA_DEFAULTS = {
  sun_entity: "sun.sun",
  moon_entity: "sensor.moon_phase",
  uv_entity: "sensor.openuv_aktuellt_uv_index",
  aurora_entity: "sensor.aurora_59_18",
  frost_risk_entity: "binary_sensor.frost_halka_relevant",
  fire_risk_entity: "binary_sensor.brandrisk_relevant",
  thunder_risk_entity: "sensor.smhi_local_askrisk_nu",
  alerts_status_entity:
    "binary_sensor.smhi_alerts_active_stockholms_lan",
  alerts_entity: "sensor.smhi_alerts_stockholms_lan",
  aqi_entity:
    "sensor.stockholm_sodermalm_sweden_luftkvalitetsindex",
  dominant_pollutant_entity:
    "sensor.stockholm_sodermalm_sweden_dominerande_fororening",
  ozone_entity:
    "sensor.stockholm_sodermalm_sweden_ozon",
  no2_entity:
    "sensor.stockholm_sodermalm_sweden_kvavedioxid",
  pm25_entity:
    "sensor.stockholm_sodermalm_sweden_pm25",
  pm10_entity:
    "sensor.stockholm_sodermalm_sweden_pm10",
};

const SOURCE_LABELS = {
  sun_entity: "Home Assistant Sun",
  moon_entity: "Home Assistant Moon",
  uv_entity: "OpenUV",
  aurora_entity: "Aurora",
  frost_risk_entity: "Weather Central",
  fire_risk_entity: "Brandrisk",
  thunder_risk_entity: "SMHI Local",
  alerts_status_entity: "SMHI",
  alerts_entity: "SMHI",
  aqi_entity: "Luftkvalitet",
  dominant_pollutant_entity: "Luftkvalitet",
  ozone_entity: "Luftkvalitet",
  no2_entity: "Luftkvalitet",
  pm25_entity: "Luftkvalitet",
  pm10_entity: "Luftkvalitet",
};

export function extraEntity(
  hass,
  config,
  field
) {
  const configured =
    config?.extras?.[field] ||
    config?.[field];

  if (configured) return configured;

  const candidate = EXTRA_DEFAULTS[field];
  return candidate && hass?.states?.[candidate]
    ? candidate
    : null;
}

export function extraSourceLabel(
  hass,
  config,
  field
) {
  const entityId = extraEntity(hass, config, field);
  if (!entityId) return "";

  const provider = providerForEntity(entityId, hass);
  if (
    provider &&
    !["custom", "unknown"].includes(provider.id)
  ) {
    return provider.label;
  }

  return (
    SOURCE_LABELS[field] ||
    hass?.states?.[entityId]?.attributes?.friendly_name ||
    entityId
  );
}

export function readNumber(
  hass,
  entityId
) {
  const stateObj = hass?.states?.[entityId];
  if (!validState(stateObj)) return null;

  const value = Number(stateObj.state);
  return Number.isFinite(value) ? value : null;
}

export function readText(
  hass,
  entityId
) {
  const stateObj = hass?.states?.[entityId];
  if (!validState(stateObj)) return null;
  return String(stateObj.state);
}

export function entityFreshness(
  hass,
  entityId,
  greenMinutes = 45,
  yellowMinutes = 180
) {
  const stateObj = hass?.states?.[entityId];
  if (!stateObj) {
    return {
      status: "unknown",
      ageMinutes: null,
    };
  }

  const raw =
    stateObj.last_reported ||
    stateObj.last_updated ||
    stateObj.last_changed;

  const timestamp = Date.parse(raw || "");
  if (!Number.isFinite(timestamp)) {
    return {
      status: "unknown",
      ageMinutes: null,
    };
  }

  const ageMinutes = Math.max(
    0,
    (Date.now() - timestamp) / 60000
  );

  if (ageMinutes <= greenMinutes) {
    return { status: "fresh", ageMinutes };
  }

  if (ageMinutes <= yellowMinutes) {
    return { status: "aging", ageMinutes };
  }

  return { status: "stale", ageMinutes };
}

export function getSkyData(hass, config) {
  const sunEntity =
    extraEntity(hass, config, "sun_entity");
  const moonEntity =
    extraEntity(hass, config, "moon_entity");
  const uvEntity =
    extraEntity(hass, config, "uv_entity");
  const auroraEntity =
    extraEntity(hass, config, "aurora_entity");

  const sun = hass?.states?.[sunEntity] || null;
  const moon = hass?.states?.[moonEntity] || null;

  return {
    sun: sun
      ? {
          entityId: sunEntity,
          state: sun.state,
          elevation: Number.isFinite(
            Number(sun.attributes?.elevation)
          )
            ? Number(sun.attributes.elevation)
            : null,
          nextRising:
            sun.attributes?.next_rising || null,
          nextSetting:
            sun.attributes?.next_setting || null,
          source: extraSourceLabel(
            hass,
            config,
            "sun_entity"
          ),
          freshness: entityFreshness(
            hass,
            sunEntity,
            180,
            720
          ),
        }
      : null,
    moon: moon
      ? {
          entityId: moonEntity,
          phase: moon.state,
          source: extraSourceLabel(
            hass,
            config,
            "moon_entity"
          ),
          freshness: entityFreshness(
            hass,
            moonEntity,
            720,
            2880
          ),
        }
      : null,
    uv: uvEntity
      ? {
          entityId: uvEntity,
          value: readNumber(hass, uvEntity),
          source: extraSourceLabel(
            hass,
            config,
            "uv_entity"
          ),
          freshness: entityFreshness(
            hass,
            uvEntity,
            90,
            240
          ),
        }
      : null,
    aurora: auroraEntity
      ? {
          entityId: auroraEntity,
          value: readNumber(hass, auroraEntity),
          source: extraSourceLabel(
            hass,
            config,
            "aurora_entity"
          ),
          freshness: entityFreshness(
            hass,
            auroraEntity,
            90,
            240
          ),
        }
      : null,
  };
}

export function deriveFrostRisk(
  hourlyForecast
) {
  const entries =
    hourlyForecast?.forecast || [];

  let maxLevel = 0;
  let first = null;
  let minTemp = null;

  entries.slice(0, 12).forEach(
    (entry, index) => {
      const temp = Number(entry.temperature);
      if (!Number.isFinite(temp)) return;

      minTemp =
        minTemp === null
          ? temp
          : Math.min(minTemp, temp);

      const precip =
        Number.isFinite(entry.precipitation)
          ? entry.precipitation
          : 0;

      const humidity =
        Number.isFinite(entry.humidity)
          ? entry.humidity
          : null;

      const dew =
        Number.isFinite(entry.dew_point)
          ? entry.dew_point
          : null;

      const spread =
        dew === null ? null : temp - dew;

      let level = 0;
      let reason = "";

      if (temp <= 0.5 && precip > 0) {
        level = 3;
        reason = "precip_freezing";
      } else if (temp <= 0) {
        level = 2;
        reason = "below_zero";
      } else if (
        temp <= 2 &&
        (
          (humidity !== null && humidity >= 90) ||
          (spread !== null && spread <= 1.5)
        )
      ) {
        level = 1;
        reason = "cold_humid";
      }

      if (level > maxLevel) {
        maxLevel = level;
      }

      if (!first && level > 0) {
        first = {
          index,
          datetime: entry.datetime,
          level,
          reason,
        };
      }
    }
  );

  return {
    available: entries
      .slice(0, 12)
      .some((entry) =>
        Number.isFinite(Number(entry.temperature))
      ),
    level: maxLevel,
    first,
    minTemp,
  };
}

export function getRiskData(
  hass,
  config,
  hourlyForecast
) {
  const frostEntity = extraEntity(
    hass,
    config,
    "frost_risk_entity"
  );
  const fireEntity = extraEntity(
    hass,
    config,
    "fire_risk_entity"
  );
  const thunderEntity = extraEntity(
    hass,
    config,
    "thunder_risk_entity"
  );

  const frost = deriveFrostRisk(hourlyForecast);
  const frostState =
    frostEntity
      ? hass.states[frostEntity]
      : null;
  const frostEntityAvailable =
    validState(frostState);

  if (!frost.available && frostEntityAvailable) {
    frost.available = true;
    frost.level =
      frostState.state === "on" ? 1 : 0;
  } else if (
    frost.available &&
    frostEntityAvailable &&
    frostState.state === "on" &&
    frost.level === 0
  ) {
    frost.level = 1;
  }

  const fireState =
    fireEntity
      ? hass.states[fireEntity]
      : null;

  const fireIndex =
    fireState &&
    Number.isFinite(
      Number(fireState.attributes?.max_index_12h)
    )
      ? Number(fireState.attributes.max_index_12h)
      : readNumber(hass, fireEntity);

  const fireAvailable =
    validState(fireState) ||
    Number.isFinite(fireIndex);

  const fireActive =
    fireAvailable &&
    (
      fireState?.state === "on" ||
      (
        Number.isFinite(fireIndex) &&
        fireIndex >= 10
      )
    );

  let thunderValue =
    readNumber(hass, thunderEntity);

  const forecastEntries =
    (hourlyForecast?.forecast || [])
      .slice(0, 12);

  const forecastThunderAvailable =
    forecastEntries.some(
      (entry) => Boolean(entry.condition)
    );

  const forecastThunder =
    forecastEntries.some((entry) =>
      ["lightning", "lightning-rainy"].includes(
        entry.condition
      )
    );

  if (
    !Number.isFinite(thunderValue) &&
    forecastThunder
  ) {
    thunderValue = 100;
  }

  const thunderAvailable =
    Number.isFinite(thunderValue) ||
    forecastThunderAvailable;

  return {
    frost: {
      ...frost,
      entityId: frostEntity,
      source:
        frost.available &&
        hourlyForecast?.forecast?.length
          ? hourlyForecast.source || ""
          : frostEntityAvailable
            ? extraSourceLabel(
                hass,
                config,
                "frost_risk_entity"
              )
            : "",
      freshness:
        frost.available &&
        hourlyForecast?.forecast?.length
          ? hourlyForecast.freshness || {
              status: "unknown",
            }
          : frostEntityAvailable
            ? entityFreshness(
                hass,
                frostEntity,
                45,
                180
              )
            : { status: "unknown" },
    },
    fire: {
      entityId: fireEntity,
      available: fireAvailable,
      active: fireActive,
      index:
        Number.isFinite(fireIndex)
          ? fireIndex
          : null,
      source: fireEntity
        ? extraSourceLabel(
            hass,
            config,
            "fire_risk_entity"
          )
        : "",
      freshness: fireEntity
        ? entityFreshness(
            hass,
            fireEntity,
            60,
            240
          )
        : { status: "unknown" },
    },
    thunder: {
      entityId: thunderEntity,
      available: thunderAvailable,
      value:
        Number.isFinite(thunderValue)
          ? thunderValue
          : null,
      active:
        Number.isFinite(thunderValue)
          ? thunderValue > 0
          : forecastThunder,
      source: thunderEntity
        ? extraSourceLabel(
            hass,
            config,
            "thunder_risk_entity"
          )
        : hourlyForecast?.source || "",
      freshness: thunderEntity
        ? entityFreshness(
            hass,
            thunderEntity,
            60,
            240
          )
        : hourlyForecast?.freshness || {
            status: "unknown",
          },
    },
  };
}

export function getAlertsData(
  hass,
  config
) {
  const statusEntity = extraEntity(
    hass,
    config,
    "alerts_status_entity"
  );
  const alertsEntity = extraEntity(
    hass,
    config,
    "alerts_entity"
  );

  const status =
    hass?.states?.[statusEntity] || null;
  const alerts =
    hass?.states?.[alertsEntity] || null;

  const messages = Array.isArray(
    alerts?.attributes?.messages
  )
    ? alerts.attributes.messages
    : [];

  const available =
    validState(status) ||
    validState(alerts);

  return {
    available,
    statusEntity,
    alertsEntity,
    warnings:
      Number(status?.attributes?.warnings_count) || 0,
    messagesCount:
      Number(status?.attributes?.messages_count) ||
      messages.length ||
      0,
    alertsCount:
      Number(status?.attributes?.alerts_count) ||
      messages.length ||
      0,
    severity: String(
      status?.attributes?.highest_severity || ""
    ).toUpperCase(),
    lastUpdate:
      status?.attributes?.last_update_local ||
      status?.attributes?.last_update ||
      null,
    messages,
    source: "SMHI",
    freshness: statusEntity
      ? entityFreshness(
          hass,
          statusEntity,
          60,
          240
        )
      : { status: "unknown" },
  };
}

export function getAirQualityData(
  hass,
  config
) {
  const fields = {
    aqi: "aqi_entity",
    dominant: "dominant_pollutant_entity",
    o3: "ozone_entity",
    no2: "no2_entity",
    pm25: "pm25_entity",
    pm10: "pm10_entity",
  };

  const entities = Object.fromEntries(
    Object.entries(fields).map(
      ([key, field]) => [
        key,
        extraEntity(hass, config, field),
      ]
    )
  );

  return {
    entities,
    aqi: readNumber(hass, entities.aqi),
    dominant: readText(
      hass,
      entities.dominant
    ),
    o3: readNumber(hass, entities.o3),
    no2: readNumber(hass, entities.no2),
    pm25: readNumber(hass, entities.pm25),
    pm10: readNumber(hass, entities.pm10),
    source: entities.aqi
      ? extraSourceLabel(
          hass,
          config,
          "aqi_entity"
        )
      : "",
    freshness: entities.aqi
      ? entityFreshness(
          hass,
          entities.aqi,
          90,
          360
        )
      : { status: "unknown" },
  };
}

function weatherReading(
  hass,
  entityId,
  param
) {
  const stateObj =
    hass?.states?.[entityId];
  if (!validState(stateObj)) return null;

  const attr =
    param === "wind_gust"
      ? (
          stateObj.attributes?.wind_gust_speed ??
          stateObj.attributes?.wind_gust
        )
      : stateObj.attributes?.[param];

  if (attr == null) return null;

  return normalize(
    param,
    attr,
    weatherAttributeUnit(
      stateObj,
      param
    )
  );
}

export function comparisonWeatherEntities(
  hass,
  config
) {
  const result = [];

  const add = (entityId) => {
    if (
      entityId &&
      hass?.states?.[entityId] &&
      entityId.startsWith("weather.") &&
      !result.includes(entityId)
    ) {
      result.push(entityId);
    }
  };

  add(config?.weather_entity);
  add(config?.fallback_weather_1);
  add(config?.fallback_weather_2);

  Object.keys(hass?.states || {})
    .filter((id) => id.startsWith("weather."))
    .filter((id) => providerForWeather(id))
    .forEach(add);

  return result.slice(0, 6);
}

function findConsensusEntity(
  hass,
  kind
) {
  const needles =
    kind === "temperature"
      ? [
          "vaderkonsensus_temperatur",
          "weather_consensus_temperature",
        ]
      : [
          "vaderkonsensus_vind",
          "weather_consensus_wind",
        ];

  return Object.keys(hass?.states || {})
    .find((id) => {
      const friendly = String(
        hass.states[id]?.attributes?.friendly_name || ""
      )
        .toLowerCase()
        .replaceAll("ä", "a");

      const normalizedId = id
        .toLowerCase()
        .replaceAll("ä", "a");

      return needles.some(
        (needle) =>
          normalizedId.includes(needle) ||
          friendly.includes(
            needle.replaceAll("_", " ")
          )
      );
    }) || null;
}

export function getComparisonData(
  hass,
  config
) {
  const params = [
    "temperature",
    "humidity",
    "wind_speed",
    "wind_gust",
    "pressure",
    "cloud_coverage",
  ];

  const providers =
    comparisonWeatherEntities(
      hass,
      config
    ).map((entityId) => {
      const provider =
        providerForWeather(entityId) || {
          id: "generic",
          label:
            hass.states[entityId]?.attributes
              ?.friendly_name || entityId,
        };

      return {
        entityId,
        source: provider.label,
        sourceId: provider.id,
        freshness: entityFreshness(
          hass,
          entityId,
          60,
          240
        ),
        values: Object.fromEntries(
          params.map((param) => [
            param,
            weatherReading(
              hass,
              entityId,
              param
            ),
          ])
        ),
      };
    });

  const tempConsensus =
    findConsensusEntity(
      hass,
      "temperature"
    );
  const windConsensus =
    findConsensusEntity(
      hass,
      "wind"
    );

  return {
    providers,
    consensus: {
      temperature: tempConsensus
        ? {
            entityId: tempConsensus,
            value: readNumber(
              hass,
              tempConsensus
            ),
            freshness: entityFreshness(
              hass,
              tempConsensus,
              30,
              120
            ),
          }
        : null,
      wind: windConsensus
        ? {
            entityId: windConsensus,
            value: readNumber(
              hass,
              windConsensus
            ),
            freshness: entityFreshness(
              hass,
              windConsensus,
              30,
              120
            ),
          }
        : null,
    },
  };
}
