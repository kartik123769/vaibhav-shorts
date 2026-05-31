// src/components/ScoreboardGraphic.tsx

import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS } from '../constants/colors';
import { AnimatedCounter } from './AnimatedCounter';

interface BarDatum {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  emoji?: string;
}

interface ScoreboardGraphicProps {
  title: string;
  bars: BarDatum[];
  startFrame?: number;
}

export const ScoreboardGraphic: React.FC<ScoreboardGraphicProps> = ({
  title,
  bars,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const headerEntrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 180 },
  });

  return (
    <div
      style={{
        width: '100%',
        background: `linear-gradient(180deg, ${COLORS.bgCard}, ${COLORS.bg})`,
        borderRadius: 24,
        border: `1px solid ${COLORS.border}`,
        padding: '36px 32px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Title */}
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 40,
          color: COLORS.white,
          letterSpacing: '0.06em',
          marginBottom: 32,
          transform: `translateY(${interpolate(headerEntrance, [0, 1], [30, 0])}px)`,
          opacity: headerEntrance,
        }}
      >
        {title}
      </div>

      {/* Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {bars.map((bar, i) => {
          const barEntrance = spring({
            frame: localFrame - i * 12,
            fps,
            config: { damping: 14, stiffness: 160 },
          });

          const fillPct = interpolate(
            barEntrance,
            [0, 1],
            [0, (bar.value / bar.maxValue) * 100],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          const opacity = interpolate(barEntrance, [0, 0.3, 1], [0, 1, 1]);

          return (
            <div key={i} style={{ opacity, transform: `translateX(${interpolate(barEntrance, [0, 1], [-40, 0])}px)` }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700,
                }}
              >
                <span style={{ fontSize: 22, color: COLORS.subtext, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {bar.emoji} {bar.label}
                </span>
                <span style={{ fontSize: 24, color: bar.color, letterSpacing: '-0.01em' }}>
                  {bar.value.toLocaleString()}
                </span>
              </div>

              <div
                style={{
                  height: 20,
                  background: COLORS.bgElevated,
                  borderRadius: 10,
                  overflow: 'hidden',
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <div
                  style={{
                    width: `${fillPct}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${bar.color}88, ${bar.color})`,
                    borderRadius: 10,
                    boxShadow: `0 0 12px ${bar.color}66`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: `${(localFrame * 1.5) % 200 - 80}%`,
                      width: '40%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transform: 'skewX(-15deg)',
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
