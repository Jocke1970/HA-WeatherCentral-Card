import { PARAM_META, PARAMS, formatValue, windDirection } from "./core.js";
import { languageFor, tr } from "./i18n.js";
import { WeatherValueResolver } from "./resolver.js";
import { ForecastSeriesManager } from "./forecast.js";

const VERSION = "2026.11.0-dev.1";

const ICONS = {
  "clear-night": "mdi:weather-night",
  cloudy: "mdi:weather-cloudy",
  exceptional: "mdi:alert-circle-outline",
  fog: "mdi:weather-fog",
  hail: "mdi:weather-hail",
  lightning: "mdi:weather-lightning",
  "lightning-rainy": "mdi:weather-lightning-rainy",
  partlycloudy: "mdi:weather-partly-cloudy",
  pouring: "mdi:weather-pouring",
  rainy: "mdi:weather-rainy",
  snowy: "mdi:weather-snowy",
  "snowy-rainy": "mdi:weather-snowy-rainy",
  sunny: "mdi:weather-sunny",
  windy: "mdi:weather-windy",
  "windy-variant": "mdi:weather-windy-variant",
};

const CSS = `
  :host{display:block;min-width:0}
  ha-card{padding:16px;overflow:hidden}
  .top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:14px}
  .heading{display:flex;align-items:center;gap:12px;min-width:0}
  .hero-icon{--mdc-icon-size:52px;color:var(--primary-color)}
  .title{font-size:12px;color:var(--secondary-text-color)}
  .condition{font-size:18px;font-weight:650;line-height:1.2;margin-top:2px}
  .provider{font-size:10px;color:var(--secondary-text-color);white-space:nowrap}
  .main{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:end;margin:2px 0 14px}
  .big{font-size:38px;font-weight:650;line-height:1}
  .secondary{font-size:12px;color:var(--secondary-text-color);margin-top:5px}
  .grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
  .tile{padding:11px;border-radius:12px;background:var(--secondary-background-color);min-width:0}
  .tile-head{display:flex;align-items:center;gap:7px;color:var(--secondary-text-color);font-size:11px}
  .tile-head ha-icon{--mdc-icon-size:19px;color:var(--primary-color);flex:none}
  .tile-value{font-size:18px;font-weight:650;margin-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .meta{display:flex;align-items:center;gap:5px;margin-top:5px;font-size:9.5px;color:var(--secondary-text-color);min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .dot{width:7px;height:7px;border-radius:50%;display:inline-block;flex:none;background:var(--disabled-text-color)}
  .dot.fresh{background:var(--success-color,#43a047)}
  .dot.aging{background:var(--warning-color,#f9a825)}
  .dot.stale{background:var(--error-color,#e53935)}
  .dot.unknown{background:var(--disabled-text-color,#9e9e9e)}
  .fallback{opacity:.9}
  .section-title{display:flex;align-items:center;gap:8px;font-size:16px;font-weight:650;margin-bottom:12px}
  .section-title ha-icon{--mdc-icon-size:23px;color:var(--primary-color)}
  .diag{display:grid;gap:7px}
  .diag-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center;padding:9px 0;border-top:1px solid var(--divider-color)}
  .diag-row:first-child{border-top:0}
  .diag-name{font-size:12px;font-weight:600;overflow:hidden;text-overflow:ellipsis}
  .diag-sub{font-size:10px;color:var(--secondary-text-color);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .diag-value{text-align:right;font-size:12px;white-space:nowrap}
  .empty{padding:22px 8px;text-align:center;color:var(--secondary-text-color)}
  .footer{margin-top:12px;padding-top:10px;border-top:1px solid var(--divider-color);display:flex;justify-content:space-between;gap:10px;font-size:9.5px;color:var(--secondary-text-color)}
  .forecast-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}\n  .forecast-sub{font-size:11px;color:var(--secondary-text-color)}\n  .hours{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px}\n  .hour{padding:8px 3px;border-radius:10px;background:var(--secondary-background-color);text-align:center;min-width:0}\n  .hour-time{font-size:10px;color:var(--secondary-text-color)}\n  .hour-main{font-size:15px;font-weight:650;margin-top:4px;white-space:nowrap}\n  .hour-sub{font-size:9.5px;color:var(--secondary-text-color);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n  .forecast-days{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px}\n  .day{padding:10px 5px;border-radius:12px;background:var(--secondary-background-color);text-align:center;min-width:0}\n  .day ha-icon{--mdc-icon-size:29px;color:var(--primary-color);margin:7px 0 3px}\n  .day-name{font-size:12px;font-weight:650}\n  .day-date{font-size:9.5px;color:var(--secondary-text-color);margin-top:1px}\n  .day-temp{font-size:16px;font-weight:650;margin-top:5px}\n  .day-low{font-size:12px;color:var(--secondary-text-color);font-weight:400;margin-left:3px}\n  .series-meta{display:flex;align-items:center;justify-content:flex-end;gap:5px;font-size:9.5px;color:var(--secondary-text-color);margin-top:9px}\n  .temp-chart{width:100%;height:auto;display:block;overflow:visible;margin-top:4px}\n  @media(max-width:420px){ha-card{padding:13px}.big{font-size:34px}.hero-icon{--mdc-icon-size:46px}}
`;

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function freshnessClass(reading) {
  return reading?.freshness?.status || "unknown";
}

