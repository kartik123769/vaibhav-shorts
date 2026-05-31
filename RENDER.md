# Render Commands

## Setup
```bash
npm install
```

## Studio (live preview)
```bash
npm start
# Opens http://localhost:3000
```

## Full render — export-ready 1080x1920 @ 60fps
```bash
npx remotion render VaibhavShortsFullVideo \
  --output out/vaibhav-rr-shorts.mp4 \
  --codec h264 \
  --fps 60 \
  --height 1920 \
  --width 1080 \
  --jpeg-quality 95 \
  --concurrency 4
```

## Quick preview (half resolution, faster)
```bash
npx remotion render VaibhavShortsFullVideo \
  --output out/preview.mp4 \
  --codec h264 \
  --scale 0.5 \
  --fps 30
```

## Render single scene for iteration
```bash
# Scene 1 only
npx remotion render VaibhavShortsFullVideo \
  --output out/scene1.mp4 \
  --frames 0-299

# Scene 3 only (stats drop)
npx remotion render VaibhavShortsFullVideo \
  --output out/scene3.mp4 \
  --frames 780-1199
```

## Frame ranges (60fps)
| Scene | Start | End  | Duration |
|-------|-------|------|----------|
| 1     | 0     | 299  | 5s       |
| 2     | 300   | 779  | 8s       |
| 3     | 780   | 1199 | 7s       |
| 4     | 1200  | 1799 | 10s      |
| 5     | 1800  | 2219 | 7s       |
| 6     | 2220  | 2819 | 10s      |
| 7     | 2820  | 3479 | 11s      |

## Export for YouTube Shorts
```bash
# After render, verify with ffprobe:
ffprobe -v quiet -print_format json -show_streams out/vaibhav-rr-shorts.mp4 \
  | grep -E '"width"|"height"|"r_frame_rate"|"codec_name"'
# Expected: width=1080, height=1920, r_frame_rate=60/1, codec_name=h264
```
