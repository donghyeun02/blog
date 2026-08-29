#!/bin/bash
# SVG를 PNG로 렌더해서 눈으로 확인
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
W=$(grep -oE 'width="[0-9]+"' "$1" | head -1 | grep -oE '[0-9]+')
H=$(grep -oE 'height="[0-9]+"' "$1" | head -1 | grep -oE '[0-9]+')
"$CHROME" --headless --disable-gpu --screenshot="$2" \
  --window-size=$W,$H --default-background-color=FFFFFFFF \
  --hide-scrollbars "file://$(cd "$(dirname "$1")"; pwd)/$(basename "$1")" 2>/dev/null
ls -la "$2" 2>/dev/null | awk '{print "  렌더:", $9, $5, "bytes"}'
