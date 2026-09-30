#!/usr/bin/bash

set -e
set -o pipefail

# Read version from 'pyproject.toml'
version=$(grep -Po '(?<=version = ")[^"]*' pyproject.toml)
echo "Releasing version $version"

# Create a new Git tag for the release
git tag -a "v$version" -m "Release version $version"
git push origin "v$version"

echo "Release $version created and pushed successfully."