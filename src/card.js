import { PARAM_META, PARAMS, formatValue, windDirection } from "./core.js";
import { languageFor, tr } from "./i18n.js";
import { WeatherValueResolver } from "./resolver.js";
import { ForecastSeriesManager } from "./forecast.js";
import {
  getSkyData,
  getRiskData,
  getAlertsData,
  getAirQualityData,
  getComparisonData,
} from "./extras.js";

const VERSION = "2026.11.0b5";

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
  .forecast-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}
  .forecast-sub{font-size:11px;color:var(--secondary-text-color)}
  .hours{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px}
  .hour{padding:8px 3px;border-radius:10px;background:var(--secondary-background-color);text-align:center;min-width:0}
  .hour-time{font-size:10px;color:var(--secondary-text-color)}
  .hour-main{font-size:15px;font-weight:650;margin-top:4px;white-space:nowrap}
  .hour-sub{font-size:9.5px;color:var(--secondary-text-color);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .forecast-days{display:flex;flex-wrap:wrap;justify-content:center;gap:7px}
  .day{flex:0 1 calc(25% - 6px);box-sizing:border-box;padding:10px 5px;border-radius:12px;background:var(--secondary-background-color);text-align:center;min-width:0}
  .day ha-icon{--mdc-icon-size:29px;color:var(--primary-color);margin:7px 0 3px}
  .day-name{font-size:12px;font-weight:650}
  .day-date{font-size:9.5px;color:var(--secondary-text-color);margin-top:1px}
  .day-temp{font-size:16px;font-weight:650;margin-top:5px}
  .day-low{font-size:12px;color:var(--secondary-text-color);font-weight:400;margin-left:3px}
  .series-meta{display:flex;align-items:center;justify-content:flex-end;gap:5px;font-size:9.5px;color:var(--secondary-text-color);margin-top:9px}
  .temp-chart{width:100%;height:auto;display:block;overflow:visible;margin-top:4px}
  .extra-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
  .extra-tile{padding:12px;border-radius:12px;background:var(--secondary-background-color);min-width:0}
  .extra-title{display:flex;align-items:center;gap:7px;font-size:11px;color:var(--secondary-text-color)}
  .extra-title ha-icon{--mdc-icon-size:20px;color:var(--primary-color)}
  .extra-value{font-size:20px;font-weight:650;margin-top:6px}
  .extra-sub{font-size:10px;color:var(--secondary-text-color);margin-top:4px;line-height:1.35}
  .risk-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
  .risk-card{padding:12px;border-radius:12px;background:var(--secondary-background-color);min-width:0}
  .risk-icon{--mdc-icon-size:25px;margin-bottom:7px}
  .risk-name{font-size:11px;color:var(--secondary-text-color)}
  .risk-state{font-size:17px;font-weight:650;margin-top:4px}
  .alert-list{display:grid;gap:8px}
  .alert-item{display:grid;grid-template-columns:34px minmax(0,1fr);gap:9px;padding:11px;border-radius:12px;background:var(--secondary-background-color);border-left:5px solid var(--divider-color)}
  .alert-item ha-icon{--mdc-icon-size:25px;margin-top:2px}
  .alert-title{font-size:13px;font-weight:650;line-height:1.25}
  .alert-sub{font-size:10px;color:var(--secondary-text-color);line-height:1.35;margin-top:4px}
  .aqi-hero{display:grid;grid-template-columns:105px minmax(0,1fr);gap:14px;align-items:center;padding:14px;border-radius:12px;background:var(--secondary-background-color)}
  .aqi-number{font-size:38px;font-weight:700;text-align:center}
  .pollutants{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px;margin-top:9px}
  .pollutant{padding:10px 4px;border-radius:11px;background:var(--secondary-background-color);text-align:center}
  .pollutant strong{display:block;font-size:15px;margin-top:4px}
  .comparison-wrap{overflow-x:auto}
  .comparison{width:100%;border-collapse:collapse;font-size:11px}
  .comparison th,.comparison td{padding:7px 5px;border-top:1px solid var(--divider-color);text-align:right;white-space:nowrap}
  .comparison th:first-child,.comparison td:first-child{text-align:left}
  .comparison thead th{border-top:0;color:var(--secondary-text-color);font-weight:600}
  .consensus-row{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}
  .consensus-chip{padding:7px 9px;border-radius:10px;background:var(--secondary-background-color);font-size:11px}
  .pressure-main .big{font-size:34px}
  @media(max-width:420px){ha-card{padding:13px}.big{font-size:34px}.hero-icon{--mdc-icon-size:46px}.day{flex-basis:calc(50% - 5px)}.risk-grid{grid-template-columns:1fr}.pollutants{grid-template-columns:repeat(2,minmax(0,1fr))}}
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

function tintBackground(tint, base = "var(--secondary-background-color)") {
  return `linear-gradient(${tint}, ${tint}), ${base}`;
}

function uvVisual(value) {
  if (!Number.isFinite(value)) {
    return { color: "#78909c", tint: "rgba(120,144,156,0.08)" };
  }
  if (value < 3) return { color: "#43a047", tint: "rgba(67,160,71,0.10)" };
  if (value < 6) return { color: "#f9a825", tint: "rgba(249,168,37,0.11)" };
  if (value < 8) return { color: "#fb8c00", tint: "rgba(251,140,0,0.12)" };
  if (value < 11) return { color: "#e53935", tint: "rgba(229,57,53,0.12)" };
  return { color: "#8e24aa", tint: "rgba(142,36,170,0.13)" };
}

function auroraVisual(value) {
  if (!Number.isFinite(value)) {
    return { color: "#78909c", tint: "rgba(120,144,156,0.08)" };
  }
  if (value < 5) return { color: "#9575cd", tint: "rgba(149,117,205,0.08)" };
  if (value < 20) return { color: "#7e57c2", tint: "rgba(126,87,194,0.10)" };
  if (value < 40) return { color: "#5e35b1", tint: "rgba(94,53,177,0.12)" };
  if (value < 70) return { color: "#00897b", tint: "rgba(0,137,123,0.12)" };
  return { color: "#43a047", tint: "rgba(67,160,71,0.14)" };
}

function frostTint(level, known = true) {
  if (!known) return "rgba(120,144,156,0.03)";
  return [
    "rgba(67,160,71,0.030)",
    "rgba(3,155,229,0.045)",
    "rgba(251,140,0,0.055)",
    "rgba(229,57,53,0.060)",
  ][Math.max(0, Math.min(3, Number(level) || 0))];
}

function fireTint(value, known = true) {
  if (!known || !Number.isFinite(value)) return "rgba(120,144,156,0.03)";
  if (value >= 30) return "rgba(198,40,40,0.060)";
  if (value >= 20) return "rgba(229,57,53,0.055)";
  if (value >= 10) return "rgba(251,140,0,0.050)";
  if (value >= 5) return "rgba(249,168,37,0.045)";
  return "rgba(67,160,71,0.030)";
}

function thunderTint(value, active, known = true) {
  if (!known) return "rgba(120,144,156,0.03)";
  if (!active) return "rgba(67,160,71,0.030)";
  if (!Number.isFinite(value)) return "rgba(251,140,0,0.050)";
  if (value >= 70) return "rgba(229,57,53,0.060)";
  if (value >= 40) return "rgba(251,140,0,0.055)";
  return "rgba(249,168,37,0.045)";
}

function alertTint(data) {
  if (!data?.available) return "rgba(120,144,156,0.03)";
  if (data.warnings > 0) {
    const severity = String(data.severity || "").toUpperCase();
    if (["RED", "RÖD"].includes(severity)) return "rgba(229,57,53,0.055)";
    if (severity === "ORANGE") return "rgba(251,140,0,0.050)";
    return "rgba(255,179,0,0.045)";
  }
  if (data.messagesCount > 0) return "rgba(120,144,156,0.035)";
  return "rgba(67,160,71,0.025)";
}

function aqiTint(value) {
  if (!Number.isFinite(value)) return "rgba(120,144,156,0.03)";
  if (value <= 50) return "rgba(67,160,71,0.045)";
  if (value <= 100) return "rgba(249,168,37,0.045)";
  if (value <= 150) return "rgba(251,140,0,0.050)";
  if (value <= 200) return "rgba(229,57,53,0.055)";
  if (value <= 300) return "rgba(142,36,170,0.055)";
  return "rgba(127,29,29,0.060)";
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
      dynamic_backgrounds: true,
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
    if (["temperature", "precipitation", "pressure", "risks"].includes(view)) {
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
    return {
      columns: 12,
      rows: "auto",
      min_columns: 6,
    };
  }

  _scheduleRender() {
    if (this._scheduled) return;
    this._scheduled = true;

    queueMicrotask(() => {
      this._scheduled = false;
      this._render();
    });
  }

  _meta(reading, language, compact = false) {
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

    const baseLabel = this._resolver?.baseProvider()?.label;
    const hideRepeatedSource =
      compact &&
      reading.fallbackLevel === 0 &&
      reading.source === baseLabel;

    const source =
      this._config.show_sources && !hideRepeatedSource
        ? esc(reading.source)
        : "";

    if (!dot && !arrow && !source) return "";

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
        ${this._meta(reading, language, true)}
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
          ${this._meta(temperature, language, true)}
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

  _seriesMeta(series, language) {
    if (!series || (!this._config.show_sources && !this._config.show_freshness)) return "";
    const dot = this._config.show_freshness
      ? `<span class="dot ${series.freshness?.status || "unknown"}" title="${esc(tr(language, series.freshness?.status || "unknown"))}"></span>`
      : "";
    const arrow = series.fallbackLevel > 0 ? `<span class="fallback">↳</span>` : "";
    const source = this._config.show_sources ? esc(series.source) : "";
    return `<div class="series-meta">${dot}${arrow}${source}</div>`;
  }

  _hourlySeries() {
    const series = this._forecast.get("hourly");
    if (!series) return null;
    const cutoff = Date.now() - 45 * 60000;
    return {
      ...series,
      forecast: series.forecast
        .filter((entry) => Date.parse(entry.datetime) >= cutoff)
        .slice(0, 12),
    };
  }

  _temperatureForecast(language) {
    const series = this._hourlySeries();
    const values = (series?.forecast || []).filter((entry) => Number.isFinite(entry.temperature));
    if (values.length < 2) return `<div class="empty">${esc(tr(language, "no_data"))}</div>`;

    const width = 620;
    const height = 190;
    const left = 28;
    const right = 28;
    const top = 38;
    const bottom = 40;
    const temps = values.map((entry) => entry.temperature);
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    const span = Math.max(2, max - min);
    const chartMin = min - 1;
    const chartMax = max + 1;
    const range = Math.max(2, chartMax - chartMin);
    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;

    const points = values.map((entry, index) => {
      const x = left + (index * plotWidth) / Math.max(1, values.length - 1);
      const y = top + ((chartMax - entry.temperature) / range) * plotHeight;
      const d = new Date(entry.datetime);
      return {
        x, y, value: entry.temperature,
        time: d.toLocaleTimeString(language === "sv" ? "sv-SE" : "en-GB", { hour: "2-digit", minute: "2-digit" }),
      };
    });

    const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
    const labels = points.map((p, index) => {
      const show = index === 0 || index === points.length - 1 || index % 2 === 0;
      if (!show) return `<circle cx="${p.x}" cy="${p.y}" r="3.2" fill="var(--primary-color)"/>`;
      return `<circle cx="${p.x}" cy="${p.y}" r="3.7" fill="var(--primary-color)"/>`
        + `<text x="${p.x}" y="${p.y - 9}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--primary-text-color)">${Math.round(p.value)}°</text>`
        + `<text x="${p.x}" y="${height - 12}" text-anchor="middle" font-size="9.5" fill="var(--secondary-text-color)">${esc(p.time)}</text>`;
    }).join("");

    return `<div class="forecast-head"><div class="section-title" style="margin:0"><ha-icon icon="mdi:thermometer"></ha-icon>${esc(tr(language, "view_temperature"))}</div><div class="forecast-sub">${esc(tr(language, "next_12_hours"))}</div></div>`
      + `<svg class="temp-chart" viewBox="0 0 ${width} ${height}">`
      + `<line x1="${left}" y1="${height-bottom}" x2="${width-right}" y2="${height-bottom}" stroke="var(--divider-color)" stroke-width="1"/>`
      + `<polyline points="${polyline}" fill="none" stroke="var(--primary-color)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>${labels}</svg>`
      + this._seriesMeta(series, language);
  }

  _precipitationForecast(language) {
    const series = this._hourlySeries();
    const values = series?.forecast || [];
    if (!values.length) return `<div class="empty">${esc(tr(language, "no_data"))}</div>`;

    const cells = values.map((entry) => {
      const d = new Date(entry.datetime);
      const time = d.toLocaleTimeString(language === "sv" ? "sv-SE" : "en-GB", { hour: "2-digit", minute: "2-digit" });
      const probability = Number.isFinite(entry.precipitation_probability) ? `${Math.round(entry.precipitation_probability)} %` : "–";
      const amount = Number.isFinite(entry.precipitation) ? `${formatValue(entry.precipitation, 1)} mm` : "–";
      return `<div class="hour"><div class="hour-time">${esc(time)}</div><div class="hour-main">${esc(probability)}</div><div class="hour-sub">${esc(amount)}</div></div>`;
    }).join("");

    return `<div class="forecast-head"><div class="section-title" style="margin:0"><ha-icon icon="mdi:weather-rainy"></ha-icon>${esc(tr(language, "view_precipitation"))}</div><div class="forecast-sub">${esc(tr(language, "next_12_hours"))}</div></div>`
      + `<div class="hours">${cells}</div>`
      + this._seriesMeta(series, language);
  }

  _dailyForecast(language) {
    const series = this._forecast.get("daily");
    const values = (series?.forecast || []).slice(0, 7);
    if (!values.length) return `<div class="empty">${esc(tr(language, "no_data"))}</div>`;

    const locale = language === "sv" ? "sv-SE" : "en-GB";
    const cells = values.map((entry, index) => {
      const d = new Date(entry.datetime);
      const name = index === 0
        ? (language === "sv" ? "Idag" : "Today")
        : d.toLocaleDateString(locale, { weekday: "short" }).replace(".", "");
      const date = d.toLocaleDateString(locale, { day: "numeric", month: "numeric" });
      const high = Number.isFinite(entry.temperature) ? `${Math.round(entry.temperature)}°` : "–";
      const low = Number.isFinite(entry.templow) ? `${Math.round(entry.templow)}°` : "";
      const rain = Number.isFinite(entry.precipitation_probability) ? `${Math.round(entry.precipitation_probability)} %` : "–";
      return `<div class="day"><div class="day-name">${esc(name)}</div><div class="day-date">${esc(date)}</div><ha-icon icon="${iconForCondition(entry.condition)}"></ha-icon><div class="day-temp">${esc(high)}<span class="day-low">${esc(low)}</span></div><div class="hour-sub">💧 ${esc(rain)}</div></div>`;
    }).join("");

    return `<div class="forecast-head"><div class="section-title" style="margin:0"><ha-icon icon="mdi:calendar-week"></ha-icon>${esc(tr(language, "view_forecast"))}</div><div class="forecast-sub">${esc(tr(language, "today_plus_6"))}</div></div>`
      + `<div class="forecast-days">${cells}</div>`
      + this._seriesMeta(series, language);
  }
  _wind(language) {
    const wind = this._resolver.resolve("wind_speed");
    const gust = this._resolver.resolve("wind_gust");
    const bearing = this._resolver.resolve("wind_bearing");
    const pressure = this._resolver.resolve("pressure");
    const visibility = this._resolver.resolve("visibility");
    const humidity = this._resolver.resolve("humidity");

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
        ${this._tile("humidity", humidity, language)}
      </div>
    `;
  }

  _pressure(language) {
    const pressure = this._resolver.resolve("pressure");
    const series = this._hourlySeries();
    const values = (series?.forecast || [])
      .filter((entry) => Number.isFinite(entry.pressure));

    let chart = "";

    if (values.length >= 2) {
      const width = 620;
      const height = 150;
      const left = 28;
      const right = 28;
      const top = 22;
      const bottom = 34;
      const pressures = values.map((entry) => entry.pressure);
      const min = Math.min(...pressures);
      const max = Math.max(...pressures);
      const chartMin = min - 1;
      const chartMax = max + 1;
      const range = Math.max(2, chartMax - chartMin);
      const plotWidth = width - left - right;
      const plotHeight = height - top - bottom;

      const points = values.map((entry, index) => {
        const x =
          left +
          (index * plotWidth) /
            Math.max(1, values.length - 1);
        const y =
          top +
          ((chartMax - entry.pressure) / range) *
            plotHeight;
        const time = new Date(entry.datetime)
          .toLocaleTimeString(
            language === "sv" ? "sv-SE" : "en-GB",
            { hour: "2-digit", minute: "2-digit" }
          );

        return { x, y, value: entry.pressure, time };
      });

      const polyline = points
        .map((point) => `${point.x},${point.y}`)
        .join(" ");

      const labels = points
        .map((point, index) => {
          const show =
            index === 0 ||
            index === points.length - 1 ||
            index % 3 === 0;

          if (!show) {
            return `<circle cx="${point.x}" cy="${point.y}" r="3" fill="var(--primary-color)"/>`;
          }

          return `<circle cx="${point.x}" cy="${point.y}" r="3.5" fill="var(--primary-color)"/>`
            + `<text x="${point.x}" y="${point.y - 8}" text-anchor="middle" font-size="10" font-weight="600" fill="var(--primary-text-color)">${Math.round(point.value)}</text>`
            + `<text x="${point.x}" y="${height - 10}" text-anchor="middle" font-size="9" fill="var(--secondary-text-color)">${esc(point.time)}</text>`;
        })
        .join("");

      chart =
        `<div class="forecast-sub">${esc(
          tr(language, "next_12_hours")
        )} · ${Math.round(min)}–${Math.round(max)} mbar</div>`
        + `<svg class="temp-chart" viewBox="0 0 ${width} ${height}">`
        + `<line x1="${left}" y1="${height-bottom}" x2="${width-right}" y2="${height-bottom}" stroke="var(--divider-color)" stroke-width="1"/>`
        + `<polyline points="${polyline}" fill="none" stroke="var(--primary-color)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>${labels}</svg>`
        + this._seriesMeta(series, language);
    }

    return `
      <div class="section-title">
        <ha-icon icon="mdi:gauge"></ha-icon>
        ${esc(tr(language, "view_pressure"))}
      </div>

      ${pressure
        ? `<div class="main pressure-main"><div>
            <div class="big">${esc(
              this._formatReading("pressure", pressure, language)
            )}</div>
            ${this._meta(pressure, language)}
          </div></div>`
        : `<div class="empty">${esc(
            tr(language, "no_data")
          )}</div>`}

      ${chart}

      <div class="footer">
        <span></span>
        <span>${VERSION}</span>
      </div>
    `;
  }

  _tint(tint, base = "var(--secondary-background-color)") {
    return this._config.dynamic_backgrounds === false
      ? base
      : tintBackground(tint, base);
  }

  _extraMeta(item, language) {
    if (!item) return "";
    const dot = this._config.show_freshness
      ? `<span class="dot ${item.freshness?.status || "unknown"}"></span>`
      : "";
    const source = this._config.show_sources
      ? esc(item.source || "")
      : "";
    if (!dot && !source) return "";
    return `<div class="meta">${dot}${source}</div>`;
  }

  _sky(language) {
    const data = getSkyData(this._hass, this._config);
    const sunUp = data.sun?.state === "above_horizon";
    const eventRaw = sunUp
      ? data.sun?.nextSetting
      : data.sun?.nextRising;
    const event = eventRaw
      ? new Date(eventRaw).toLocaleTimeString(
          language === "sv" ? "sv-SE" : "en-GB",
          { hour: "2-digit", minute: "2-digit" }
        )
      : "–";

    const uv = data.uv?.value;
    const uvLabel = !Number.isFinite(uv)
      ? tr(language, "missing")
      : uv < 3
        ? tr(language, "uv_low")
        : uv < 6
          ? tr(language, "uv_moderate")
          : uv < 8
            ? tr(language, "uv_high")
            : uv < 11
              ? tr(language, "uv_very_high")
              : tr(language, "uv_extreme");

    const aurora = data.aurora?.value;
    const uvStyle = uvVisual(uv);
    const auroraStyle = auroraVisual(aurora);
    const auroraLabel = !Number.isFinite(aurora)
      ? tr(language, "missing")
      : aurora < 5
        ? tr(language, "aurora_very_low")
        : aurora < 20
          ? tr(language, "aurora_low")
          : aurora < 40
            ? tr(language, "aurora_possible")
            : aurora < 70
              ? tr(language, "aurora_good")
              : tr(language, "aurora_very_good");

    const moonMap = {
      new_moon: ["mdi:moon-new", "moon_new"],
      waxing_crescent: ["mdi:moon-waxing-crescent", "moon_waxing_crescent"],
      first_quarter: ["mdi:moon-first-quarter", "moon_first_quarter"],
      waxing_gibbous: ["mdi:moon-waxing-gibbous", "moon_waxing_gibbous"],
      full_moon: ["mdi:moon-full", "moon_full"],
      waning_gibbous: ["mdi:moon-waning-gibbous", "moon_waning_gibbous"],
      last_quarter: ["mdi:moon-last-quarter", "moon_last_quarter"],
      waning_crescent: ["mdi:moon-waning-crescent", "moon_waning_crescent"],
    };
    const moonInfo =
      moonMap[data.moon?.phase] ||
      ["mdi:moon-waning-crescent", "missing"];

    return `
      <div class="section-title">
        <ha-icon icon="mdi:weather-sunset"></ha-icon>
        ${esc(tr(language, "view_sky"))}
      </div>

      <div class="extra-grid">
        <div class="extra-tile" style="background:${this._tint(sunUp ? "rgba(249,168,37,0.08)" : "rgba(126,87,194,0.08)")}"${data.sun?.entityId ? ` data-more-info="${esc(data.sun.entityId)}"` : ""}>
          <div class="extra-title"><ha-icon icon="${sunUp ? "mdi:white-balance-sunny" : "mdi:weather-night"}"></ha-icon>${esc(tr(language, "sun"))}</div>
          <div class="extra-value">${esc(sunUp ? tr(language, "sun_up") : tr(language, "sun_down"))}</div>
          <div class="extra-sub">${esc(sunUp ? tr(language, "sunset") : tr(language, "sunrise"))}: ${esc(event)}${Number.isFinite(data.sun?.elevation) ? ` · ${data.sun.elevation.toFixed(1)}°` : ""}</div>
          ${this._extraMeta(data.sun, language)}
        </div>

        <div class="extra-tile" style="background:${this._tint("rgba(92,107,192,0.08)")}"${data.moon?.entityId ? ` data-more-info="${esc(data.moon.entityId)}"` : ""}>
          <div class="extra-title"><ha-icon icon="${moonInfo[0]}"></ha-icon>${esc(tr(language, "moon"))}</div>
          <div class="extra-value">${esc(tr(language, moonInfo[1]))}</div>
          <div class="extra-sub">${esc(tr(language, "moon_phase"))}</div>
          ${this._extraMeta(data.moon, language)}
        </div>

        <div class="extra-tile" style="background:${this._tint(uvStyle.tint)}"${data.uv?.entityId ? ` data-more-info="${esc(data.uv.entityId)}"` : ""}>
          <div class="extra-title"><ha-icon icon="mdi:weather-sunny-alert" style="color:${uvStyle.color}"></ha-icon>UV-index</div>
          <div class="extra-value">${Number.isFinite(uv) ? esc(formatValue(uv, 1)) : "–"}</div>
          <div class="extra-sub" style="color:${uvStyle.color};font-weight:600">${esc(uvLabel)}</div>
          ${this._extraMeta(data.uv, language)}
        </div>

        <div class="extra-tile" style="background:${this._tint(auroraStyle.tint)}"${data.aurora?.entityId ? ` data-more-info="${esc(data.aurora.entityId)}"` : ""}>
          <div class="extra-title"><ha-icon icon="mdi:aurora" style="color:${auroraStyle.color}"></ha-icon>${esc(tr(language, "aurora"))}</div>
          <div class="extra-value">${Number.isFinite(aurora) ? `${Math.round(aurora)} %` : "–"}</div>
          <div class="extra-sub" style="color:${auroraStyle.color};font-weight:600">${esc(auroraLabel)}</div>
          ${this._extraMeta(data.aurora, language)}
        </div>
      </div>
    `;
  }

  _risks(language) {
    const hourly = this._hourlySeries();
    const data = getRiskData(
      this._hass,
      this._config,
      hourly
    );

    const frostLabels = [
      ["mdi:shield-check-outline", "risk_none"],
      ["mdi:snowflake-thermometer", "risk_low"],
      ["mdi:snowflake-alert", "risk_elevated"],
      ["mdi:car-brake-alert", "risk_high"],
    ];
    const frostInfo =
      frostLabels[data.frost.level] || frostLabels[0];

    const frostKnown = data.frost.available === true;
    const fireKnown = data.fire.available === true;
    const thunderKnown = data.thunder.available === true;

    const frostText = !frostKnown
      ? tr(language, "missing")
      : tr(language, frostInfo[1]);

    const fireText = !fireKnown
      ? tr(language, "missing")
      : data.fire.active
        ? tr(language, "risk_relevant")
        : tr(language, "risk_not_relevant");

    const thunderText = !thunderKnown
      ? tr(language, "missing")
      : data.thunder.active
        ? tr(language, "risk_relevant")
        : tr(language, "risk_not_relevant");

    return `
      <div class="section-title">
        <ha-icon icon="mdi:shield-alert-outline"></ha-icon>
        ${esc(tr(language, "view_risks"))}
      </div>
      <div class="risk-grid">
        <div class="risk-card" style="background:${this._tint(frostTint(data.frost.level, frostKnown))}"${data.frost.entityId ? ` data-more-info="${esc(data.frost.entityId)}"` : ""}>
          <ha-icon class="risk-icon" icon="${frostInfo[0]}"></ha-icon>
          <div class="risk-name">${esc(tr(language, "frost_ice"))}</div>
          <div class="risk-state">${esc(frostText)}</div>
          <div class="extra-sub">${Number.isFinite(data.frost.minTemp) ? `${esc(tr(language, "minimum"))}: ${formatValue(data.frost.minTemp, 1)} °C` : ""}</div>
          ${this._extraMeta(data.frost, language)}
        </div>

        <div class="risk-card" style="background:${this._tint(thunderTint(data.thunder.value, data.thunder.active, thunderKnown))}"${data.thunder.entityId ? ` data-more-info="${esc(data.thunder.entityId)}"` : ""}>
          <ha-icon class="risk-icon" icon="mdi:weather-lightning"></ha-icon>
          <div class="risk-name">${esc(tr(language, "thunder"))}</div>
          <div class="risk-state">${esc(thunderText)}</div>
          <div class="extra-sub">${Number.isFinite(data.thunder.value) ? `${Math.round(data.thunder.value)} %` : ""}</div>
          ${this._extraMeta(data.thunder, language)}
        </div>

        <div class="risk-card" style="background:${this._tint(fireTint(data.fire.index, fireKnown))}"${data.fire.entityId ? ` data-more-info="${esc(data.fire.entityId)}"` : ""}>
          <ha-icon class="risk-icon" icon="mdi:fire-alert"></ha-icon>
          <div class="risk-name">${esc(tr(language, "fire_risk"))}</div>
          <div class="risk-state">${esc(fireText)}</div>
          <div class="extra-sub">${Number.isFinite(data.fire.index) ? `${esc(tr(language, "index"))}: ${formatValue(data.fire.index, 0)}` : ""}</div>
          ${this._extraMeta(data.fire, language)}
        </div>
      </div>
    `;
  }

  _alerts(language) {
    const data = getAlertsData(
      this._hass,
      this._config
    );

    const severityInfo = (item) => {
      const level = String(
        item?.code ||
        item?.severity ||
        item?.level ||
        ""
      ).toUpperCase();

      if (["RED", "RÖD"].includes(level)) {
        return ["#e53935", "mdi:alert-octagon", "Röd"];
      }
      if (level === "ORANGE") {
        return ["#fb8c00", "mdi:alert", "Orange"];
      }
      if (["YELLOW", "GUL"].includes(level)) {
        return ["#ffb300", "mdi:alert-outline", "Gul"];
      }
      return ["#78909c", "mdi:information-outline", tr(language, "message")];
    };

    const eventIcons = {
      THUNDER: "mdi:weather-lightning",
      WIND: "mdi:weather-windy",
      SNOW: "mdi:weather-snowy-heavy",
      BLACK_ICE: "mdi:car-brake-alert",
      RAIN: "mdi:weather-pouring",
      FIRE: "mdi:fire-alert",
      HIGH_TEMPERATURES: "mdi:thermometer-high",
      FLOODING: "mdi:home-flood",
    };

    const cards = data.messages
      .slice(0, 3)
      .map((item) => {
        const severity = severityInfo(item);
        const title =
          item.event_description_sv ||
          item.descr ||
          item.event_sv ||
          item.event ||
          tr(language, "smhi_message");
        const area =
          item.area_name_sv ||
          item.area ||
          "";
        const icon =
          eventIcons[item.event_code] ||
          severity[1];
        const descriptions =
          Array.isArray(item.description_items)
            ? item.description_items
            : [];
        const preferred =
          descriptions.find((x) => x.code === "HAPPENS") ||
          descriptions.find((x) => x.code === "INCIDENT");
        const description =
          preferred?.text_sv ||
          preferred?.text ||
          "";

        return `
          <div class="alert-item" style="border-left-color:${severity[0]}">
            <ha-icon icon="${icon}" style="color:${severity[0]}"></ha-icon>
            <div>
              <div class="alert-title">${esc(title)}</div>
              <div class="alert-sub"><b style="color:${severity[0]}">${esc(severity[2])}</b>${area ? ` · ${esc(area)}` : ""}</div>
              ${description ? `<div class="alert-sub">${esc(description)}</div>` : ""}
            </div>
          </div>
        `;
      })
      .join("");

    const empty = data.available
      ? `
          <div class="alert-item" style="border-left-color:var(--success-color,#43a047)">
            <ha-icon icon="mdi:check-circle-outline" style="color:var(--success-color,#43a047)"></ha-icon>
            <div><div class="alert-title">${esc(tr(language, "no_active_alerts"))}</div></div>
          </div>
        `
      : `
          <div class="alert-item">
            <ha-icon icon="mdi:help-circle-outline"></ha-icon>
            <div><div class="alert-title">${esc(tr(language, "missing"))}</div></div>
          </div>
        `;

    return `
      <div class="module-tint" style="background:${this._tint(alertTint(data), "transparent")};border-radius:12px;padding:2px">
      <div class="section-title">
        <ha-icon icon="mdi:hazard-lights"></ha-icon>
        ${esc(tr(language, "view_alerts"))}
      </div>
      <div class="forecast-sub" style="margin-bottom:10px">
        ${data.warnings} ${esc(tr(language, "warnings"))} ·
        ${data.messagesCount} ${esc(tr(language, "messages"))}
        ${data.severity ? ` · ${esc(data.severity)}` : ""}
      </div>
      <div class="alert-list">
        ${cards || empty}
      </div>
      ${this._extraMeta(data, language)}
      </div>
    `;
  }

  _airQuality(language) {
    const data = getAirQualityData(
      this._hass,
      this._config
    );

    const aqi = data.aqi;
    const info = !Number.isFinite(aqi)
      ? [tr(language, "missing"), "#78909c"]
      : aqi <= 50
        ? [tr(language, "aqi_good"), "#43a047"]
        : aqi <= 100
          ? [tr(language, "aqi_moderate"), "#f9a825"]
          : aqi <= 150
            ? [tr(language, "aqi_sensitive"), "#fb8c00"]
            : aqi <= 200
              ? [tr(language, "aqi_unhealthy"), "#e53935"]
              : aqi <= 300
                ? [tr(language, "aqi_very_unhealthy"), "#8e24aa"]
                : [tr(language, "aqi_hazardous"), "#7f1d1d"];

    const pollutantName = (value) => {
      const map = {
        o3: "O₃",
        no2: "NO₂",
        so2: "SO₂",
        co: "CO",
        pm10: "PM10",
        pm25: "PM2.5",
        neph: "NEPH",
      };
      const key = String(value || "")
        .toLowerCase()
        .trim();
      return map[key] || value || "–";
    };

    const pollutant = (label, value) => `
      <div class="pollutant">
        <span class="extra-sub">${label}</span>
        <strong>${Number.isFinite(value) ? esc(formatValue(value, Number.isInteger(value) ? 0 : 1)) : "–"}</strong>
      </div>
    `;

    return `
      <div class="module-tint" style="background:${this._tint(aqiTint(aqi), "transparent")};border-radius:12px;padding:2px">
      <div class="section-title">
        <ha-icon icon="mdi:air-filter"></ha-icon>
        ${esc(tr(language, "view_air_quality"))}
      </div>
      <div class="aqi-hero"${data.entities.aqi ? ` data-more-info="${esc(data.entities.aqi)}"` : ""}>
        <div>
          <div class="aqi-number" style="color:${info[1]}">${Number.isFinite(aqi) ? Math.round(aqi) : "–"}</div>
          <div class="extra-sub" style="text-align:center">AQI</div>
        </div>
        <div>
          <div class="extra-value" style="color:${info[1]}">${esc(info[0])}</div>
          <div class="extra-sub">${esc(tr(language, "dominant_pollutant"))}</div>
          <div style="font-size:15px;font-weight:650;margin-top:3px">${esc(pollutantName(data.dominant))}</div>
        </div>
      </div>
      <div class="pollutants">
        ${pollutant("O₃", data.o3)}
        ${pollutant("NO₂", data.no2)}
        ${pollutant("PM2.5", data.pm25)}
        ${pollutant("PM10", data.pm10)}
      </div>
      ${data.station ? `<div class="extra-sub" style="margin-top:8px">${esc(data.station)}</div>` : ""}
      ${this._extraMeta(data, language)}
      </div>
    `;
  }

  _comparison(language) {
    const data = getComparisonData(
      this._hass,
      this._config
    );

    const consensus = [];
    if (data.consensus.temperature) {
      consensus.push(
        `<div class="consensus-chip"><b>${esc(tr(language, "consensus_temperature"))}</b> ${formatValue(data.consensus.temperature.value, 1)} °C</div>`
      );
    }
    if (data.consensus.wind) {
      consensus.push(
        `<div class="consensus-chip"><b>${esc(tr(language, "consensus_wind"))}</b> ${formatValue(data.consensus.wind.value, 1)} m/s</div>`
      );
    }

    const f = (value, decimals = 1) =>
      Number.isFinite(value)
        ? formatValue(value, decimals)
        : "–";

    const rows = data.providers.map((provider) => `
      <tr data-more-info="${esc(provider.entityId)}">
        <td>
          <span class="dot ${provider.freshness?.status || "unknown"}"></span>
          ${esc(provider.source)}
          ${provider.modelFamily ? `<div class="diag-sub">${esc(provider.modelFamily)}${provider.implementation ? ` · ${esc(provider.implementation)}` : ""}</div>` : ""}
        </td>
        <td>${f(provider.values.temperature, 1)}°</td>
        <td>${f(provider.values.wind_speed, 1)}</td>
        <td>${f(provider.values.pressure, 0)}</td>
        <td>${f(provider.values.cloud_coverage, 0)}%</td>
      </tr>
    `).join("");

    return `
      <div class="section-title">
        <ha-icon icon="mdi:compare-horizontal"></ha-icon>
        ${esc(tr(language, "view_comparison"))}
      </div>
      ${consensus.length ? `<div class="consensus-row">${consensus.join("")}</div>` : ""}
      <div class="comparison-wrap">
      <table class="comparison">
        <thead>
          <tr>
            <th>${esc(tr(language, "source"))}</th>
            <th>°C</th>
            <th>m/s</th>
            <th>mbar</th>
            <th>% ☁</th>
          </tr>
        </thead>
        <tbody>
          ${rows || `<tr><td colspan="5">${esc(tr(language, "no_data"))}</td></tr>`}
        </tbody>
      </table>
      </div>
    `;
  }

  _diagnostics(language) {
    const provider = this._resolver.baseProvider();
    const resolved = PARAMS.map((param) => ({
      param,
      reading: this._resolver.resolve(param),
    }));
    const available = resolved.filter(
      (item) => item.reading
    ).length;

    const rows = resolved.map(({ param, reading }) => {
      const value = reading
        ? esc(
            this._formatReading(
              param,
              reading,
              language
            )
          )
        : `<span style="color:var(--secondary-text-color)">${esc(
            tr(language, "missing")
          )}</span>`;

      const provenance = reading
        ? this._meta(reading, language)
        : '<div class="meta"><span class="dot unknown"></span></div>';

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
            ${value}
            ${provenance}
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
        ${esc(tr(language, "data_coverage"))}: <b>${available}/${PARAMS.length}</b>
        · ${esc(provider.label)} · ${VERSION}
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
    else if (view === "sky") body = this._sky(language);
    else if (view === "risks") body = this._risks(language);
    else if (view === "alerts") body = this._alerts(language);
    else if (view === "air_quality") body = this._airQuality(language);
    else if (view === "comparison") body = this._comparison(language);
    else if (view === "diagnostics") body = this._diagnostics(language);
    else body = this._overview(language);

    this.shadowRoot.innerHTML =
      `<style>${CSS}</style><ha-card>${body}</ha-card>`;
  }
}
