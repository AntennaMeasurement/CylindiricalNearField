(function (root) {
  "use strict";

  const isCommonJS = typeof module === "object" && module.exports;
  const api = isCommonJS
    ? Object.assign(
      {},
      {
        wavelength: require("./lib/wavelength"),
        measurementDistance: require("./lib/measurement-distance"),
        probeRadius: require("./lib/probe-radius"),
      },
      {
        scanSizeY: require("./lib/scan-size-y"),
        stepSizeY: require("./lib/step-size-y"),
        samplingCountY: require("./lib/sampling-count-y"),
        samplingParametersY: require("./lib/sampling-parameters-y"),
        stepSizeAzimuth: require("./lib/step-size-azimuth"),
        samplingCountAzimuth: require("./lib/sampling-count-azimuth"),
      },
    )
    : root.CylindiricalNearField || {};

  if (isCommonJS) {
    module.exports = api;
  } else {
    root.CylindiricalNearField = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
