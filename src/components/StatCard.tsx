// src/components/StatCard.tsx

import React from 'react';
import { useCurrentFrame, spring, interpolate, useVideoConfig } from 'remotion';
import { COLORS } from '../constants/colors';
import { SPRING_CONFIGS } from '../constants/timing';

interface StatCardProps {
  label: string;
  value: string;
  emoji?: string;
  accentColor?: string;
  startFrame?: number;
  index?: number; // stagger offset
  tilt?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  emoji = '',
  accentColor = COLORS.orange,
  startFrame = 0,
  index = 0,
  tilt = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame - index * 8;

  const entrance = spring({
    frame: localFrame,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const scale = interpolate(entrance, [0, 1], [0.6, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateY = interpolate(entrance, [0, 1], [60, 0]);

  // Subtle pulse every few seconds
  const pulse = interpolate(
    Math.sin((frame + index * 20) * 0.08),
    [-1, 1],
    [0.97, 1.03]
  );

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${COLORS.bgCard}, ${accentColor}18)`,
        border: `2px solid ${accentColor}55`,
        borderRadius: 24,
        padding: '32px 40px',
        transform: `translateY(${translateY}px) scale(${scale * pulse}) rotate(${tilt}deg)`,
        opacity,
        boxShadow: `0 0 40px ${accentColor}22, inset 0 1px 0 rgba(255,255,255,0.06)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: accentColor,
          opacity: 0.08,
          filter: 'blur(40px)',
        }}
      />

      {/* Top accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }}
      />

      <div
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 26,
          fontWeight: 700,
          color: COLORS.subtext,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontFamily: "'Bebas Neue', 'Impact', sans-serif",
          fontSize: 72,
          fontWeight: 900,
          color: COLORS.white,
          lineHeight: 1,
          letterSpacing: '-0.01em',
        }}
      >
        {emoji && <span style={{ marginRight: 8 }}>{emoji}</span>}
        {value}
      </div>
    </div>
  );
};
