(function (root, factory) {
  const wavelength = typeof module === "object" && module.exports
    ? require("./01_wavelength")
    : root.CylindiricalNearField.wavelength;
  const stepSizeAzimuth = factory(wavelength);
  if (typeof module === "object" && module.exports) {
    module.exports = stepSizeAzimuth;
  } else {
    root.CylindiricalNearField.stepSizeAzimuth = stepSizeAzimuth;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (wavelength) {
  "use strict";

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
  return function stepSizeAzimuth(frequency, MRE) {
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
  };
});
