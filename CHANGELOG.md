# Changelog

## 2026.11.0b3

Expanded Weather Central beyond the core forecast views.

- Added Sky view with Sun, Moon, UV index and aurora data.
- Added Risks view with provider-neutral frost/ice derivation plus thunder and fire-risk sources.
- Added SMHI Alerts view using the existing alert status and message entities.
- Added Air quality view with AQI, dominant pollutant, O₃, NO₂, PM2.5 and PM10.
- Added Comparison view that discovers known weather providers and shows optional Weather Consensus values without recomputing consensus inside the card.
- Added visual-editor source overrides for all external modules.
- Added SMHI Core provider recognition for comparison.
- Preserved unknown risk/alert states: missing data is never rendered as “no risk” or “no warnings”.
- Centered the final row in the 7-day forecast and added more top spacing to the temperature chart.
- Added regression tests for external modules and unknown-state handling.

## 2026.11.0b2

Visual polish after the first Home Assistant inspection.

- Kept per-value freshness dots while suppressing repeated base-provider text in normal tiles.
- Fallback and non-default sources remain explicitly labeled.
- Balanced Wind & air to six tiles by adding humidity.
- Replaced the Pressure development placeholder with a real next-12-hours pressure forecast curve.
- Added diagnostics data coverage and clearer missing-value presentation.
- Retained whole-series forecast fallback; no cross-provider hour splicing.

## 2026.11.0b1

First visual beta candidate.

- Added modular custom-card source under `src/`.
- Added a visual editor with base weather source and fallback choices.
- Added SMHI Local as the first full provider profile.
- Added generic Home Assistant `weather.*` support.
- Added per-parameter primary and fallback entities.
- Added whole-provider fallback for hourly and daily forecasts.
- Added centralized unit normalization.
- Added source provenance per resolved value and forecast series.
- Added green/yellow/red/grey freshness indicators.
- Added stale-source fallback and recovery grace.
- Added Overview, Temperature 12 h, Precipitation 12 h, 7-day forecast, Wind & air, Pressure and Diagnostics views.
- Added Swedish and English translation sources.
- Added regression tests for resolver and forecast behavior.
- Added CI test, bundle and artifact verification.

Known beta scope:
- Pressure forecast trend is not yet implemented.
- Sky, risks, alerts, air quality and provider comparison views are planned for later betas.
- UI sizing and visual polish still need real Home Assistant inspection.
