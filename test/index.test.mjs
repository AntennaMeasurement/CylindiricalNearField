// CommonJS version
// const assert = require("node:assert/strict");
// const test = require("node:test");
// const {
//   measurementDistance,
//   probeRadius,
//   samplingCountAzimuth,
//   samplingCountY,
//   scanSizeY,
//   stepSizeAzimuth,
//   stepSizeY,
//   wavelength,
// } = require("../index.js");

// ES module version
import assert from "node:assert/strict";
import test from "node:test";
import {
  measurementDistance,
  probeRadius,
  samplingCountAzimuth,
  samplingCountY,
  scanSizeY,
  samplingParametersY,
  stepSizeAzimuth,
  stepSizeY,
  wavelength,
} from "../index.mjs";

test("wavelength and measurement distance", () => {
  const frequency = 299792458;
  assert.equal(wavelength(frequency), 1);
  assert.equal(measurementDistance(frequency, 5), 5 * wavelength(frequency));
  assert.equal(measurementDistance(frequency), 5 * wavelength(frequency));
});

test("probe radius", () => {
  assert.ok(Math.abs(probeRadius(3, [0.4, 0.6, 1.195, 0.2]) - 0.605) < 1e-12);
});

test("Y scan geometry and sampling", () => {
//   assert.equal(Math.round(scanSizeY(0.2, 0.247, 2.5, 0.6, 180, 60) * 1e3) / 1e3, 11.186);
  assert.equal(stepSizeY(1.1e9), 0.136);
  let initialScanSize = scanSizeY(0.370, 0, 1.735, 0.25, 90, 57);
  let samplingParameters = samplingParametersY(0.370, 0, 1.735, 0.25, 90, 57, 1.1E9);
  assert.equal(samplingParameters.scanSize, 2.992*2);
  assert.equal(samplingParameters.stepSize, 0.136);
  assert.equal(samplingParameters.samplingCount, 45);
//   assert.equal(scanSizeY(0.370, 0, 1.735, 0.25, 90, 56, 1.1E9), 11.186);
//   assert.equal(scanSizeY(0.370, 0, 1.735, 0.25, 90, 56, 1.1E9), 11.186);

//   assert.equal(samplingCountY(6, 1.2e9), 51);
//   const samplingParameters = samplingParametersY(0.2, 0.247, 2.5, 0.6, 180, 60, 1.2e9);
//   assert.equal(samplingParameters.stepSize, 0.124);
//   assert.equal(samplingParameters.samplingCount, 51);
//   assert.equal(samplingParameters.stepSize*samplingParameters.samplingCount, samplingParameters.scanSizeY);
});

// test("azimuth sampling", () => {
//   assert.equal(stepSizeAzimuth(1.2e9, 0.6), 6);
//   assert.equal(samplingCountAzimuth(180, 1.2e9, 0.6), 61);
// });

// test("input validation", () => {
//   assert.throws(() => scanSizeY(0.2, 0.247, 2.5, 0.6, 180, 60.1), RangeError);
//   assert.throws(() => scanSizeY(0.2, 0.247, 0.6, 0.6, 180, 30), RangeError);
//   assert.throws(() => samplingCountAzimuth(180.1, 1.2e9, 0.6), RangeError);
// });  const stepSizeMillimeters =  stepSizeY(frequency) * 1e3;