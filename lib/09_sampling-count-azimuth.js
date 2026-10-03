(function (root, factory) {
  const wavelength = typeof module === "object" && module.exports
    ? require("./01_wavelength")
    : root.CylindiricalNearField.wavelength;
  const samplingCountAzimuth = factory(wavelength);
  if (typeof module === "object" && module.exports) {
    module.exports = samplingCountAzimuth;
  } else {
    root.CylindiricalNearField.samplingCountAzimuth = samplingCountAzimuth;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (wavelength) {
  "use strict";

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
  return function samplingCountAzimuth(Az_max, frequency, MRE) {
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
  };
});
