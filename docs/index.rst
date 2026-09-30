CylindiricalNearField
=======================

Support functions for planning cylindrical near-field antenna measurements.
The package calculates wavelength, measurement distances, probe radius, scan
dimensions, and sampling steps and counts.

Install the package from PyPI or from a local checkout:

.. code-block:: console

   python -m pip install CylindiricalNearField

Quick start
-----------

.. code-block:: python

   from CylindiricalNearField import measurementDistance, probeRadius

   distance = measurementDistance(1.2e9)
   radius = probeRadius(3.0, [0.4, 0.6, 1.195, 0.2])

The functions accept distances in meters, frequencies in hertz, and angles in
degrees unless the API reference says otherwise. The measurement distance
defaults to five wavelengths.

API reference
-------------

.. toctree::
   :maxdepth: 2

   api