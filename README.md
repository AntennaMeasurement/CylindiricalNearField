# Antenna Measurement CNF

A Python package for cylindrical near-field antenna measurement support functions.

## Installation

```bash
pip install CylindiricalNearField
```

## Usage

As a library:

```python
from CylindiricalNearField import probeRadius

probeRadius(3, [0.4, 0.6, 1.195, 0.2])  # example usage
```

As a command line tool:

```bash
CylindiricalNearFieldCli
```

## Package Functions

The package provides the following functions:

- `wavelength(frequency: float) -> float`
- `measurementDistance(frequency: float, coefficient: float) -> float`
- `probeRadius(ref_distance: float, lengths: list[float]) -> float`
- `scanSizeY(D: float, P: float, Z: float, R: float, Az_max: float, El_max: float) -> float`
- `stepSizeY(scan_size: float, frequency: float) -> float`
- `samplingCountY(scan_size: float, frequency: float) -> int`
- `stepSizeAzimuth(frequency: float, MRE: float) -> float`
- `samplingCountAzimuth(Az_max: float, frequency: float, MRE: float) -> int`  

## Development

```bash
pip install -e .[test]
pytest --verbose -s
```
