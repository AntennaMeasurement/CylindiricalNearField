"""Utilities for cylindrical near-field antenna measurements."""

from importlib.metadata import version

from .core import (
	wavelength,
	measurementDistance,
	probeRadius,
	scanSizeY,
	stepSizeY,
	samplingCountY,
	stepSizeAzimuth,
	samplingCountAzimuth,
)

__version__ = version("CylindiricalNearField")

# Public functions exposed by the package (constant c is intentionally omitted).

__all__ = [
	"wavelength",
	"measurementDistance",
	"probeRadius",
	"scanSizeY",
	"stepSizeY",
	"samplingCountY",
	"stepSizeAzimuth",
	"samplingCountAzimuth",
]
