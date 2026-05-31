// src/components/ProgressBar.tsx

import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS } from '../constants/colors';

interface ProgressBarProps {
  label?: string;
  startFrame?: number;
  durationFrames?: number;
  fillPercent?: number;
  color?: string;
  bgColor?: string;
  height?: number;
  showPercentage?: boolean;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label = 'LOADING',
  startFrame = 0,
  durationFrames = 120,
  fillPercent = 100,
  color = COLORS.green,
  bgColor = COLORS.bgElevated,
  height = 24,
  showPercentage = true,
  showLabel = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const fill = interpolate(
    localFrame,
    [0, durationFrames],
    [0, fillPercent],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    }
  );

  const displayedPct = Math.round(fill);

  // Glow flicker
  const glowOpacity = interpolate(Math.sin(frame * 0.3), [-1, 1], [0.4, 1]);

  return (
    <div style={{ width: '100%' }}>
      {(showLabel || showPercentage) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 10,
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 28,
            letterSpacing: '0.08em',
          }}
        >
          {showLabel && <span style={{ color: COLORS.subtext }}>{label}</span>}
          {showPercentage && (
            <span style={{ color }}>{displayedPct}%</span>
          )}
        </div>
      )}

      <div
        style={{
          width: '100%',
          height,
          background: bgColor,
          borderRadius: height / 2,
          overflow: 'hidden',
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${fill}%`,
            background: `linear-gradient(90deg, ${color}AA, ${color})`,
            borderRadius: height / 2,
            boxShadow: `0 0 ${12 * glowOpacity}px ${color}`,
            transition: 'none',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Shine sweep */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: `${(localFrame * 2) % 200 - 100}%`,
              width: '60%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
              transform: 'skewX(-20deg)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
