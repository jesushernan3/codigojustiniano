#!/usr/bin/env bash

ROOT="src"

find "$ROOT" -type f -name "*.md" ! -name "*.clean.md" -print0 |
while IFS= read -r -d '' f; do

  base="$(basename "$f")"

  nums=($(grep -oE '[0-9]+' <<<"$base"))

  [[ ${#nums[@]} -ge 2 ]] || { echo "skip: $base"; continue; }

  libro=$((10#${nums[1]}))

  echo "Fixing $f → Libro $libro"

  # frontmatter
  sed -i -E "s/(book:[[:space:]]*\")([Ll]ibro)[[:space:]]+[0-9]+/\1Libro $libro/" "$f"

  # headings
  sed -i -E "s/^([#]{1,6}[[:space:]]*)([Ll][Ii][Bb][Rr][Oo])[[:space:]]+[0-9]+/\1Libro $libro/" "$f"

done