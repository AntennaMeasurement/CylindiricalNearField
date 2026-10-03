(function (root, factory) {
  const stepSizeY = typeof module === "object" && module.exports
    ? require("./stepSizeY")
    : root.CylindiricalNearField.stepSizeY;
  const samplingCountY = factory(stepSizeY);
  if (typeof module === "object" && module.exports) {
    module.exports = samplingCountY;
  } else {
    root.CylindiricalNearField.samplingCountY = samplingCountY;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (stepSizeY) {
  "use strict";

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
  return function samplingCountY(scan_size, frequency) {
    const stepSizeMillimeters = stepSizeY(frequency) * 1e3;
    const scanLengthMillimeters = Math.ceil(scan_size * 1e3);
    let halfScanLengthMillimeters = scanLengthMillimeters % 2 === 0
      ? scanLengthMillimeters / 2
      : (scanLengthMillimeters + 1) / 2;

    const remainder = halfScanLengthMillimeters % stepSizeMillimeters;
    if (remainder > 0) {
      halfScanLengthMillimeters += stepSizeMillimeters - remainder;
    }

    return 2 * Math.trunc(halfScanLengthMillimeters / stepSizeMillimeters) + 1;
  };
});
