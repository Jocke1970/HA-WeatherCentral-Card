import { languageFor, tr } from "./i18n.js";

const EDITOR_PARAMS = [
  "temperature",
  "apparent_temperature",
  "humidity",
  "cloud_coverage",
  "wind_speed",
  "wind_gust",
  "pressure",
  "visibility",
];

const CSS = `
  :host{display:block;padding:4px 0}
  .wrap{display:grid;gap:14px}
  .row{display:grid;gap:6px}
  label{font-size:12px;color:var(--secondary-text-color)}
  select{box-sizing:border-box;width:100%;min-height:44px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color);padding:8px 10px;font:inherit}
  .toggle{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:42px}
  .toggle span{font-size:13px}
  details{border-top:1px solid var(--divider-color);padding-top:12px}
  summary{cursor:pointer;font-weight:650;font-size:13px}
  .hint{font-size:11px;color:var(--secondary-text-color);line-height:1.4;margin-top:6px}
  .param{padding:12px 0;border-top:1px solid var(--divider-color)}
  .param:first-of-type{border-top:0}
  .param-title{font-size:12px;font-weight:650;margin-bottom:8px}
  .cols{display:grid;grid-template-columns:1fr 1fr;gap:8px}
  @media(max-width:520px){.cols{grid-template-columns:1fr}}
`;

