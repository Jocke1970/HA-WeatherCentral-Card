import { WeatherCentralCard } from "./card.js";
import { WeatherCentralCardEditor } from "./editor.js";

const TAG = "weather-central-card";
const EDITOR_TAG = "weather-central-card-editor";
const VERSION = "2026.11.0b2";

if (!customElements.get(EDITOR_TAG)) {
  customElements.define(
    EDITOR_TAG,
    WeatherCentralCardEditor
  );
}

if (!customElements.get(TAG)) {
  customElements.define(TAG, WeatherCentralCard);
}

window.customCards = window.customCards || [];

if (!window.customCards.some((item) => item.type === TAG)) {
  window.customCards.push({
    type: TAG,
    name: "Weather Central Card",
    description:
      "Provider-aware weather card with source provenance, fallback chains and freshness indicators.",
    preview: true,
  });
}

console.info(
  "%c WEATHER-CENTRAL-CARD %c " + VERSION + " ",
  "color:white;background:#1976d2;font-weight:700",
  "color:#1976d2;background:#fff"
);
