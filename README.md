# Cylindirical Near-Field JavaScript Module

Dependency-free browser JavaScript library for cylindrical near-field antenna
measurement calculations. All distances are in meters, frequencies in hertz,
and angles in degrees.

## Browser

Load the script before your application code:

```html
<script src="./lib/wavelength.js"></script>
<script src="./lib/measurement-distance.js"></script>
<script src="./lib/probe-radius.js"></script>
<script src="./lib/scan-size-y.js"></script>
<script src="./lib/step-size-y.js"></script>
<script src="./lib/sampling-count-y.js"></script>
<script src="./lib/sampling-parameters-y.js"></script>
<script src="./lib/step-size-azimuth.js"></script>
<script src="./lib/sampling-count-azimuth.js"></script>
<script src="./index.js"></script>
<script>
  const { measurementDistance, probeRadius } = window.CylindiricalNearField;
  console.log(measurementDistance(1.2e9));
  console.log(probeRadius(3, [0.4, 0.6, 1.195, 0.2]));
</script>
```

The same API is available through CommonJS in Node.js with
`const cnf = require("./index.js")`.

## API

```js
function wavelength(frequency)
function measurementDistance(frequency, coeff = 5)
function probeRadius(ref_distance, lengths)
function scanSizeY(D, P, Z, MRE, Az_max, El_max)
function stepSizeY(frequency)
function samplingCountY(scan_size, frequency)
function samplingParametersY(D, P, Z, MRE, Az_max, El_max, frequency)
function stepSizeAzimuth(frequency, MRE)
function samplingCountAzimuth(Az_max, frequency, MRE)
```

## Tests

With Node.js installed, run `npm test` from this directory.

## API Documentation

Generate the JSDoc HTML site with:

```bash
npm run docs
```

The generated site is written to `docs/`. The configured JSDoc plugin renders
each custom `@formula` tag on its function's API page.