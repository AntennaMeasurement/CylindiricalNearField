(function (root, factory) {
  const scanSizeY = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = scanSizeY;
  } else {
    (root.CylindiricalNearField || (root.CylindiricalNearField = {})).scanSizeY = scanSizeY;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

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
  return function scanSizeY(D, P, Z, MRE, Az_max, El_max) {
    if (El_max > 60) {
      throw new RangeError("El_max should be equal or less than 60 degrees.");
    }
    if (Z <= MRE) {
      throw new RangeError("Z distance must be greater than MRE.");
    }

    const azimuthRadians = Az_max * Math.PI / 180;
    const elevationRadians = El_max * Math.PI / 180;
    return D + P + 2 * (Z - MRE * Math.cos(azimuthRadians)) * Math.tan(elevationRadians);
  };
});
