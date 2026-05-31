import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { COLORS } from '../constants/colors';

interface FloatingCardProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  startFrame?: number;
  accentColor?: string;
  title?: string;
  value?: string;
  subtext?: string;
  floatAmplitude?: number;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  x,
  y,
  width = 280,
  height = 160,
  startFrame = 0,
  accentColor = COLORS.orange,
  title,
  value,
  subtext,
  floatAmplitude = 8,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;

  const entryProgress = interpolate(localFrame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const floatY = localFrame >= 0
    ? Math.sin((localFrame / fps) * 2 * Math.PI * 0.6) * floatAmplitude
    : 0;

  const translateY = interpolate(entryProgress, [0, 1], [40, 0]) + floatY;
  const opacity = entryProgress;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        opacity,
        transform: `translateY(${translateY}px)`,
        background: 'rgba(10,10,10,0.82)',
        border: `2px solid ${accentColor}`,
        borderRadius: 12,
        boxShadow: `0 0 24px ${accentColor}55, inset 0 0 12px ${accentColor}18`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '16px 20px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        width: '80%',
        height: 3,
        background: accentColor,
        borderRadius: '0 0 4px 4px',
        boxShadow: `0 0 10px ${accentColor}`,
      }} />

      {title && (
        <div style={{
          fontFamily: 'monospace',
          fontSize: 13,
          letterSpacing: 3,
          color: accentColor,
          textTransform: 'uppercase',
          opacity: 0.85,
        }}>
          {title}
        </div>
      )}

      {value && (
        <div style={{
          fontFamily: 'monospace',
          fontSize: 42,
          fontWeight: 900,
          color: '#FFFFFF',
          letterSpacing: 2,
          lineHeight: 1,
          textShadow: `0 0 20px ${accentColor}99`,
        }}>
          {value}
        </div>
      )}

      {subtext && (
        <div style={{
          fontFamily: 'monospace',
          fontSize: 11,
          color: '#AAAAAA',
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}>
          {subtext}
        </div>
      )}
    </div>
  );
};
