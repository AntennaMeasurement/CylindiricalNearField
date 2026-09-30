"""Utilities for cylindrical near-field antenna measurements."""

from importlib.metadata import version

from CylindiricalNearField.core import wavelength, measurementDistance, probeRadius

__version__ = version("CylindiricalNearField")

__all__ = ["wavelength", "measurementDistance", "probeRadius"]
