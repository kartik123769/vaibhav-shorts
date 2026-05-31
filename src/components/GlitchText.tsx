// src/components/GlitchText.tsx

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../constants/colors';

interface GlitchTextProps {
  text: string;
  fontSize?: number;
  color?: string;
  glitchColor1?: string;
  glitchColor2?: string;
  intensity?: number; // 0-1
  style?: React.CSSProperties;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  fontSize = 80,
  color = COLORS.white,
  glitchColor1 = COLORS.red,
  glitchColor2 = COLORS.magenta,
  intensity = 1,
  style,
}) => {
  const frame = useCurrentFrame();

  // Pseudo-random glitch offsets driven by frame number
  const seed1 = Math.sin(frame * 7.3 + 1.1) * intensity;
  const seed2 = Math.sin(frame * 13.7 + 2.4) * intensity;
  const seed3 = Math.cos(frame * 5.9 + 0.7) * intensity;

  const offsetX1 = seed1 * 8;
  const offsetY1 = seed2 * 4;
  const offsetX2 = seed3 * -6;
  const offsetY2 = seed1 * -3;

  // Only glitch on specific frames for realism
  const shouldGlitch = (frame % 7 < 2) || (frame % 11 < 1);
  const glitchScale = shouldGlitch ? intensity : 0;

  const baseStyle: React.CSSProperties = {
    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
    fontSize,
    fontWeight: 900,
    letterSpacing: '0.04em',
    lineHeight: 1,
    color,
    position: 'relative',
    display: 'inline-block',
    textTransform: 'uppercase',
    ...style,
  };

  const layerStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Chromatic aberration layer 1 — Red */}
      <span
        style={{
          ...baseStyle,
          ...layerStyle,
          color: glitchColor1,
          transform: `translate(${offsetX1 * glitchScale}px, ${offsetY1 * glitchScale}px)`,
          opacity: 0.7 * glitchScale,
          clipPath: frame % 13 < 3 ? 'inset(20% 0 60% 0)' : 'inset(60% 0 10% 0)',
        }}
      >
        {text}
      </span>

      {/* Chromatic aberration layer 2 — Cyan/Magenta */}
      <span
        style={{
          ...baseStyle,
          ...layerStyle,
          color: glitchColor2,
          transform: `translate(${offsetX2 * glitchScale}px, ${offsetY2 * glitchScale}px)`,
          opacity: 0.6 * glitchScale,
          clipPath: frame % 9 < 2 ? 'inset(40% 0 30% 0)' : 'inset(10% 0 70% 0)',
        }}
      >
        {text}
      </span>

      {/* Main layer */}
      <span style={baseStyle}>{text}</span>
    </div>
  );
};
