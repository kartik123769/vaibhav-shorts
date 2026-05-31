// src/components/FlashTransition.tsx

import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

interface FlashTransitionProps {
  /** Frame within THIS scene when the flash occurs */
  atFrame: number;
  durationFrames?: number;
  color?: string;
}

export const FlashTransition: React.FC<FlashTransitionProps> = ({
  atFrame,
  durationFrames = 6,
  color = '#FFFFFF',
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - atFrame;

  const opacity = interpolate(
    localFrame,
    [0, durationFrames * 0.3, durationFrames],
    [0, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  if (opacity <= 0) return null;

  return (
    <AbsoluteFill
      style={{
        background: color,
        opacity,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

// Shockwave ring pulse
interface ShockwaveProps {
  startFrame: number;
  x?: string;
  y?: string;
  color?: string;
}

export const Shockwave: React.FC<ShockwaveProps> = ({
  startFrame,
  x = '50%',
  y = '50%',
  color = '#FF4500',
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;

  const scale = interpolate(local, [0, 40], [0, 4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(local, [0, 10, 40], [0.9, 0.6, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: 200,
        height: 200,
        borderRadius: '50%',
        border: `6px solid ${color}`,
        opacity,
        pointerEvents: 'none',
      }}
    />
  );
};
