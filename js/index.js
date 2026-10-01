(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.CylindiricalNearField = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const c = 299792458;

/** Calculate wavelength in meters for a frequency in hertz. */
function wavelength(frequency) {
  return c / frequency;
}

/** Calculate measurement distance in meters; coeff defaults to five wavelengths. */
function measurementDistance(frequency, coeff = 5) {
  return coeff * wavelength(frequency);
}

/** Calculate probe radius in meters from a reference distance and component lengths. */
function probeRadius(ref_distance, lengths) {
  return ref_distance - lengths.reduce((total, length) => total + length, 0);
}

/** Calculate the scan size in the Y direction, in meters. */
function scanSizeY(D, P, Z, R, Az_max, El_max) {
  if (El_max > 60) {
    throw new RangeError("El_max should be equal or less than 60 degrees.");
  }
  if (Z <= R) {
    throw new RangeError("Z distance must be greater than R (MRE).");
  }

  const azimuthRadians = Az_max * Math.PI / 180;
  const elevationRadians = El_max * Math.PI / 180;
  return D + P + 2 * (Z - R * Math.cos(azimuthRadians)) * Math.tan(elevationRadians);
}

/** Calculate the Y-direction step size in meters, rounded down to a millimeter. */
function stepSizeY(scan_size, frequency) {
  const halfWavelength = wavelength(frequency) / 2;
  return Math.floor(Math.trunc(halfWavelength * 1e3)) / 1e3;
}

/** Calculate the number of Y-direction sampling points. */
function samplingCountY(scan_size, frequency) {
  const stepSizeMillimeters = Math.trunc(stepSizeY(scan_size, frequency) * 1e3);
  const scanLengthMillimeters = Math.ceil(scan_size * 1e3);
  let halfScanLengthMillimeters = scanLengthMillimeters % 2 === 0
    ? scanLengthMillimeters / 2
    : (scanLengthMillimeters + 1) / 2;

  const remainder = halfScanLengthMillimeters % stepSizeMillimeters;
  if (remainder > 0) {
    halfScanLengthMillimeters += stepSizeMillimeters - remainder;
  }

  return 2 * Math.trunc(halfScanLengthMillimeters / stepSizeMillimeters) + 1;
}

/** Calculate the azimuth angular step size in degrees. */
function stepSizeAzimuth(frequency, MRE) {
  let sampleCount = Math.ceil(2 * (2 * Math.PI * MRE / wavelength(frequency) + 10) + 1);
  if (sampleCount % 2 === 0) {
    sampleCount += 1;
  }

  let stepSize = 360 / (sampleCount - 1);
  while (Math.floor(stepSize * 1e3) % 250 !== 0) {
    sampleCount += 2;
    stepSize = 360 / (sampleCount - 1);
  }

  return stepSize;
}

/** Calculate the number of azimuth sampling points. */
function samplingCountAzimuth(Az_max, frequency, MRE) {
  if (Math.floor(Az_max * 1e3) % 250 !== 0) {
    throw new RangeError("Az_max must be an integer multiple of 0.250 degrees.");
  }

  let sampleCount = Math.ceil(2 * (2 * Math.PI * MRE / wavelength(frequency) + 10) + 1);
  if (sampleCount % 2 === 0) {
    sampleCount += 1;
  }

  let stepSize = Az_max / (sampleCount - 1);
  while (Math.floor(stepSize * 1e3) % 250 !== 0) {
    sampleCount += 2;
    stepSize = Az_max / (sampleCount - 1);
  }

  return sampleCount;
}

  return {
    wavelength,
    measurementDistance,
    probeRadius,
    scanSizeY,
    stepSizeY,
    samplingCountY,
    stepSizeAzimuth,
    samplingCountAzimuth,
  };
});