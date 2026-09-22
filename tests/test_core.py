
from CylindiricalNearField.core import wavelength, c, measurementDistance, probeRadius

def test_wavelength():
    frequency = 299792458  # ~300 MHz
    expected = c / frequency
    calculated = wavelength(frequency)
    print("")
    print(f"- Arguments  :  frequency={frequency}")
    print(f"- Expected   : {expected}")
    print(f"- Calculated : {calculated}")
    assert calculated == expected
    
def test_measurementDistance():
    frequency = 299792458  # ~300 MHz
    coefficient = 5
    expected = coefficient * wavelength(frequency)
    calculated = measurementDistance(frequency, coefficient)
    print("")
    print(f"- Arguments  :  frequency={frequency}, coefficient={coefficient}")
    print(f"- Expected   : {expected}")
    print(f"- Calculated : {calculated}")
    assert calculated == expected
    
def test_probeRadius():
    ref_distance = 3
    lengths      = [0.4, 0.6, 1.195, 0.2]
    expected   = ref_distance - sum(lengths)
    calculated = probeRadius(ref_distance, lengths)
    print("")
    print(f"- Arguments  : ref_distance={ref_distance}, lengths={lengths}")
    print(f"- Expected   : {expected}")
    print(f"- Calculated : {calculated}")
    assert calculated == expected
    

def test_scanSizeY():
    from CylindiricalNearField.core import scanSizeY
    D = 0.2
    P = 0.247
    Z = 2.5
    R = 0.6
    Az_max = 180
    El_max = 60
    expected   = 11.186  # NSI2000 Output
    calculated = round(scanSizeY(D, P, Z, R, Az_max, El_max), 3)
    print("")
    print(f"- Arguments  : D={D}, P={P}, Z={Z}, R={R}, Az_max={Az_max}, El_max={El_max}")
    print(f"- Expected   : {expected}")
    print(f"- Calculated : {calculated}")
    assert calculated == expected
    
    
def test_stepSizeY():
    from CylindiricalNearField.core import stepSizeY
    scan_size  = 6.0
    frequency = 1.2E9  # ~1.2 GHz
    expected   = 0.124
    calculated = stepSizeY(scan_size, frequency)
    print("")
    print(f"- Arguments  : scan_size={scan_size}, frequency={frequency/1E9} GHz")
    print(f"- Expected   : {expected}")
    print(f"- Calculated : {calculated}")
    assert calculated == expected


def test_samplingCountY():
    from CylindiricalNearField.core import samplingCountY
    scan_size  = 6.0
    frequency =  1.2E9  # ~1.2 GHz
    expected   = 51  # Based on step size of 0.124 m
    calculated = samplingCountY(scan_size, frequency)
    print("")
    print(f"- Arguments  : scan_size={scan_size}, frequency={frequency/1E9} GHz")
    print(f"- Expected   : {expected}")
    print(f"- Calculated : {calculated}")
    assert calculated == expected
    
def test_stepSizeAzimuth():
    from CylindiricalNearField.core import stepSizeAzimuth
    frequency =  1.2E9  # ~1.2 GHz
    mre       = 0.6
    expected  = 6
    calculated = stepSizeAzimuth(frequency, mre)
    print("")
    print(f"- Arguments  : frequency={frequency/1E9} GHz, mre={mre}")
    print(f"- Expected   : {expected}")
    print(f"- Calculated : {calculated}")
    assert calculated == expected


def test_samplingCountAzimuth():
    from CylindiricalNearField.core import samplingCountAzimuth
    Az_max    = 180
    frequency = 1.2E9  # ~1.2 GHz
    mre       = 0.6
    expected  = 61  # Based on step size of 6 degrees
    calculated = samplingCountAzimuth(Az_max, frequency, mre)
    print("")
    print(f"- Arguments  : Az_max={Az_max}, frequency={frequency/1E9} GHz, mre={mre}")
    print(f"- Expected   : {expected}")
    print(f"- Calculated : {calculated}")
    assert calculated == expected