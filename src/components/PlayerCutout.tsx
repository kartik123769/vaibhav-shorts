// src/components/PlayerCutout.tsx

import React from 'react';
import { useCurrentFrame, spring, interpolate, useVideoConfig } from 'remotion';
import { COLORS } from '../constants/colors';
import { SPRING_CONFIGS } from '../constants/timing';

interface PlayerCutoutProps {
  imageSrc?: string;    // staticFile('images/...') — optional; shows placeholder if missing
  name: string;
  accentColor?: string;
  startFrame?: number;
  enterFrom?: 'left' | 'right' | 'bottom';
  width?: number;
  height?: number;
  showName?: boolean;
}

export const PlayerCutout: React.FC<PlayerCutoutProps> = ({
  imageSrc,
  name,
  accentColor = COLORS.orange,
  startFrame = 0,
  enterFrom = 'bottom',
  width = 340,
  height = 500,
  showName = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const entrance = spring({
    frame: localFrame,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const getTransform = () => {
    switch (enterFrom) {
      case 'left':
        return `translateX(${interpolate(entrance, [0, 1], [-200, 0])}px)`;
      case 'right':
        return `translateX(${interpolate(entrance, [0, 1], [200, 0])}px)`;
      case 'bottom':
      default:
        return `translateY(${interpolate(entrance, [0, 1], [120, 0])}px)`;
    }
  };

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.85, 1]);

  return (
    <div
      style={{
        width,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        transform: `${getTransform()} scale(${scale})`,
        opacity,
      }}
    >
      {/* Image area */}
      <div
        style={{
          width,
          height,
          borderRadius: 20,
          overflow: 'hidden',
          background: `linear-gradient(180deg, ${accentColor}22, ${COLORS.bg})`,
          border: `2px solid ${accentColor}44`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
            }}
            alt={name}
          />
        ) : (
          // Asset placeholder
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              color: COLORS.subtext,
            }}
          >
            <div style={{ fontSize: 80 }}>🏏</div>
            <div
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textAlign: 'center',
                padding: '0 20px',
              }}
            >
              [{name.toUpperCase()} CUTOUT]
            </div>
          </div>
        )}

        {/* Bottom gradient fade */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
            background: `linear-gradient(transparent, ${COLORS.bg})`,
          }}
        />

        {/* Accent glow border */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 20,
            boxShadow: `inset 0 0 40px ${accentColor}11`,
          }}
        />
      </div>

      {showName && (
        <div
          style={{
            fontFamily: "'Bebas Neue', 'Impact', sans-serif",
            fontSize: 36,
            color: COLORS.white,
            letterSpacing: '0.06em',
            textShadow: `0 0 20px ${accentColor}`,
          }}
        >
          {name}
        </div>
      )}
    </div>
  );
};
