(function (root, factory) {
  const wavelength = typeof module === "object" && module.exports
    ? require("./wavelength")
    : root.CylindiricalNearField.wavelength;
  const stepSizeY = factory(wavelength);
  if (typeof module === "object" && module.exports) {
    module.exports = stepSizeY;
  } else {
    root.CylindiricalNearField.stepSizeY = stepSizeY;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (wavelength) {
  "use strict";

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
  return function stepSizeY(frequency) {
    const halfWavelength = wavelength(frequency) / 2;
    return Math.floor(Math.trunc(halfWavelength * 1e3)) / 1e3;
  };
});
