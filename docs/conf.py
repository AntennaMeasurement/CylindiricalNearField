"""Sphinx configuration for CylindiricalNearField."""

from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

project = "CylindiricalNearField"
copyright = "2026, AntennaMeasurement"
author = "AntennaMeasurement"
release = "0.1.0"

extensions = [
    "sphinx.ext.autodoc",
    "sphinx.ext.napoleon",
    "sphinx.ext.mathjax",
]

templates_path = ["_templates"]
exclude_patterns = ["_build"]
html_theme = "sphinx_rtd_theme"
autodoc_member_order = "bysource"