export class WeatherCentralCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._config = {};
    this._rendered = false;

    this.shadowRoot.addEventListener(
      "change",
      (event) => this._onChange(event)
    );

    this.shadowRoot.addEventListener(
      "value-changed",
      (event) => this._onValueChanged(event)
    );
  }

  set hass(hass) {
    this._hass = hass;

    if (!this._rendered) {
      this._render();
    } else {
      this._syncPickers();
    }
  }

  get hass() {
    return this._hass;
  }

  setConfig(config) {
    this._config = {
      view: "overview",
      show_sources: true,
      show_freshness: true,
      use_fallbacks: true,
      ...(config || {}),
    };

    this._render();
  }

  _emit(next) {
    this._config = next;

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: { ...next } },
        bubbles: true,
        composed: true,
      })
    );
  }

  _setField(field, value) {
    const next = { ...this._config };

    if (value === "" || value == null) {
      delete next[field];
    } else {
      next[field] = value;
    }

    this._emit(next);
  }

  _setParam(param, field, value) {
    const next = JSON.parse(
      JSON.stringify(this._config || {})
    );

    next.parameters ||= {};
    next.parameters[param] ||= {};

    if (field === "primary") {
      if (value) {
        next.parameters[param].primary = value;
      } else {
        delete next.parameters[param].primary;
      }
    } else if (field === "fallback1") {
      next.parameters[param].fallbacks = value
        ? [value]
        : [];

      if (!value) {
        delete next.parameters[param].fallbacks;
      }
    }

    if (
      !next.parameters[param].primary &&
      !(next.parameters[param].fallbacks || []).length
    ) {
      delete next.parameters[param];
    }

    if (!Object.keys(next.parameters).length) {
      delete next.parameters;
    }

    this._emit(next);
  }

  _onChange(event) {
    const element = event.target;
    const field = element?.dataset?.field;

    if (
      !field ||
      element?.dataset?.param ||
      element?.tagName?.toLowerCase() === "ha-entity-picker"
    ) {
      return;
    }

    if (
      ["show_sources", "show_freshness", "use_fallbacks"].includes(field)
    ) {
      this._setField(field, Boolean(element.checked));
      return;
    }

    this._setField(field, element.value);
  }

  _onValueChanged(event) {
    const element = event.target;
    const field = element?.dataset?.field;
    const param = element?.dataset?.param;
    const value = event.detail?.value || "";

    if (param && field) {
      this._setParam(param, field, value);
    } else if (field) {
      this._setField(field, value);
    }
  }

  _picker(field, value, param = null) {
    return `
      <ha-entity-picker
        data-field="${field}"
        ${param ? `data-param="${param}"` : ""}
        value="${value || ""}"
      ></ha-entity-picker>
    `;
  }

  _syncPickers() {
    this.shadowRoot
      .querySelectorAll("ha-entity-picker")
      .forEach((picker) => {
        picker.hass = this._hass;

        const field = picker.dataset.field;

        if (
          field === "weather_entity" ||
          field.startsWith("fallback_weather")
        ) {
          picker.includeDomains = ["weather"];
        }
      });
  }

  _render() {
    const language = languageFor(this._hass);
    const config = this._config || {};

    const advanced = EDITOR_PARAMS.map((param) => {
      const parameterConfig =
        config.parameters?.[param] || {};

      return `
        <div class="param">
          <div class="param-title">${tr(
            language,
            param
          )}</div>
          <div class="cols">
            <div class="row">
              <label>${tr(
                language,
                "editor_primary"
              )}</label>
              ${this._picker(
                "primary",
                parameterConfig.primary,
                param
              )}
            </div>
            <div class="row">
              <label>${tr(
                language,
                "editor_fallback1"
              )}</label>
              ${this._picker(
                "fallback1",
                parameterConfig.fallbacks?.[0],
                param
              )}
            </div>
          </div>
        </div>
      `;
    }).join("");

    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <div class="wrap">
        <div class="row">
          <label>${tr(
            language,
            "editor_weather"
          )}</label>
          ${this._picker(
            "weather_entity",
            config.weather_entity
          )}
        </div>

        <div class="row">
          <label>${tr(language, "editor_view")}</label>
          <select data-field="view">
            <option value="overview" ${config.view === "overview" ? "selected" : ""}>
              ${tr(language, "view_overview")}
            </option>
            <option value="temperature" ${config.view === "temperature" ? "selected" : ""}>
              ${tr(language, "view_temperature")}
            </option>
            <option value="precipitation" ${config.view === "precipitation" ? "selected" : ""}>
              ${tr(language, "view_precipitation")}
            </option>
            <option value="forecast" ${config.view === "forecast" ? "selected" : ""}>
              ${tr(language, "view_forecast")}
            </option>
            <option value="wind" ${config.view === "wind" ? "selected" : ""}>
              ${tr(language, "view_wind")}
            </option>
            <option value="pressure" ${config.view === "pressure" ? "selected" : ""}>
              ${tr(language, "view_pressure")}
            </option>
            <option value="diagnostics" ${config.view === "diagnostics" ? "selected" : ""}>
              ${tr(language, "view_diagnostics")}
            </option>
          </select>
        </div>

        <div class="toggle">
          <span>${tr(language, "editor_sources")}</span>
          <input
            data-field="show_sources"
            type="checkbox"
            ${config.show_sources !== false ? "checked" : ""}
          >
        </div>

        <div class="toggle">
          <span>${tr(language, "editor_freshness")}</span>
          <input
            data-field="show_freshness"
            type="checkbox"
            ${config.show_freshness !== false ? "checked" : ""}
          >
        </div>

        <div class="toggle">
          <span>${tr(language, "editor_fallbacks")}</span>
          <input
            data-field="use_fallbacks"
            type="checkbox"
            ${config.use_fallbacks !== false ? "checked" : ""}
          >
        </div>

        <div class="cols">
          <div class="row">
            <label>${tr(
              language,
              "editor_fallback1"
            )} · weather</label>
            ${this._picker(
              "fallback_weather_1",
              config.fallback_weather_1
            )}
          </div>

          <div class="row">
            <label>${tr(
              language,
              "editor_fallback2"
            )} · weather</label>
            ${this._picker(
              "fallback_weather_2",
              config.fallback_weather_2
            )}
          </div>
        </div>

        <details>
          <summary>${tr(
            language,
            "editor_advanced"
          )}</summary>
          <div class="hint">${tr(
            language,
            "editor_hint"
          )}</div>
          ${advanced}
        </details>
      </div>
    `;

    this._rendered = true;
    this._syncPickers();
  }
}
