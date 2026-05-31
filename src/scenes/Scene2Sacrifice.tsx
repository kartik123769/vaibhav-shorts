// src/scenes/Scene2Sacrifice.tsx
// 0:05–0:13 | 480 frames @ 60fps
// Emotional empathy for a 15-year-old

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
import { ImageBackground } from '../components/VideoBackground';
import { TextBadge } from '../components/TextBadge';
import { ParticleRain } from '../components/ParticleRain';

const HeartbeatBadge: React.FC<{ frame: number }> = ({ frame }) => {
  // Heartbeat: pulse every 50 frames
  const beat = (frame % 50) < 12;
  const scale = beat
    ? interpolate(frame % 50, [0, 6, 12], [1, 1.2, 1])
    : 1;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        background: `${COLORS.orange}22`,
        border: `2px solid ${COLORS.orange}66`,
        borderRadius: 40,
        padding: '10px 28px',
        transform: `scale(${scale})`,
      }}
    >
      <span style={{ fontSize: 28 }}>⚡</span>
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 38,
          color: COLORS.orange,
          letterSpacing: '0.08em',
        }}
      >
        AGE: 15
      </span>
    </div>
  );
};

// Season timeline bar
const SeasonTimeline: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  const fill = interpolate(local, [0, 120], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(local, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];

  return (
    <div style={{ width: '100%', opacity }}>
      <div
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 22,
          color: COLORS.subtext,
          letterSpacing: '0.12em',
          marginBottom: 10,
          textTransform: 'uppercase',
        }}
      >
        IPL 2025 SEASON
      </div>
      <div style={{ display: 'flex', gap: 0, marginBottom: 12 }}>
        {months.map((m, i) => (
          <div
            key={m}
            style={{
              flex: 1,
              textAlign: 'center',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 18,
              color: i < Math.floor(fill / 20) ? COLORS.orange : COLORS.dim,
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}
          >
            {m}
          </div>
        ))}
      </div>
      <div
        style={{
          height: 16,
          background: COLORS.bgElevated,
          borderRadius: 8,
          overflow: 'hidden',
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <div
          style={{
            width: `${fill}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${COLORS.orange}88, ${COLORS.orange})`,
            borderRadius: 8,
            boxShadow: `0 0 10px ${COLORS.orange}66`,
          }}
        />
      </div>
    </div>
  );
};

export const Scene2Sacrifice: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cross-dissolve entry
  const dissolveIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Slow push-in on image (Ken Burns)
  const kenBurnsScale = interpolate(frame, [0, 480], [1, 1.12]);
  const kenBurnsY = interpolate(frame, [0, 480], [0, -30]);

  // Text entrances
  const text1 = spring({ frame: frame - 20, fps, config: { damping: 16, stiffness: 160 } });
  const text2 = spring({ frame: frame - 50, fps, config: { damping: 16, stiffness: 160 } });
  const text3 = spring({ frame: frame - 80, fps, config: { damping: 16, stiffness: 160 } });
  const text4 = spring({ frame: frame - 120, fps, config: { damping: 16, stiffness: 160 } });

  // "ALL FOR NOTHING?" glitch
  const glitchPulse = frame > 200 ? interpolate(Math.sin((frame - 200) * 0.4), [-1, 1], [0.4, 1]) : 0;

  // Zoom blur exit last 14 frames
  const exitBlur = interpolate(frame, [466, 480], [0, 20], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitScale = interpolate(frame, [466, 480], [1, 1.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        opacity: dissolveIn,
        overflow: 'hidden',
        filter: `blur(${exitBlur}px)`,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Ken Burns image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${kenBurnsScale}) translateY(${kenBurnsY}px)`,
        }}
      >
        <ImageBackground
          placeholderLabel="VAIBHAV DEJECTED"
          accentColor={COLORS.scene2}
          overlayOpacity={0.6}
        />
      </div>

      {/* Particle rain */}
      <ParticleRain color={COLORS.orange} startFrame={30} />

      {/* Content overlay */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: SAFE_ZONE.top + 60,
          paddingLeft: SAFE_ZONE.left,
          paddingRight: SAFE_ZONE.right,
          gap: 28,
        }}
      >
        {/* Heartbeat age badge */}
        <div
          style={{
            transform: `translateY(${interpolate(text1, [0, 1], [40, 0])}px)`,
            opacity: text1,
          }}
        >
          <HeartbeatBadge frame={frame} />
        </div>

        {/* Main headline */}
        <div
          style={{
            textAlign: 'center',
            transform: `translateY(${interpolate(text2, [0, 1], [60, 0])}px)`,
            opacity: text2,
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              fontSize: 96,
              color: COLORS.white,
              lineHeight: 1,
              letterSpacing: '0.02em',
              textShadow: `0 4px 30px rgba(0,0,0,0.8), 0 0 60px ${COLORS.orange}33`,
            }}
          >
            15 YEARS OLD
          </div>
        </div>

        <div
          style={{
            textAlign: 'center',
            transform: `translateY(${interpolate(text3, [0, 1], [40, 0])}px)`,
            opacity: text3,
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              fontSize: 72,
              color: COLORS.orange,
              lineHeight: 1,
              letterSpacing: '0.03em',
              textShadow: `0 0 40px ${COLORS.orange}66`,
            }}
          >
            GAVE EVERYTHING
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              fontSize: 72,
              color: COLORS.white,
              lineHeight: 1,
              letterSpacing: '0.03em',
            }}
          >
            FOR THIS TEAM
          </div>
        </div>

        {/* Season timeline */}
        <div
          style={{
            width: '100%',
            transform: `translateY(${interpolate(text4, [0, 1], [30, 0])}px)`,
            opacity: text4,
          }}
        >
          <SeasonTimeline startFrame={80} />
        </div>
      </AbsoluteFill>

      {/* "ALL FOR NOTHING?" — bottom */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: SAFE_ZONE.bottom + 40,
        }}
      >
        {frame > 200 && (
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 68,
              color: COLORS.scene2,
              letterSpacing: '0.06em',
              textShadow: `0 0 40px ${COLORS.scene2}88`,
              opacity: glitchPulse,
            }}
          >
            ALL FOR NOTHING?
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
