// src/scenes/Scene4Curse.tsx
// 0:20–0:30 | 600 frames @ 60fps
// Buttler → Jaiswal → Vaibhav carousel

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
  staticFile,
} from 'remotion';
import { COLORS } from '../constants/colors';
import { SAFE_ZONE } from '../constants/timing';
import { PlayerCarousel } from '../components/PlayerCarousel';
import { ProgressBar } from '../components/ProgressBar';
import { FlashTransition } from '../components/FlashTransition';

const PLAYERS = [
  { name: 'JOS BUTTLER',        year: '2022', tag: 'ONE-MAN ARMY', accentColor: '#00AAFF' },
  { name: 'YASHASVI JAISWAL',   year: '2024', tag: 'ONE-MAN ARMY', accentColor: '#FFCC00' },
  { name: 'VAIBHAV SURYAVANSHI', year: '2025', tag: 'ONE-MAN ARMY', accentColor: COLORS.orange },
];

const YEAR_STAMPS = ['2022', '2023', '2024', '2025'];

// Domino fall — staggered RR logo collapses
const DominoFall: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', height: 100 }}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fallSpring = spring({
          frame: frame - startFrame - i * 10,
          fps,
          config: { damping: 10, stiffness: 120 },
        });
        const rotate = interpolate(fallSpring, [0, 1], [0, 95]);
        const opacity = interpolate(fallSpring, [0, 0.5, 1], [1, 0.8, 0.3]);

        return (
          <div
            key={i}
            style={{
              width: 28,
              height: 80,
              background: COLORS.magenta,
              borderRadius: 6,
              transform: `rotate(${rotate}deg)`,
              transformOrigin: 'bottom center',
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};

export const Scene4Curse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Wipe right entry
  const wipeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Active carousel panel: changes every ~140 frames
  const activeIndex = frame < 150 ? 0 : frame < 310 ? 1 : 2;

  // Lateral slide offset for carousel entrance
  const slideOffset = interpolate(
    frame,
    [0, 12],
    [200, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // "RR CURSE" title entrance
  const titleEntrance = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 180 } });

  // Dependency meter — fills to 100% then triggers collapse
  const dependencyFill = Math.min(100, (frame / 300) * 100);

  // "SAME STORY" text
  const sameStoryEntrance = spring({ frame: frame - 250, fps, config: { damping: 16, stiffness: 160 } });

  // Year stamps
  const yearOpacity = (i: number) => interpolate(frame - i * 140, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Shatter exit last 18 frames
  const shatterExit = interpolate(frame, [582, 600], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        opacity: wipeIn,
        overflow: 'hidden',
      }}
    >
      {/* Magenta bg glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${COLORS.magenta}12 0%, transparent 70%)`,
        }}
      />

      {/* Wipe-right reveal */}
      <AbsoluteFill
        style={{
          clipPath: `inset(0 ${(1 - wipeIn) * 100}% 0 0)`,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(90deg, ${COLORS.magenta}22, transparent)`,
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: SAFE_ZONE.top,
          paddingLeft: SAFE_ZONE.left,
          paddingRight: SAFE_ZONE.right,
          paddingBottom: SAFE_ZONE.bottom,
          gap: 24,
        }}
      >
        {/* "RR CURSE" header */}
        <div
          style={{
            textAlign: 'center',
            transform: `translateY(${interpolate(titleEntrance, [0, 1], [-40, 0])}px)`,
            opacity: titleEntrance,
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 50,
              color: COLORS.magenta,
              letterSpacing: '0.12em',
              textShadow: `0 0 40px ${COLORS.magenta}88`,
            }}
          >
            🪤 RR'S ONE-MAN ARMY CURSE
          </div>
        </div>

        {/* Year stamps */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {YEAR_STAMPS.map((y, i) => (
            <div
              key={y}
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: 24,
                color: i === activeIndex ? COLORS.magenta : COLORS.dim,
                letterSpacing: '0.08em',
                opacity: yearOpacity(i),
                transition: 'none',
                borderBottom: i === activeIndex ? `2px solid ${COLORS.magenta}` : '2px solid transparent',
                paddingBottom: 4,
              }}
            >
              {y}
            </div>
          ))}
        </div>

        {/* Player carousel */}
        <div
          style={{
            width: '100%',
            transform: `translateX(${slideOffset}px)`,
          }}
        >
          <PlayerCarousel
            players={PLAYERS}
            activeIndex={activeIndex}
            startFrame={15}
          />
        </div>

        {/* "BUTTLER → JAISWAL → SURYAVANSHI" text */}
        <div
          style={{
            textAlign: 'center',
            opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 38,
              color: COLORS.white,
              letterSpacing: '0.04em',
            }}
          >
            BUTTLER → JAISWAL → SURYAVANSHI
          </div>
        </div>

        {/* Dependency meter */}
        <div style={{ width: '100%' }}>
          <ProgressBar
            label="TEAM DEPENDENCY"
            startFrame={30}
            durationFrames={270}
            fillPercent={100}
            color={COLORS.magenta}
            height={20}
          />
        </div>

        {/* "SAME STORY. DIFFERENT PLAYER." */}
        {frame > 245 && (
          <div
            style={{
              textAlign: 'center',
              transform: `scale(${interpolate(sameStoryEntrance, [0, 1], [0.8, 1])})`,
              opacity: sameStoryEntrance,
            }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 54,
                color: COLORS.white,
                letterSpacing: '0.05em',
                lineHeight: 1.1,
              }}
            >
              SAME STORY.
              <br />
              <span style={{ color: COLORS.magenta }}>DIFFERENT PLAYER.</span>
            </div>
          </div>
        )}

        {/* Domino fall */}
        {frame > 350 && (
          <DominoFall startFrame={350} />
        )}
      </AbsoluteFill>

      {/* Shatter exit overlay */}
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          opacity: shatterExit,
          background: COLORS.white,
          clipPath: shatterExit > 0 ? `polygon(
            ${0 + shatterExit * 20}% ${0}%,
            ${60 - shatterExit * 30}% ${shatterExit * 15}%,
            ${100}% ${shatterExit * 5}%,
            ${100}% ${100}%,
            ${shatterExit * 15}% ${100}%
          )` : 'none',
        }}
      />
    </AbsoluteFill>
  );
};
