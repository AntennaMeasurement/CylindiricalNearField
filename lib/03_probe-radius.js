(function (root, factory) {
  const probeRadius = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = probeRadius;
  } else {
    (root.CylindiricalNearField || (root.CylindiricalNearField = {})).probeRadius = probeRadius;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

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
  return function probeRadius(ref_distance, lengths) {
    return ref_distance - lengths.reduce((total, length) => total + length, 0);
  };
});
