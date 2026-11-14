# HA-WeatherCentral-Card

A provider-aware Home Assistant Lovelace weather card with multiple views, visual editing, per-parameter fallbacks, source provenance and freshness indicators.

> **Current beta:** `2026.11.0b1` is available on the `beta` branch for visual Home Assistant testing. Stable `main` is intentionally untouched.

## Core idea

Choose one Home Assistant `weather.*` entity as the base provider. Weather Central Card enriches each displayed parameter from provider-specific sensors, optional Weather Consensus sensors, custom entities and explicit fallback providers.

Missing data is never interpreted as zero. Every resolved value keeps its actual source and freshness. Forecast fallback is done provider-by-provider as a complete series; hours from different providers are never spliced together.

## 2026.11.0b1 scope

- Visual editor
- SMHI Local provider profile
- Generic Home Assistant `weather.*` support
- Per-parameter primary/fallback entities
- Optional fallback weather integrations
- Central unit normalization
- Provenance labels per value and forecast series
- Freshness dots: green / yellow / red / grey
- Recovery grace to reduce provider flapping
- Whole-series hourly/daily forecast fallback
- Swedish and English translation sources
- CI regression tests and verified single-file bundle

### Views

- Overview
- Temperature · next 12 hours
- Precipitation · next 12 hours
- 7-day forecast
- Wind & air
- Pressure
- Diagnostics

## Basic configuration

```yaml
type: custom:weather-central-card
weather_entity: weather.smhi_local
view: overview
show_sources: true
show_freshness: true
use_fallbacks: true
```

The visual editor can select a base weather entity, fallback weather entities, and advanced per-parameter primary/fallback entities.

## Freshness

Each resolved value keeps its actual source and freshness:

- green — fresh
- yellow — aging but usable
- red — stale
- grey — freshness cannot be determined

SMHI Local forecast freshness uses forecast metadata rather than treating a recently re-reported cached value as a fresh model run.

## Beta status

`2026.11.0b1` intentionally focuses on the core weather/provider architecture and visual inspection in real Home Assistant.

Planned later beta views include Sky, Risks, Alerts, Air quality and Provider comparison. Pressure forecast trend also remains to be added.

## Branches

- `dev` — active development
- `beta` — testable beta builds
- `main` — stable releases only

See [`ARCHITECTURE.md`](ARCHITECTURE.md) for the locked v1 design contract and [`CHANGELOG.md`](CHANGELOG.md) for release notes.


## External modules

Weather Central Card can auto-detect the entities used by the original Weather Central dashboard for Sun/Moon, OpenUV, aurora, SMHI alerts and Stockholm Södermalm air quality. Every external source can be overridden from the visual editor. Missing data remains unknown and is never converted to a safe/zero state.
