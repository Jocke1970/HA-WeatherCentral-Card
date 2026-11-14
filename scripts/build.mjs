import { build } from "esbuild";

const release = process.argv.includes("--release");

await build({
  entryPoints: ["src/index.js"],
  bundle: true,
  format: "iife",
  target: ["es2020"],
  outfile: "weather-central-card.js",
  minify: release,
  legalComments: "none",
  banner: {
    js: "/* HA-WeatherCentral-Card · generated bundle · MIT */",
  },
});

console.log(
  release
    ? "Built release weather-central-card.js"
    : "Built development weather-central-card.js"
);
