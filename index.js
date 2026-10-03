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

/**
 * Calculate the wavelength for a given frequency.
 *
 * Here, `c` is the speed of light in vacuum and `f` is frequency.
 *
 * @param {number} frequency - Frequency in hertz.
 * @returns {number} Wavelength in meters.
 * @formula λ = c / f
 * @memberof CylindiricalNearField
 * @static
 * @see {@link measurementDistance}
 * @example
 * wavelength(299792458); // 1
 */
function wavelength(frequency) {
  return c / frequency;
}

/**
 * Calculate the required measurement distance as a multiple of the wavelength.
 *
 * The distance is the coefficient multiplied by the wavelength for `frequency`.
 *
 * @param {number} frequency - Frequency in hertz.
 * @param {number} [coeff=5] - Coefficient applied to the wavelength.
 * @returns {number} Measurement distance in meters.
 * @formula d = coeff × λ
 * @memberof CylindiricalNearField
 * @static
 * @see {@link wavelength}
 * @example
 * measurementDistance(299792458); // 5
 */
function measurementDistance(frequency, coeff = 5) {
  return coeff * wavelength(frequency);
}

/**
 * Calculate probe radius from a reference distance and component lengths.
 *
 * `li` represents each component length in the input array.
 *
 * @param {number} ref_distance - Reference distance in meters.
 * @param {number[]} lengths - Component lengths in meters.
 * @returns {number} Probe radius in meters.
 * @formula r = Rref − Σ li
 * @memberof CylindiricalNearField
 * @static
 * @example
 * probeRadius(3, [0.4, 0.6, 1.195, 0.2]); // approximately 0.605
 */
function probeRadius(ref_distance, lengths) {
  return ref_distance - lengths.reduce((total, length) => total + length, 0);
}

/**
 * Calculate the scan size in the Y direction using cylindrical scan geometry.
 *
 * The angles are specified in degrees.
 *
 * @param {number} D - Antenna height in meters.
 * @param {number} P - Probe longest-edge length in meters.
 * @param {number} Z - Probe radius in meters.
 * @param {number} MRE - Maximum radial extent in meters.
 * @param {number} Az_max - Maximum azimuth angle in degrees.
 * @param {number} El_max - Maximum elevation angle in degrees; must not exceed 60.
 * @returns {number} Scan size in the Y direction, in meters.
 * @throws {RangeError} If `El_max` is greater than 60 degrees.
 * @throws {RangeError} If `Z` is less than or equal to `MRE`.
 * @formula LY = D + P + 2 × (Z − MRE × cos(Az_max)) × tan(El_max)
 * @memberof CylindiricalNearField
 * @static
 * @see NSI 2000 (Near-field Edition), Version 4, Software Operating Manual.
 */
function scanSizeY(D, P, Z, MRE, Az_max, El_max) {
  if (El_max > 60) {
    throw new RangeError("El_max should be equal or less than 60 degrees.");
  }
  if (Z <= MRE) {
    throw new RangeError("Z distance must be greater than MRE.");
  }

  const azimuthRadians = Az_max * Math.PI / 180;
  const elevationRadians = El_max * Math.PI / 180;
  return D + P + 2 * (Z - MRE * Math.cos(azimuthRadians)) * Math.tan(elevationRadians);
}

/**
 * Calculate the Y-direction step size from half the wavelength.
 *
 * The result is rounded down to the nearest millimeter. `scan_size` is
 * retained in the API for compatibility; the step size depends only on
 * frequency.
 *
 * @param {number} frequency - Frequency in hertz.
 * @returns {number} Step size in the Y direction, in meters.
 * @formula ΔY = floor(1000 × (λ / 2)) / 1000 m
 * @memberof CylindiricalNearField
 * @static
 * @see {@link wavelength}
 */
function stepSizeY(frequency) {
  const halfWavelength = wavelength(frequency) / 2;
  return Math.floor(Math.trunc(halfWavelength * 1e3)) / 1e3;
}

/**
 * Calculate the number of sampling points in the Y direction.
 *
 * @param {number} scan_size - Scan size in the Y direction, in meters.
 * @param {number} frequency - Frequency in hertz.
 * @returns {number} Number of Y-direction sampling points.
 * @formula N_Y = \frac{2 \cdot \lceil L_Y / 2 \rceil}{\Delta_Y} + 1
 * @memberof CylindiricalNearField
 * @static
 * @see {@link stepSizeY}
 */
function samplingCountY(scan_size, frequency) {
  const stepSizeMillimeters =  stepSizeY(frequency) * 1e3;
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

/**
 * Calculate the final Y-direction sampling parameters.
 *
 * This function combines the scan size calculation and the Y-direction sampling
 * calculations to provide the final sampling parameters for the Y direction.
 *
 * @param {number} D - Distance D in meters.
 * @param {number} P - Distance P in meters.
 * @param {number} Z - Distance Z in meters.
 * @param {number} MRE - Maximum radial extent in meters.
 * @param {number} Az_max - Maximum azimuth angle along one side, in degrees.
 * @param {number} El_max - Maximum elevation angle along one side, in degrees.
 * @param {number} frequency - Frequency in hertz.
 * @returns {object} Object containing the final Y-direction sampling parameters.
 * @memberof CylindiricalNearField
 * @static
 * @see {@link scanSizeY}
 * @see {@link stepSizeY}
 * @see {@link samplingCountY}
 */
function samplingParametersY(D, P, Z, MRE, Az_max, El_max, frequency) {
  let scanSize = scanSizeY(D, P, Z, MRE, Az_max, El_max);
  const samplingCount = samplingCountY(scanSize, frequency);
  const stepSize = stepSizeY(frequency);
  console.log(scanSize, samplingCount, stepSize);
  scanSize = (samplingCount-1) * stepSize;

  return {
    scanSize,
    stepSize,
    samplingCount,
  };
}

/**
 * Calculate the angular step size in azimuth.
 *
 * The initial count is adjusted to an odd integer. The count is increased by
 * two until the step size is supported in 0.25-degree increments.
 *
 * @param {number} frequency - Frequency in hertz.
 * @param {number} MRE - Maximum radial extent in meters.
 * @returns {number} Azimuth step size in degrees.
 * @formula N0 = ceil(2 × (2π × MRE / λ + 10) + 1); ΔAz = 360° / (Naz − 1)
 * @memberof CylindiricalNearField
 * @static
 * @see {@link wavelength}
 * @see {@link samplingCountAzimuth}
 */
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

/**
 * Calculate the number of sampling points in the azimuth direction.
 *
 * The initial count is adjusted to an odd integer, then increased by two until
 * the step size is supported in 0.25-degree increments.
 *
 * @param {number} Az_max - Maximum azimuth angle along one side, in degrees.
 * @param {number} frequency - Frequency in hertz.
 * @param {number} MRE - Maximum radial extent in meters.
 * @returns {number} Number of azimuth sampling points.
 * @throws {RangeError} If `Az_max` is not an integer multiple of 0.25 degrees.
 * @formula N0 = ceil(2 × (2π × MRE / λ + 10) + 1); ΔAz = Az_max / (Naz − 1)
 * @memberof CylindiricalNearField
 * @static
 * @see {@link wavelength}
 * @see {@link stepSizeAzimuth}
 */
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

  /**
   * Browser and CommonJS API for cylindrical near-field calculations.
   * @namespace CylindiricalNearField
   */
  const api = {
    wavelength,
    measurementDistance,
    probeRadius,
    scanSizeY,
    stepSizeY,
    samplingCountY,
    samplingParametersY,
    stepSizeAzimuth,
    samplingCountAzimuth,
  };
  return api;
});