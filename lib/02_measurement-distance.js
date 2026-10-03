(function (root, factory) {
  const getWavelength = typeof module === "object" && module.exports
    ? require("./01_wavelength")
    : root.CylindiricalNearField.wavelength;
  const measurementDistance = factory(getWavelength);
  if (typeof module === "object" && module.exports) {
    module.exports = measurementDistance;
  } else {
    root.CylindiricalNearField.measurementDistance = measurementDistance;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (wavelength) {
  "use strict";

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
  return function measurementDistance(frequency, coeff = 5) {
    return coeff * wavelength(frequency);
  };
});
