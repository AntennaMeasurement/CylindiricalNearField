import math

################################################################################
# Physical constants 
################################################################################

# speed of light in vacuum (m/s)
c = 299792458

################################################################################
# Functions
################################################################################
def wavelength(frequency: float) -> float:
  r"""Calculate the wavelength for a given frequency.

  Parameters
  ----------
  frequency : float
      Frequency in hertz.

  Returns
  -------
  float
      Wavelength in meters.

  Notes
  -----
  The wavelength is calculated as:

  .. math::

      \lambda = \frac{c}{f}

  where :math:`c` is the speed of light in vacuum and :math:`f` is the
  frequency.
  """
  return c / frequency


def measurementDistance(frequency: float, coefficient: float = 5) -> float:
  r"""Calculate the required measurement distance for a given frequency in terms of the wavelength.

  Parameters
  ----------
  frequency : float
      Frequency in hertz.
  coefficient : float, optional
      Coefficient to multiply the wavelength by, default 5

  Returns
  -------
  float
      Measurement distance in meters.

  Notes
  -----
  The measurement distance is calculated as:

  .. math::

      d = \text{coefficient} \cdot \lambda

  where :math:`\lambda` is the wavelength corresponding to the frequency :math:`f`.
  """
  return coefficient * wavelength(frequency)
  
  
def probeRadius(ref_distance: float, lengths: list[float]) -> float:
  r"""Calculate the probe radius based on a reference distance and a list of lengths.

  Parameters
  ----------
  ref_distance : float
      Reference distance in meters.
  lengths : list[float]
      List of lengths in meters.

  Returns
  -------
  float
      Probe radius in meters.

  Notes
  -----
  The probe radius is calculated reference distance minus sum of the other lengths.
  
  .. math::

      r = R_ref - \sum_i \text{l}_i
      
  where :math:`R_ref` is the reference distance and :math:`l_i` are the individual lengths in the list.
  
  """
  return ref_distance - sum(lengths)


def scanSizeY(D: float, P: float, Z: float, R: float, Az_max: float, El_max: float ) -> float:
  r"""Calculate the scan size in the Y direction based distances and desired far-field angle spans.

  Parameters
  ----------
  D : float
      Antenna height in meters.
  P : float
      Probe longest edge length in meters.
  Z : float
      Probe radius in meters.
  R : float
      Maximum radial extent in meters.
  Az_max : float
      Desired maximum azimuth angle in degrees.
  El_max : float
      Desired maximum elevation angle in degrees. Should be equal or less than 60

  Returns
  -------
  float
      Scan size in the Y direction in meters.

  Notes
  -----
  The scan size in the Y direction is calculated based on the given parameters.
  
  .. math::

      L_Y = D + P + 2 \cdot (Z - R \cdot \cos(\text{Az_max})) \cdot \tan(\text{El_max})

  References
  ----------
  .. [1] *NSI 2000 (Near-field Edition), Version 4, Software Operating Manual*
    
  """
  
  # First validate the input parameters
  if El_max > 60:
    raise ValueError("El_max should be equal or less than 60 degrees.")
  
  # Z distance must greater than R (MRE)
  if Z <= R:
    raise ValueError("Z distance must be greater than R (MRE).")
  
  return D + P + 2*(Z-R*math.cos(math.radians(Az_max)))*math.tan(math.radians(El_max))

def stepSizeY(scan_size: float, frequency: float) -> float:
  r"""Calculate the step size in the Y direction based on the scan size and frequency.

  Parameters
  ----------
  scan_size : float
      Scan size in the Y direction in meters.
  frequency : float
      Frequency in Hz.

  Returns
  -------
  float
      Step size in the Y direction in meters.

  Notes
  -----
  The step size in the Y direction is typically calculated as a fraction of the wavelength corresponding to the given frequency.
  
  ..math::
    \Delta_Y = \frac{\lambda}{2}
  """
  
  dy = wavelength(frequency) / 2
  
  return round(math.floor(int(dy*1E3))/1E3,3)  # round to the lower nearest millimeter
  

def samplingCountY(scan_size: float, frequency: float) -> int:
  r"""Calculate the number of sampling points in the Y direction based on the scan size and frequency.

  Parameters
  ----------
  scan_size : float
      Scan size in the Y direction in meters.
  frequency : float
      Frequency in Hz.

  Returns
  -------
  int
      Number of sampling points in the Y direction.

  Notes
  -----
  The number of sampling points is calculated as the scan size divided by the step size in the Y direction.
  
  .. math::
    N_Y = \frac{2 \cdot \lceil L_Y / 2 \rceil}{\Delta_Y} + 1
  
  """
  
  step_size_mm   = int(stepSizeY(scan_size, frequency) * 1E3)
  scan_length_mm = math.ceil(scan_size * 1E3)
  
  half_scan_length_mm = scan_length_mm / 2 if scan_length_mm%2 == 0 else (scan_length_mm + 1) / 2
  if half_scan_length_mm % step_size_mm > 0:
    half_scan_length_mm = half_scan_length_mm + (step_size_mm - half_scan_length_mm % step_size_mm)
      
  return 2*int(half_scan_length_mm / step_size_mm)+1


def stepSizeAzimuth(frequency: float, MRE: float) -> float:
  r"""Calculate the step size in the azimuth direction based on the maximum azimuth angle and frequency.

  Parameters
  ----------
  Az_max : float
      Maximum azimuth angle in degrees along one side.
  frequency : float
      Frequency in Hz.
  MRE : float
      Maximum radial extend in meters.

  Returns
  -------
  float
      Step size in the azimuth direction in meters.

  Notes
  -----
  The step size in the azimuth direction is typically calculated as a fraction of the wavelength corresponding to the given frequency.
  
  ..math::
    \Delta_{Az} = \frac{\lambda}{2}
  """
  
  Naz = math.ceil(2*(2*math.pi*MRE/wavelength(frequency)+10)+1)
  
  if Naz%2 == 0:
      Naz += 1
      
  daz = 360 / (Naz-1)
  while math.floor(daz*1000)%250 != 0:
      Naz += 2
      daz = 360 / (Naz-1)
        
  return daz

def samplingCountAzimuth(Az_max: float, frequency: float, MRE: float) -> int:
  r"""Calculate the number of sampling points in the azimuth direction based on the maximum azimuth angle and frequency.

  Parameters
  ----------
  Az_max : float
      Maximum azimuth angle in degrees along one side.
  frequency : float
      Frequency in Hz.
  MRE : float
      Maximum radial extend in meters.

  Returns
  -------
  int
      Number of sampling points in the azimuth direction.

  Notes
  -----
  The number of sampling points is calculated as the azimuth range divided by the step size in the azimuth direction.
  
  .. math::
    N_{Az} = \frac{2 \cdot \lceil Az_{max} / 2 \rceil}{\Delta_{Az}} + 1
  
  """
  
  # Check if Az_max is integer nultplies of 0.250 degree
  if math.floor(Az_max*1000)%250 != 0:
    raise ValueError("Az_max must be an integer multiple of 0.250 degrees.")
  
  Naz = math.ceil(2*(2*math.pi*MRE/wavelength(frequency)+10)+1)
  
  if Naz%2 == 0:
      Naz += 1
      
  daz = Az_max / (Naz-1)
  while math.floor(daz*1000)%250 != 0:
      Naz += 2
      daz = Az_max / (Naz-1)
        
  return Naz
  