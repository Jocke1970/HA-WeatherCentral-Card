import sv from "../translations/sv.json" with { type: "json" };
import en from "../translations/en.json" with { type: "json" };

const L = { sv, en };

export function languageFor(hass) {
  const raw = String(
    hass?.language ||
    hass?.locale?.language ||
    "en"
  ).toLowerCase();

  return raw.startsWith("sv") ? "sv" : "en";
}

export function tr(language, key) {
  return L[language]?.[key] || L.en[key] || key;
}
