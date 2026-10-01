# Cylindirical Near-Field JavaScript Module

Dependency-free browser JavaScript library for cylindrical near-field antenna
measurement calculations. All distances are in meters, frequencies in hertz,
and angles in degrees.

## Browser

Load the script before your application code:

```html
<script src="./js/index.js"></script>
<script>
  const { measurementDistance, probeRadius } = window.CylindiricalNearField;
  console.log(measurementDistance(1.2e9));
  console.log(probeRadius(3, [0.4, 0.6, 1.195, 0.2]));
</script>
```

The same API is available through CommonJS in Node.js with
`const cnf = require("./index.js")`.

## API

- `wavelength(frequency)`
- `measurementDistance(frequency, coeff = 5)`
- `probeRadius(ref_distance, lengths)`
- `scanSizeY(D, P, Z, R, Az_max, El_max)`
- `stepSizeY(scan_size, frequency)`
- `samplingCountY(scan_size, frequency)`
- `stepSizeAzimuth(frequency, MRE)`
- `samplingCountAzimuth(Az_max, frequency, MRE)`

## Tests

With Node.js installed, run `npm test` from this directory.