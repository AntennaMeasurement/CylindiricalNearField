(function (root, factory) {
  const wavelength = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = wavelength;
  } else {
    (root.CylindiricalNearField || (root.CylindiricalNearField = {})).wavelength = wavelength;
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
  return function wavelength(frequency) {
    return c / frequency;
  };
});
