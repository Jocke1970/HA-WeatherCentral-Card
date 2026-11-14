# Changelog

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
