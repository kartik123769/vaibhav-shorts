// src/scenes/Scene5Truth.tsx
// 0:30–0:37 | 420 frames @ 60fps
// Trophy shatters, fear sets in

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
} from 'remotion';
import { COLORS } from '../constants/colors';
import { SAFE_ZONE } from '../constants/timing';
import { GlitchText } from '../components/GlitchText';
import { ShatterEffect } from '../components/ShatterEffect';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { FlashTransition } from '../components/FlashTransition';

// SVG probability gauge
const ProbabilityGauge: React.FC<{ value: number; frame: number }> = ({ value, frame }) => {
  const { fps } = useVideoConfig();
  const animated = spring({ frame: frame - 80, fps, config: { damping: 20, stiffness: 60 } });
  const currentValue = interpolate(animated, [0, 1], [100, value]);

  const radius = 80;
  const circumference = Math.PI * radius; // half circle
  const strokeDashoffset = circumference - (currentValue / 100) * circumference;

  const gaugeColor = currentValue > 50 ? COLORS.green : currentValue > 25 ? COLORS.amber : COLORS.red;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg width={200} height={110} viewBox="0 0 200 110">
        {/* Background arc */}
        <path
          d="M 10,100 A 90,90 0 0 1 190,100"
          fill="none"
          stroke={COLORS.bgElevated}
          strokeWidth={16}
          strokeLinecap="round"
        />
        {/* Animated value arc */}
        <path
          d="M 10,100 A 90,90 0 0 1 190,100"
          fill="none"
          stroke={gaugeColor}
          strokeWidth={16}
          strokeLinecap="round"
          strokeDasharray={`${Math.PI * 90} ${Math.PI * 90}`}
          strokeDashoffset={(1 - currentValue / 100) * Math.PI * 90}
          style={{ filter: `drop-shadow(0 0 8px ${gaugeColor})` }}
        />
        {/* Center value */}
        <text
          x="100"
          y="96"
          textAnchor="middle"
          fill={gaugeColor}
          fontSize="32"
          fontFamily="'Bebas Neue', sans-serif"
          fontWeight="900"
        >
          {Math.round(currentValue)}%
        </text>
      </svg>
      <div
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 18,
          color: COLORS.subtext,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        TROPHY PROBABILITY
      </div>
    </div>
  );
};

// Rolling year counter
const RollingYears: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  const yearProgress = spring({ frame: local, fps, config: { damping: 18, stiffness: 80 } });
  const year = Math.round(interpolate(yearProgress, [0, 1], [2025, 2028]));

  return (
    <div
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 72,
        color: COLORS.dim,
        letterSpacing: '-0.01em',
        lineHeight: 1,
        textAlign: 'center',
      }}
    >
      <span style={{ color: COLORS.subtext, fontSize: 32, display: 'block', marginBottom: 4 }}>
        CURRENTLY
      </span>
      {year}...
    </div>
  );
};

// Trophy visual (placeholder)
const TrophyVisual: React.FC<{ shatterFrame: number }> = ({ shatterFrame }) => {
  const frame = useCurrentFrame();

  // Desaturate before shatter
  const saturation = interpolate(frame, [20, shatterFrame], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const trophyEl = (
    <div
      style={{
        width: 160,
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(180deg, #FFD700, #B8860B)`,
        borderRadius: '12px 12px 40px 40px',
        filter: `saturate(${saturation}%)`,
        boxShadow: frame < shatterFrame ? '0 0 60px #FFD70066' : 'none',
      }}
    >
      <div style={{ fontSize: 80 }}>🏆</div>
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 22,
          color: '#000',
          letterSpacing: '0.04em',
        }}
      >
        IPL TROPHY
      </div>
    </div>
  );

  return (
    <ShatterEffect startFrame={shatterFrame} width={160} height={200}>
      {trophyEl}
    </ShatterEffect>
  );
};

export const Scene5Truth: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const SHATTER_FRAME = 100;

  // Zoom blur entry
  const zoomIn = interpolate(frame, [0, 14], [1.15, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const blurIn = interpolate(frame, [0, 14], [15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Warning flash at shatter
  const warningFlash = interpolate(frame, [SHATTER_FRAME, SHATTER_FRAME + 6, SHATTER_FRAME + 12], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // "YEARS WASTING AWAY" — pulsing red warning
  const warningPulse = interpolate(Math.sin((frame - 140) * 0.2), [-1, 1], [0.6, 1]);

  // Text entrances
  const headline1 = spring({ frame: frame - 120, fps, config: { damping: 14, stiffness: 160 } });
  const headline2 = spring({ frame: frame - 160, fps, config: { damping: 14, stiffness: 160 } });

  // Hard cut exit to black flash
  const exitFlash = interpolate(frame, [410, 420], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        transform: `scale(${zoomIn})`,
        filter: `blur(${blurIn}px)`,
        overflow: 'hidden',
      }}
    >
      {/* Deep red bg glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${COLORS.scene5}18 0%, transparent 70%)`,
        }}
      />

      {/* Warning flash overlay at shatter */}
      <AbsoluteFill
        style={{
          background: COLORS.red,
          opacity: warningFlash * 0.5,
          pointerEvents: 'none',
        }}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: SAFE_ZONE.top + 40,
          paddingLeft: SAFE_ZONE.left,
          paddingRight: SAFE_ZONE.right,
          paddingBottom: SAFE_ZONE.bottom,
          gap: 28,
        }}
      >
        {/* Probability gauge */}
        <ProbabilityGauge value={2} frame={frame} />

        {/* Trophy — shatters at frame 100 */}
        <TrophyVisual shatterFrame={SHATTER_FRAME} />

        {/* Rolling year counter */}
        <RollingYears startFrame={140} />

        {/* Main headline */}
        <div
          style={{
            textAlign: 'center',
            transform: `translateY(${interpolate(headline1, [0, 1], [40, 0])}px)`,
            opacity: headline1,
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 72,
              color: COLORS.white,
              lineHeight: 1,
              letterSpacing: '0.03em',
            }}
          >
            TROPHY CHANCE:
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 96,
              color: COLORS.red,
              lineHeight: 1,
              letterSpacing: '0.02em',
              textShadow: `0 0 60px ${COLORS.red}88`,
            }}
          >
            2% 📉
          </div>
        </div>

        {/* "AS LONG AS HE STAYS IN RR" */}
        <div
          style={{
            textAlign: 'center',
            transform: `translateY(${interpolate(headline2, [0, 1], [30, 0])}px)`,
            opacity: headline2,
          }}
        >
          <div
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 34,
              color: COLORS.subtext,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            AS LONG AS HE STAYS IN RR
          </div>
        </div>

        {/* "YEARS WASTING AWAY" warning */}
        {frame > 140 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              opacity: warningPulse,
            }}
          >
            <span style={{ fontSize: 36 }}>⚠️</span>
            <GlitchText
              text="YEARS WASTING AWAY"
              fontSize={46}
              color={COLORS.red}
              intensity={0.5}
            />
          </div>
        )}
      </AbsoluteFill>

      {/* Black flash exit */}
      <AbsoluteFill
        style={{
          background: '#000',
          opacity: exitFlash,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
