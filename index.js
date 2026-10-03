(function (root) {
  "use strict";

  const isCommonJS = typeof module === "object" && module.exports;
  const api = isCommonJS
    ? Object.assign(
      {},
      {
        wavelength: require("./lib/wavelength"),
        measurementDistance: require("./lib/measurementDistance"),
        probeRadius: require("./lib/probeRadius"),
      },
      {
        scanSizeY: require("./lib/scanSizeY"),
        stepSizeY: require("./lib/stepSizeY"),
        samplingCountY: require("./lib/samplingCountY"),
        samplingParametersY: require("./lib/samplingParametersY"),
        stepSizeAzimuth: require("./lib/stepSizeAzimuth"),
        samplingCountAzimuth: require("./lib/samplingCountAzimuth"),
      },
    )
    : root.CylindiricalNearField || {};

  if (isCommonJS) {
    module.exports = api;
  } else {
    root.CylindiricalNearField = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
