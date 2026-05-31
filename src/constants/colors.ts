// src/constants/colors.ts

export const COLORS = {
  bg: '#0A0A0A',
  bgCard: '#111111',
  bgElevated: '#1A1A1A',

  orange: '#FF6B35',
  red: '#FF4500',
  magenta: '#E84393',
  green: '#00C851',
  amber: '#FFA500',

  white: '#F5F5F5',
  subtext: '#888888',
  dim: '#444444',
  border: '#222222',

  // Scene accent colors
  scene1: '#FF4500',
  scene2: '#FF6B35',
  scene3: '#FFA500',
  scene4: '#E84393',
  scene5: '#CC0000',
  scene6: '#00C851',
  scene7: '#FF4500',
} as const;

export type ColorKey = keyof typeof COLORS;
