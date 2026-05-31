// src/scenes/Scene3Stats.tsx
// 0:13–0:20 | 420 frames @ 60fps
// 700+ counter animation proof

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
import { AnimatedCounter } from '../components/AnimatedCounter';
import { StatCard } from '../components/StatCard';
import { ScoreboardGraphic } from '../components/ScoreboardGraphic';
import { FlashTransition } from '../components/FlashTransition';

const BAR_DATA = [
  { label: 'Vaibhav Suryavanshi', value: 734, maxValue: 800, color: COLORS.orange, emoji: '⚡' },
  { label: 'Rest of Top Order',   value: 580, maxValue: 800, color: COLORS.subtext, emoji: '📊' },
  { label: 'RR Total',            value: 1210, maxValue: 1400, color: COLORS.dim,   emoji: '🏏' },
];

const STAT_CARDS = [
  { label: 'RUNS SCORED',     value: '734',    emoji: '🔥', color: COLORS.orange },
  { label: 'STRIKE RATE',     value: '192.6',  emoji: '⚡', color: COLORS.amber  },
  { label: 'KEY MATCHES',     value: '6/6',    emoji: '✅', color: COLORS.green  },
  { label: 'TEAM WINS',       value: '4/14',   emoji: '❌', color: COLORS.red    },
];

export const Scene3Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flash cut entry
  const flashFade = interpolate(frame, [4, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Counter headline entrance
  const counterEntrance = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 200 } });

  // Dutch tilt final card — kicks in at frame 300
  const dutchTilt = interpolate(frame, [300, 330], [0, -4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // "TEAM LET HIM DOWN" red stamp — at frame 200
  const stampEntrance = spring({ frame: frame - 200, fps, config: { damping: 8, stiffness: 280 } });
  const stampScale = interpolate(stampEntrance, [0, 1], [2.5, 1]);

  // Data scatter exit
  const exitOpacity = interpolate(frame, [400, 420], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Rapid card cut effect — cycle every 50 frames
  const activeCard = Math.floor(frame / 50) % STAT_CARDS.length;

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        opacity: flashFade * exitOpacity,
        overflow: 'hidden',
      }}
    >
      {/* Background grid lines — scoreboard aesthetic */}
      <AbsoluteFill
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 79px,
              ${COLORS.border}33 79px,
              ${COLORS.border}33 80px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 79px,
              ${COLORS.border}22 79px,
              ${COLORS.border}22 80px
            )
          `,
        }}
      />

      {/* Amber accent glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${COLORS.amber}11 0%, transparent 65%)`,
        }}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: SAFE_ZONE.top,
          paddingLeft: SAFE_ZONE.left,
          paddingRight: SAFE_ZONE.right,
          paddingBottom: SAFE_ZONE.bottom,
          gap: 32,
        }}
      >
        {/* Giant counter */}
        <div
          style={{
            textAlign: 'center',
            transform: `translateY(${interpolate(counterEntrance, [0, 1], [-50, 0])}px)`,
            opacity: counterEntrance,
          }}
        >
          <div
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 28,
              color: COLORS.subtext,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            IPL 2025 TOTAL RUNS
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 4 }}>
            <AnimatedCounter
              from={0}
              to={734}
              suffix="+"
              durationFrames={80}
              startFrame={10}
              fontSize={180}
              color={COLORS.orange}
            />
          </div>

          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 44,
              color: COLORS.amber,
              letterSpacing: '0.1em',
              marginTop: -10,
            }}
          >
            🔥 RUNS IN A SINGLE SEASON
          </div>
        </div>

        {/* Stat cards - rapid cut grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            width: '100%',
            transform: `rotate(${dutchTilt}deg)`,
          }}
        >
          {STAT_CARDS.map((card, i) => (
            <StatCard
              key={card.label}
              label={card.label}
              value={card.value}
              emoji={card.emoji}
              accentColor={card.color}
              startFrame={i * 50}
              index={i}
              tilt={i === activeCard ? 0.5 : 0}
            />
          ))}
        </div>

        {/* Scoreboard bar chart */}
        <div style={{ width: '100%', opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <ScoreboardGraphic
            title="CONTRIBUTION COMPARISON"
            bars={BAR_DATA}
            startFrame={160}
          />
        </div>
      </AbsoluteFill>

      {/* "TEAM LET HIM DOWN" stamp */}
      {frame > 195 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              transform: `scale(${stampScale}) rotate(-6deg)`,
              opacity: interpolate(stampEntrance, [0, 0.4, 1], [0, 1, 1]),
            }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 88,
                color: COLORS.red,
                border: `8px solid ${COLORS.red}`,
                padding: '8px 28px',
                borderRadius: 12,
                letterSpacing: '0.06em',
                boxShadow: `0 0 80px ${COLORS.red}66`,
                background: `${COLORS.red}11`,
                textAlign: 'center',
                lineHeight: 1.1,
              }}
            >
              TEAM LET
              <br />
              HIM DOWN
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Flash entry */}
      <FlashTransition atFrame={0} durationFrames={4} color={COLORS.white} />
    </AbsoluteFill>
  );
};
