# HA-WeatherCentral-Card

A provider-aware Home Assistant Lovelace weather card with multiple views, visual editing, per-parameter fallbacks, source provenance and freshness indicators.

> **Status:** active development on `dev`. No beta or stable release yet.

## Core idea

Choose one Home Assistant `weather.*` entity as the base provider. Weather Central Card enriches each displayed parameter from provider-specific sensors, optional Weather Consensus sensors, custom entities and explicit fallback providers.

Missing data is never interpreted as zero. Every resolved value keeps its actual source and freshness.

## Initial dev scope

- Visual editor
- SMHI Local provider profile
- Generic `weather.*` support
- Per-parameter primary/fallback entities
- Optional fallback weather integrations
- Central unit normalization
- Provenance labels per value
- Freshness dots: green / yellow / red / grey
- Recovery grace to reduce provider flapping
- Initial views: Overview, Wind & air, Pressure, Diagnostics

## Branches

- `dev` — active development
- `beta` — testable beta builds
- `main` — stable releases only

See [`ARCHITECTURE.md`](ARCHITECTURE.md) for the locked v1 design contract.