function iconForCondition(condition) {
  return ICONS[condition] || "mdi:weather-partly-cloudy";
}

export class WeatherCentralCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = {};
    this._hass = null;
    this._resolver = null;
    this._forecast = new ForecastSeriesManager(() => this._scheduleRender());
    this._scheduled = false;

    this.shadowRoot.addEventListener("click", (event) => {
      const target = event.target.closest?.("[data-more-info]");
      const entityId = target?.dataset?.moreInfo;
      if (!entityId) return;

      this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          detail: { entityId },
          bubbles: true,
          composed: true,
        })
      );
    });
  }

  static async getConfigElement() {
    return document.createElement("weather-central-card-editor");
  }

  static getStubConfig(hass) {
    const weatherEntity =
      Object.keys(hass?.states || {}).find(
        (id) => id === "weather.smhi_local"
      ) ||
      Object.keys(hass?.states || {}).find(
        (id) => id.startsWith("weather.")
      ) ||
      "";

    return {
      type: "custom:weather-central-card",
      weather_entity: weatherEntity,
      view: "overview",
      show_sources: true,
      show_freshness: true,
      use_fallbacks: true,
    };
  }

  setConfig(config) {
    if (!config || typeof config !== "object") {
      throw new Error("Invalid card configuration");
    }

    if (!config.weather_entity) {
      throw new Error("weather_entity is required");
    }

    this._config = {
      view: "overview",
      show_sources: true,
      show_freshness: true,
      use_fallbacks: true,
      recovery_grace_seconds: 120,
      ...config,
    };

    if (this._resolver) {
      this._resolver.update(this._hass, this._config);
    }

    this._forecast.update(this._hass, this._config);
    this._updateForecastSubscriptions();
    this._scheduleRender();
  }

  set hass(hass) {
    this._hass = hass;

    if (!this._resolver) {
      this._resolver = new WeatherValueResolver(hass, this._config);
    } else {
      this._resolver.update(hass, this._config);
    }

    this._forecast.update(hass, this._config);
    this._updateForecastSubscriptions();
    this._scheduleRender();
  }

  get hass() {
    return this._hass;
  }

  disconnectedCallback() {
    this._forecast.disconnect();
  }

  _updateForecastSubscriptions() {
    const view = this._config.view || "overview";
    if (["temperature", "precipitation"].includes(view)) {
      this._forecast.ensure("hourly");
    }
    if (view === "forecast") {
      this._forecast.ensure("daily");
    }
  }

  getCardSize() {
    return this._config.view === "diagnostics" ? 5 : 4;
  }

  getGridOptions() {
    return { rows: 4, columns: 12, min_rows: 3, min_columns: 6 };
  }

  _scheduleRender() {
    if (this._scheduled) return;
    this._scheduled = true;

    queueMicrotask(() => {
      this._scheduled = false;
      this._render();
    });
  }

  _meta(reading, language) {
    if (
      !reading ||
      (!this._config.show_sources && !this._config.show_freshness)
    ) {
      return "";
    }

    const dot = this._config.show_freshness
      ? `<span class="dot ${freshnessClass(reading)}" title="${esc(
          tr(language, reading.freshness.status)
        )}"></span>`
      : "";

    const arrow =
      reading.fallbackLevel > 0
        ? '<span class="fallback">↳</span>'
        : "";

    const source = this._config.show_sources
      ? esc(reading.source)
      : "";

    return `<div class="meta">${dot}${arrow}${source}</div>`;
  }

  _formatReading(param, reading, language) {
    if (!reading) return "–";
    const meta = PARAM_META[param];

    if (param === "wind_bearing") {
      return `${windDirection(reading.value, language)} ${Math.round(
        reading.value
      )}°`;
    }

    return `${formatValue(
      reading.value,
      meta?.decimals ?? 1
    )} ${meta?.unit || ""}`.trim();
  }

  _tile(param, reading, language) {
    const meta = PARAM_META[param] || {};
    const moreInfo = reading?.entityId
      ? ` data-more-info="${esc(reading.entityId)}"`
      : "";

    return `
      <div class="tile"${moreInfo}>
        <div class="tile-head">
          <ha-icon icon="${meta.icon || "mdi:information-outline"}"></ha-icon>
          <span>${esc(tr(language, param))}</span>
        </div>
        <div class="tile-value">${esc(
          this._formatReading(param, reading, language)
        )}</div>
        ${this._meta(reading, language)}
      </div>
    `;
  }

  _overview(language) {
    const weatherState =
      this._hass?.states?.[this._config.weather_entity];

    if (!weatherState) {
      return `<div class="empty">${esc(
        tr(language, "no_data")
      )}: ${esc(this._config.weather_entity)}</div>`;
    }

    const provider = this._resolver.baseProvider();
    const temperature = this._resolver.resolve("temperature");
    const feelsLike = this._resolver.resolve("apparent_temperature");
    const humidity = this._resolver.resolve("humidity");
    const clouds = this._resolver.resolve("cloud_coverage");
    const wind = this._resolver.resolve("wind_speed");
    const visibility = this._resolver.resolve("visibility");
    const condition = weatherState.state;

    return `
      <div class="top">
        <div class="heading">
          <ha-icon
            class="hero-icon"
            icon="${iconForCondition(condition)}"
          ></ha-icon>
          <div>
            <div class="title">${esc(
              tr(language, "subtitle")
            )}</div>
            <div class="condition">${esc(
              tr(language, condition)
            )}</div>
          </div>
        </div>
        <div class="provider">${esc(provider.label)}</div>
      </div>

      <div class="main">
        <div>
          <div class="big">${esc(
            this._formatReading(
              "temperature",
              temperature,
              language
            )
          )}</div>
          <div class="secondary">
            ${feelsLike
              ? `${esc(tr(language, "apparent_temperature"))} ${esc(
                  this._formatReading(
                    "apparent_temperature",
                    feelsLike,
                    language
                  )
                )}`
              : ""}
          </div>
          ${this._meta(temperature, language)}
        </div>
      </div>

      <div class="grid">
        ${this._tile("humidity", humidity, language)}
        ${this._tile("cloud_coverage", clouds, language)}
        ${this._tile("wind_speed", wind, language)}
        ${this._tile("visibility", visibility, language)}
      </div>
    `;
  }

  _seriesMeta(series, language) {\n    if (!series || (!this._config.show_sources && !this._config.show_freshness)) return "";\n    const dot = this._config.show_freshness\n      ? `<span class="dot ${series.freshness?.status || "unknown"}" title="${esc(tr(language, series.freshness?.status || "unknown"))}"></span>`\n      : "";\n    const arrow = series.fallbackLevel > 0 ? `<span class="fallback">↳</span>` : "";\n    const source = this._config.show_sources ? esc(series.source) : "";\n    return `<div class="series-meta">${dot}${arrow}${source}</div>`;\n  }\n\n  _hourlySeries() {\n    const series = this._forecast.get("hourly");\n    if (!series) return null;\n    const cutoff = Date.now() - 45 * 60000;\n    return {\n      ...series,\n      forecast: series.forecast\n        .filter((entry) => Date.parse(entry.datetime) >= cutoff)\n        .slice(0, 12),\n    };\n  }\n\n  _temperatureForecast(language) {\n    const series = this._hourlySeries();\n    const values = (series?.forecast || []).filter((entry) => Number.isFinite(entry.temperature));\n    if (values.length < 2) return `<div class="empty">${esc(tr(language, "no_data"))}</div>`;\n\n    const width = 620;\n    const height = 178;\n    const left = 28;\n    const right = 28;\n    const top = 28;\n    const bottom = 40;\n    const temps = values.map((entry) => entry.temperature);\n    const min = Math.min(...temps);\n    const max = Math.max(...temps);\n    const span = Math.max(2, max - min);\n    const chartMin = min - 1;\n    const chartMax = max + 1;\n    const range = Math.max(2, chartMax - chartMin);\n    const plotWidth = width - left - right;\n    const plotHeight = height - top - bottom;\n\n    const points = values.map((entry, index) => {\n      const x = left + (index * plotWidth) / Math.max(1, values.length - 1);\n      const y = top + ((chartMax - entry.temperature) / range) * plotHeight;\n      const d = new Date(entry.datetime);\n      return {\n        x, y, value: entry.temperature,\n        time: d.toLocaleTimeString(language === "sv" ? "sv-SE" : "en-GB", { hour: "2-digit", minute: "2-digit" }),\n      };\n    });\n\n    const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");\n    const labels = points.map((p, index) => {\n      const show = index === 0 || index === points.length - 1 || index % 2 === 0;\n      if (!show) return `<circle cx="${p.x}" cy="${p.y}" r="3.2" fill="var(--primary-color)"/>`;\n      return `<circle cx="${p.x}" cy="${p.y}" r="3.7" fill="var(--primary-color)"/>\n        + `<text x="${p.x}" y="${p.y - 9}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--primary-text-color)">${Math.round(p.value)}°</text>`\n        + `<text x="${p.x}" y="${height - 12}" text-anchor="middle" font-size="9.5" fill="var(--secondary-text-color)">${esc(p.time)}</text>`;\n    }).join("");\n\n    return `<div class="forecast-head"><div class="section-title" style="margin:0"><ha-icon icon="mdi:thermometer"></ha-icon>${esc(tr(language, "view_temperature"))}</div><div class="forecast-sub">${esc(tr(language, "next_12_hours"))}</div></div>`\n      + `<svg class="temp-chart" viewBox="0 0 ${width} ${height}">`\n      + `<line x1="${left}" y1="${height-bottom}" x2="${width-right}" y2="${height-bottom}" stroke="var(--divider-color)" stroke-width="1"/>`\n      + `<polyline points="${polyline}" fill="none" stroke="var(--primary-color)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>${labels}</svg>`\n      + this._seriesMeta(series, language);\n  }\n\n  _precipitationForecast(language) {\n    const series = this._hourlySeries();\n    const values = series?.forecast || [];\n    if (!values.length) return `<div class="empty">${esc(tr(language, "no_data"))}</div>`;\n\n    const cells = values.map((entry) => {\n      const d = new Date(entry.datetime);\n      const time = d.toLocaleTimeString(language === "sv" ? "sv-SE" : "en-GB", { hour: "2-digit", minute: "2-digit" });\n      const probability = Number.isFinite(entry.precipitation_probability) ? `${Math.round(entry.precipitation_probability)} %` : "–";\n      const amount = Number.isFinite(entry.precipitation) ? `${formatValue(entry.precipitation, 1)} mm` : "–";\n      return `<div class="hour"><div class="hour-time">${esc(time)}</div><div class="hour-main">${esc(probability)}</div><div class="hour-sub">${esc(amount)}</div></div>`;\n    }).join("");\n\n    return `<div class="forecast-head"><div class="section-title" style="margin:0"><ha-icon icon="mdi:weather-rainy"></ha-icon>${esc(tr(language, "view_precipitation"))}</div><div class="forecast-sub">${esc(tr(language, "next_12_hours"))}</div></div>`\n      + `<div class="hours">${cells}</div>`\n      + this._seriesMeta(series, language);\n  }\n\n  _dailyForecast(language) {\n    const series = this._forecast.get("daily");\n    const values = (series?.forecast || []).slice(0, 7);\n    if (!values.length) return `<div class="empty">${esc(tr(language, "no_data"))}</div>`;\n\n    const locale = language === "sv" ? "sv-SE" : "en-GB";\n    const cells = values.map((entry, index) => {\n      const d = new Date(entry.datetime);\n      const name = index === 0\n        ? (language === "sv" ? "Idag" : "Today")\n        : d.toLocaleDateString(locale, { weekday: "short" }).replace(".", "");\n      const date = d.toLocaleDateString(locale, { day: "numeric", month: "numeric" });\n      const high = Number.isFinite(entry.temperature) ? `${Math.round(entry.temperature)}°` : "–";\n      const low = Number.isFinite(entry.templow) ? `${Math.round(entry.templow)}°` : "";\n      const rain = Number.isFinite(entry.precipitation_probability) ? `${Math.round(entry.precipitation_probability)} %` : "–";\n      return `<div class="day"><div class="day-name">${esc(name)}</div><div class="day-date">${esc(date)}</div><ha-icon icon="${iconForCondition(entry.condition)}"></ha-icon><div class="day-temp">${esc(high)}<span class="day-low">${esc(low)}</span></div><div class="hour-sub">💧 ${esc(rain)}</div></div>`;\n    }).join("");\n\n    return `<div class="forecast-head"><div class="section-title" style="margin:0"><ha-icon icon="mdi:calendar-week"></ha-icon>${esc(tr(language, "view_forecast"))}</div><div class="forecast-sub">${esc(tr(language, "today_plus_6"))}</div></div>`\n      + `<div class="forecast-days">${cells}</div>`\n      + this._seriesMeta(series, language);\n  }\n  _wind(language) {
    const wind = this._resolver.resolve("wind_speed");
    const gust = this._resolver.resolve("wind_gust");
    const bearing = this._resolver.resolve("wind_bearing");
    const pressure = this._resolver.resolve("pressure");
    const visibility = this._resolver.resolve("visibility");

    return `
      <div class="section-title">
        <ha-icon icon="mdi:weather-windy"></ha-icon>
        ${esc(tr(language, "view_wind"))}
      </div>
      <div class="grid">
        ${this._tile("wind_speed", wind, language)}
        ${this._tile("wind_gust", gust, language)}
        ${this._tile("wind_bearing", bearing, language)}
        ${this._tile("pressure", pressure, language)}
        ${this._tile("visibility", visibility, language)}
      </div>
    `;
  }

  _pressure(language) {
    const pressure = this._resolver.resolve("pressure");

    return `
      <div class="section-title">
        <ha-icon icon="mdi:gauge"></ha-icon>
        ${esc(tr(language, "view_pressure"))}
      </div>

      ${pressure
        ? `<div class="main"><div>
            <div class="big">${esc(
              this._formatReading("pressure", pressure, language)
            )}</div>
            ${this._meta(pressure, language)}
          </div></div>`
        : `<div class="empty">${esc(
            tr(language, "no_data")
          )}</div>`}

      <div class="footer">
        <span>Forecast-series resolver follows in the next dev iteration</span>
        <span>${VERSION}</span>
      </div>
    `;
  }

  _diagnostics(language) {
    const provider = this._resolver.baseProvider();

    const rows = PARAMS.map((param) => {
      const reading = this._resolver.resolve(param);

      return `
        <div class="diag-row">
          <div>
            <div class="diag-name">${esc(
              tr(language, param)
            )}</div>
            <div class="diag-sub">${esc(
              reading?.entityId || "—"
            )}</div>
          </div>
          <div class="diag-value">
            ${esc(
              this._formatReading(param, reading, language)
            )}
            ${this._meta(reading, language)}
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="section-title">
        <ha-icon icon="mdi:stethoscope"></ha-icon>
        ${esc(tr(language, "view_diagnostics"))}
      </div>
      <div class="secondary" style="margin-bottom:8px">
        Provider profile: <b>${esc(provider.label)}</b> · ${VERSION}
      </div>
      <div class="diag">${rows}</div>
    `;
  }

  _render() {
    if (
      !this._hass ||
      !this._config?.weather_entity ||
      !this._resolver
    ) {
      return;
    }

    const language = languageFor(this._hass);
    const view = this._config.view || "overview";

    let body;

    if (view === "temperature") body = this._temperatureForecast(language);
    else if (view === "precipitation") body = this._precipitationForecast(language);
    else if (view === "forecast") body = this._dailyForecast(language);
    else if (view === "wind") body = this._wind(language);
    else if (view === "pressure") body = this._pressure(language);
    else if (view === "diagnostics") body = this._diagnostics(language);
    else body = this._overview(language);

    this.shadowRoot.innerHTML =
      `<style>${CSS}</style><ha-card>${body}</ha-card>`;
  }
}
