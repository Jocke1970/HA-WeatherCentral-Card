# Weather Central Card – v1 architecture

## Core contract

One Home Assistant `weather.*` entity defines the base weather/provider context. Current values are then resolved parameter by parameter.

Resolution order:

1. Manual primary entity for that parameter.
2. Provider-profile entity for the selected base weather integration.
3. Compatible attribute on the selected `weather.*` entity.
4. Manual parameter fallbacks.
5. Optional fallback `weather.*` integrations.

The first usable, non-stale value wins. If every candidate is stale, the best stale value may still be displayed with a red freshness indicator instead of silently becoming zero.

## Provenance

Every resolved value carries its normalized value, unit, actual source label, source entity, freshness state and fallback level. Mixed provenance is therefore explicit rather than hidden.

## Freshness

- green = fresh
- yellow = aging but usable
- red = stale
- grey = freshness unknown

Freshness thresholds belong to provider/capability policy, not one global timeout. SMHI Local should prefer forecast metadata such as `sensor.smhi_local_prognos_skapad` when judging model freshness, so cached model data cannot look fresh only because an entity was recently re-reported.

## Fallback safety

Missing or unavailable data is never interpreted as zero. Fallback only occurs between semantically compatible parameters. Unit normalization is centralized.

A recovery grace period prevents source flapping when a primary provider briefly returns after an outage.

## Forecast contract

Forecasts resolve as whole series. Individual forecast hours from different providers must never be spliced into one chart.

Current-value fallback and forecast-series fallback are separate systems.

## Consensus

Weather Consensus is an explicit selectable source. It is never a hidden automatic fallback.

## Provider profiles

Profiles define provider detection, richer entities, capabilities and freshness policy. SMHI Local is the first full profile; generic Home Assistant weather entities remain supported with fewer capabilities.

## Views

Implemented views: `overview`, `temperature`, `precipitation` (12-hour forecast view), `forecast`, `wind`, `pressure`, `sky`, `risks`, `alerts`, `air_quality`, `comparison`, `diagnostics`.

Cycling weather stays outside Weather Central Card because it consumes weather data rather than supplying weather data.