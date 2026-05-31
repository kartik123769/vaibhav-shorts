// src/constants/timing.ts
// All durations in FRAMES @ 60fps

export const FPS = 60;

// Scene durations (frames @ 60fps)
export const SCENE_DURATIONS = {
  scene1: 300,   // 5s  — The Verdict
  scene2: 480,   // 8s  — The Sacrifice
  scene3: 420,   // 7s  — The Stats Drop
  scene4: 600,   // 10s — The Curse
  scene5: 420,   // 7s  — Brutal Truth
  scene6: 600,   // 10s — Escape Plan
  scene7: 660,   // 11s — Virat Warning
} as const;

export const TOTAL_FRAMES =
  SCENE_DURATIONS.scene1 +
  SCENE_DURATIONS.scene2 +
  SCENE_DURATIONS.scene3 +
  SCENE_DURATIONS.scene4 +
  SCENE_DURATIONS.scene5 +
  SCENE_DURATIONS.scene6 +
  SCENE_DURATIONS.scene7; // 3480 frames = 58s

// Transition durations
export const TRANSITION = {
  flash: 4,        // hard flash frame
  whipPan: 10,
  crossDissolve: 20,
  zoomBlur: 14,
  shatter: 18,
  wipeRight: 12,
} as const;

// Standard easing presets (used with Remotion spring)
export const SPRING_CONFIGS = {
  snappy: { damping: 12, stiffness: 200 },
  bouncy: { damping: 8, stiffness: 150 },
  smooth: { damping: 20, stiffness: 80 },
  heavy: { damping: 30, stiffness: 60 },
} as const;

// Safe zone insets (px) for mobile
export const SAFE_ZONE = {
  top: 120,
  bottom: 120,
  left: 60,
  right: 60,
} as const;

export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
