import { PARAM_META, PARAMS, formatValue, windDirection } from "./core.js";
import { languageFor, tr } from "./i18n.js";
import { WeatherValueResolver } from "./resolver.js";

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
  @media(max-width:420px){ha-card{padding:13px}.big{font-size:34px}.hero-icon{--mdc-icon-size:46px}}
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

    this._scheduleRender();
  }

  set hass(hass) {
    this._hass = hass;

    if (!this._resolver) {
      this._resolver = new WeatherValueResolver(hass, this._config);
    } else {
      this._resolver.update(hass, this._config);
    }

    this._scheduleRender();
  }

  get hass() {
    return this._hass;
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

  _wind(language) {
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

    if (view === "wind") body = this._wind(language);
    else if (view === "pressure") body = this._pressure(language);
    else if (view === "diagnostics") body = this._diagnostics(language);
    else body = this._overview(language);

    this.shadowRoot.innerHTML =
      `<style>${CSS}</style><ha-card>${body}</ha-card>`;
  }
}
