// src/components/AnimatedCounter.tsx

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../constants/colors';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  durationFrames?: number;
  startFrame?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  prefix = '',
  suffix = '',
  durationFrames = 90,
  startFrame = 0,
  fontSize = 140,
  color = COLORS.white,
  fontWeight = 900,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const value = interpolate(
    localFrame,
    [0, durationFrames],
    [from, to],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    }
  );

  return (
    <span
      style={{
        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
        fontSize,
        fontWeight,
        color,
        letterSpacing: '-0.02em',
        lineHeight: 1,
        display: 'inline-block',
      }}
    >
      {prefix}{Math.round(value)}{suffix}
    </span>
  );
};
