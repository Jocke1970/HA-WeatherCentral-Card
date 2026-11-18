# Changelog

## 2026.11.0b14

Hourly precipitation-type metadata.

- Added support for provider-specific hourly `precipitation_category` and `precipitation_frozen_part` forecast metadata.
- SMHI Local precipitation categories are rendered separately from the main weather condition, so a cloudy hour can still show snow/rain/sleet as the precipitation type.
- Added localized labels and stable Home Assistant icons for snow, sleet, rain, drizzle, freezing rain/drizzle and showers.
- Main weather icon remains the provider's weather condition; precipitation type is a separate compact line.
- Providers without the extra metadata continue to render exactly as before.
- Added regression coverage for preserving custom precipitation metadata through forecast normalization.

## 2026.11.0b13

12-hour forecast redesign.

- Replaced the precipitation-only 12-hour view with a general 12-hour weather forecast while keeping the internal `view: precipitation` identifier for backward compatibility.
- Renamed the visual-editor option and card title to `12h-prognos` / `12-hour forecast`.
- Each hourly tile now shows time, weather condition icon, temperature and precipitation probability.
- Precipitation amount is shown only when the provider forecasts more than 0 mm.
- Hourly tiles use subtle condition-driven tints for sun, clouds, fog, rain, snow, sleet, hail, thunder and wind.
- The 12-hour forecast is always visible; the b12 dry-weather auto-hide behavior has been removed.
- Mobile layout uses three hourly tiles per row.
- Removed obsolete precipitation-only rendering and dry-forecast helper/tests.

## 2026.11.0b12

Precipitation card visibility and icon layout.

- Removed the precipitation icon from the card header; the title is now text-only.
- Added precipitation-type icons inside hourly cells for rain, pouring rain, snow, sleet, hail and thunderstorms.
- Hourly cells are slightly taller to accommodate the icon without crowding the probability and amount values.
- The entire 12-hour precipitation card is hidden when a valid forecast contains neither a precipitation condition nor precipitation amount above 0 mm.
- Small non-zero probability values with 0.0 mm and no precipitation condition do not keep the card visible.
- Missing/unavailable forecast data is not treated as dry weather; the card remains visible with the no-data state.
- Added regression tests for dry-forecast hiding and precipitation detection.

## 2026.11.0b11

Precipitation header icon refinement.

- Removed per-hour precipitation weather icons from the 12-hour precipitation grid.
- The top-left precipitation header icon now reflects the most relevant precipitation condition in the next 12 hours.
- Snow, sleet, hail, thunder, pouring rain and rain can therefore be indicated directly in the card header.
- Hour cells remain clean and continue to show time, probability and precipitation amount.

## 2026.11.0b10

Overview-grid and precipitation-type polish.

- Overview detail metrics now use four columns on desktop/laptop.
- Mobile layout switches the same four metrics to a 2×2 grid.
- Precipitation 12 h now renders forecast condition icons for rain, pouring rain, snow, sleet, hail and thunderstorms.
- Precipitation cells receive a subtle condition-driven tint when dynamic backgrounds are enabled.
- Precipitation amount remains the provider's precipitation amount in mm; snow icons do not reinterpret water equivalent as snow depth.
- Added regression coverage for preserving precipitation condition through forecast normalization.

## 2026.11.0b9

Risk forecast rebuild.

- Restored the original frost/ice risk thresholds, including elevated risk when temperature is close to dew point.
- Explicit `max_risk` from the configured frost-risk binary sensor can never be downgraded by the card.
- Frost/ice 12-hour timeline and diagnostics are shown only when frost/ice risk is active.
- Frost diagnostics include lowest temperature, minimum dew-point margin, maximum precipitation and ice forecast.
- Existing Pirate Weather 1-hour sensors are auto-detected as the richer frost timeline source when available; otherwise the selected weather provider's hourly forecast is used.
- Fire risk now uses Low / Moderate / High / Very high / Extreme instead of a binary Relevant label.
- Fire risk becomes active from the Moderate band (index 5+) or when the configured binary sensor is on.
- Fire 12-hour timeline and current/max/peak diagnostics are shown only when fire risk is active.
- Existing Pirate Weather fire-index hourly sensors are auto-detected for the fire timeline.
- Thunder risk no longer treats any value above zero as active; 1% stays not relevant.
- Compact three-tile Risks overview remains visible at all times.

## 2026.11.0b8

Wind & air layout polish.

- Changed Wind & air to a compact auto-fitting grid sized for three tiles per row at normal card widths.
- Centered icons, labels, values and freshness/source metadata.
- Preserved the six-value order: Wind, Wind gust, Direction / Pressure, Visibility, Humidity.
- Grid naturally falls back to fewer columns on narrow cards without fixed breakpoints.
- More info actions remain attached to each resolved entity.

## 2026.11.0b7

Rich overview-card redesign.

- Rebuilt the standard Overview using the proven information hierarchy from the original Weather Central card.
- Added a compact hero with large weather icon, temperature, condition, feels-like value, dew point and cloud cover.
- Restored temperature-driven whole-card background tint.
- Added provider-neutral forecast summary generation when no explicit summary entity is configured.
- Summary provenance is shown when a fallback forecast provider is used.
- Added updated-time display from the base weather entity.
- Default overview metrics are now Humidity, Clouds, Dew point and Precipitation.
- Dew point is derived from temperature + humidity when no direct source is available, and is explicitly marked as calculated.
- Precipitation falls back to the current-hour forecast only when no current source is available and is then labelled as a 1-hour amount.
- Added configurable Overview metric slots and optional summary entity in the visual editor.
- Added Dew point and Precipitation to advanced per-parameter source overrides.
- Preserved real precipitation-rate units such as mm/h for current sensors.
- Tapping the overview hero opens More info for the selected weather entity.

## 2026.11.0b6

Compact overview-card polish.

- Reworked the Overview metric area into compact mini tiles.
- Metric content is centered for a cleaner dashboard/instrument-panel look.
- Uses an auto-fitting grid: four compact metrics fit on one row when space allows and wrap naturally on narrower cards.
- Preserves freshness indicators, source/fallback provenance and per-tile More info actions.
- No changes to the larger Wind & air tiles.

## 2026.11.0b5

Expanded visual intelligence and comparison data.

- Restored sensor-driven dynamic backgrounds inspired by the original Weather Central dashboard.
- Added value-based tinting for Sun/Moon, UV, aurora, frost/ice, thunder, fire risk, SMHI alerts and AQI.
- Added a visual-editor toggle for dynamic backgrounds; enabled by default.
- Comparison view now prefers Weather Comparison v2 metadata sensors when available.
- Weather Comparison v2 source/model/implementation metadata is shown in the comparison table.
- Comparison discovery now supplements metadata sources with missing weather providers instead of choosing one source system exclusively.
- Air-quality view shows the detected station label.
- Added regression coverage for Weather Comparison v2 metadata discovery.

## 2026.11.0b4

Sections-layout sizing fix.

- Changed `getGridOptions().rows` from a fixed value to `"auto"`.
- Dynamic Weather Central views now report their real content height to Home Assistant Sections.
- Prevents taller views from visually overlapping the card below.
- Width remains 12 columns with a 6-column minimum.

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
