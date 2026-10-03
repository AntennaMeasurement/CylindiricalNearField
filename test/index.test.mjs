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
  assert.equal(Math.round(scanSizeY(0.2, 0.247, 2.5, 0.6, 180, 60) * 1e3) / 1e3, 11.186);
  assert.equal(stepSizeY(6, 1.2e9), 0.124);
  assert.equal(samplingCountY(6, 1.2e9), 51);
});

test("azimuth sampling", () => {
  assert.equal(stepSizeAzimuth(1.2e9, 0.6), 6);
  assert.equal(samplingCountAzimuth(180, 1.2e9, 0.6), 61);
});

test("input validation", () => {
  assert.throws(() => scanSizeY(0.2, 0.247, 2.5, 0.6, 180, 60.1), RangeError);
  assert.throws(() => scanSizeY(0.2, 0.247, 0.6, 0.6, 180, 30), RangeError);
  assert.throws(() => samplingCountAzimuth(180.1, 1.2e9, 0.6), RangeError);
});