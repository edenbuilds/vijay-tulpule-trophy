#!/bin/sh
# Usage: scripts/add-photos.sh <folder of camera JPGs> <YYYY-MM-DD>
# Camera originals are 5-18 MB; this writes a 2000px web copy into public/matchday/<date>/, which the
# home carousel lists automatically on the next deploy. Originals are never modified.
set -e
dest="$(dirname "$0")/../public/matchday/$2"; mkdir -p "$dest"
for f in "$1"/*.[jJ][pP][gG]; do
  out="$dest/$(basename "$f" | tr 'A-Z' 'a-z' | sed 's/\.jpg$//').jpg"
  [ -f "$out" ] || sips -Z 2000 -s format jpeg -s formatOptions 78 "$f" --out "$out" >/dev/null
done
ls "$dest" | wc -l
