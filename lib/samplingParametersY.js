(function (root, factory) {
  const api = typeof module === "object" && module.exports
    ? {
      scanSizeY: require("./scanSizeY"),
      samplingCountY: require("./samplingCountY"),
      stepSizeY: require("./stepSizeY"),
    }
    : root.CylindiricalNearField;
  const samplingParametersY = factory(api.scanSizeY, api.samplingCountY, api.stepSizeY);
  if (typeof module === "object" && module.exports) {
    module.exports = samplingParametersY;
  } else {
    root.CylindiricalNearField.samplingParametersY = samplingParametersY;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (scanSizeY, samplingCountY, stepSizeY) {
  "use strict";

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
  return function samplingParametersY(D, P, Z, MRE, Az_max, El_max, frequency) {
    let scanSize = scanSizeY(D, P, Z, MRE, Az_max, El_max);
    const samplingCount = samplingCountY(scanSize, frequency);
    const stepSize = stepSizeY(frequency);
    console.log(scanSize, samplingCount, stepSize);
    scanSize = (samplingCount - 1) * stepSize;

    return {
      scanSize,
      stepSize,
      samplingCount,
    };
  };
});
