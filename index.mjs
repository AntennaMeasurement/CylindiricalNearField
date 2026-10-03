import { createRequire } from "node:module";

const lib = createRequire(import.meta.url)("./index.js");

export const {
  wavelength,
  measurementDistance,
  probeRadius,
  scanSizeY,
  stepSizeY,
  samplingCountY,
  samplingParametersY,
  stepSizeAzimuth,
  samplingCountAzimuth,
} = lib;
export default lib;
