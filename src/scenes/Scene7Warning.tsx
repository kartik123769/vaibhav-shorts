// src/scenes/Scene7Warning.tsx
// 0:47–0:58 | 660 frames @ 60fps
// 17 years, 0 titles — CTA closer

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
import { GlitchText } from '../components/GlitchText';
import { AnimatedCounter } from '../components/AnimatedCounter';

// Mirror dissolve split screen
const SplitScreen: React.FC<{
  frame: number;
  fps: number;
}> = ({ frame, fps }) => {
  const revealProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  const leftWidth = interpolate(revealProgress, [0, 1], [50, 45]);
  const desatLeft = interpolate(frame, [100, 200], [100, 10], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {/* Left: Young Virat / Hopeful */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${leftWidth}%`,
          height: '100%',
          overflow: 'hidden',
          filter: `saturate(${desatLeft}%) brightness(0.55)`,
        }}
      >
        <ImageBackground
          placeholderLabel="VIRAT YOUNG / HOPEFUL"
          accentColor="#CC0000"
          overlayOpacity={0}
        />
        {/* Year tag */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#CC000088',
            color: '#FFF',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 24,
            padding: '6px 20px',
            borderRadius: 8,
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
          }}
        >
          2008 — RCB DEBUT
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `${leftWidth}%`,
          width: 3,
          height: '100%',
          background: `linear-gradient(180deg, transparent, ${COLORS.red}, transparent)`,
          zIndex: 10,
        }}
      />

      {/* Right: Vaibhav — warning future */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: `${100 - leftWidth}%`,
          height: '100%',
          overflow: 'hidden',
          filter: 'brightness(0.5)',
        }}
      >
        <ImageBackground
          placeholderLabel="VAIBHAV PORTRAIT"
          accentColor={COLORS.orange}
          overlayOpacity={0}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            background: `${COLORS.orange}88`,
            color: '#000',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 24,
            padding: '6px 20px',
            borderRadius: 8,
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
          }}
        >
          2025 — RR DEBUT
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 17 years / 0 titles counter
const TitleRecord: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  const yearsEntrance = spring({ frame: local, fps, config: { damping: 12, stiffness: 180 } });
  const titlesEntrance = spring({ frame: local - 25, fps, config: { damping: 12, stiffness: 180 } });

  return (
    <div
      style={{
        display: 'flex',
        gap: 0,
        background: `${COLORS.bgCard}EE`,
        borderRadius: 20,
        overflow: 'hidden',
        border: `1px solid ${COLORS.border}`,
        width: '100%',
      }}
    >
      {/* 17 years */}
      <div
        style={{
          flex: 1,
          padding: '24px 20px',
          textAlign: 'center',
          borderRight: `1px solid ${COLORS.border}`,
          transform: `translateY(${interpolate(yearsEntrance, [0, 1], [40, 0])}px)`,
          opacity: yearsEntrance,
        }}
      >
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 80,
            color: COLORS.red,
            lineHeight: 1,
            textShadow: `0 0 40px ${COLORS.red}88`,
          }}
        >
          17
        </div>
        <div
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: 22,
            color: COLORS.subtext,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          YEARS IN RCB
        </div>
      </div>

      {/* 0 titles */}
      <div
        style={{
          flex: 1,
          padding: '24px 20px',
          textAlign: 'center',
          transform: `translateY(${interpolate(titlesEntrance, [0, 1], [40, 0])}px)`,
          opacity: titlesEntrance,
        }}
      >
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 80,
            color: COLORS.dim,
            lineHeight: 1,
          }}
        >
          0
        </div>
        <div
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: 22,
            color: COLORS.subtext,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          IPL TITLES
        </div>
      </div>
    </div>
  );
};

export const Scene7Warning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cross dissolve entry with desaturation
  const dissolveIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Warning pulse
  const warningPulse = interpolate(Math.sin(frame * 0.18), [-1, 1], [0.7, 1]);

  // Text entrances
  const warningLabel = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 160 } });
  const titleRecord = spring({ frame: frame - 80, fps, config: { damping: 14, stiffness: 160 } });
  const mainHeadline = spring({ frame: frame - 150, fps, config: { damping: 14, stiffness: 160 } });
  const ctaBadge = spring({ frame: frame - 250, fps, config: { damping: 10, stiffness: 200 } });

  // RCB logo glitch frames
  const rcbGlitch = frame > 200 && frame % 15 < 3;

  // Vaibhav RR jersey dissolve — last 100 frames
  const jerseyDissolve = interpolate(frame, [560, 640], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Freeze frame + outro fade
  const outroFade = interpolate(frame, [640, 660], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        opacity: dissolveIn * outroFade,
        overflow: 'hidden',
      }}
    >
      {/* Split screen background */}
      <SplitScreen frame={frame} fps={fps} />

      {/* Dark overlay for text readability */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.95) 100%)',
        }}
      />

      {/* Red bg glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 80%, ${COLORS.red}18 0%, transparent 60%)`,
          opacity: warningPulse,
        }}
      />

      {/* Content */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: SAFE_ZONE.bottom + 20,
          paddingLeft: SAFE_ZONE.left,
          paddingRight: SAFE_ZONE.right,
          gap: 20,
        }}
      >
        {/* "VIRAT: 17 YEARS. 0 TITLES." */}
        <div
          style={{
            width: '100%',
            transform: `translateY(${interpolate(titleRecord, [0, 1], [50, 0])}px)`,
            opacity: titleRecord,
          }}
        >
          <TitleRecord startFrame={80} />
        </div>

        {/* Mirror label */}
        <div
          style={{
            textAlign: 'center',
            transform: `translateY(${interpolate(warningLabel, [0, 1], [30, 0])}px)`,
            opacity: warningLabel,
          }}
        >
          <div
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize: 26,
              color: COLORS.subtext,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            ⚠️ SOUND FAMILIAR?
          </div>
        </div>

        {/* Main warning headline */}
        <div
          style={{
            textAlign: 'center',
            transform: `translateY(${interpolate(mainHeadline, [0, 1], [40, 0])}px)`,
            opacity: mainHeadline,
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 60,
              color: COLORS.white,
              lineHeight: 1.1,
              letterSpacing: '0.03em',
              textShadow: `0 4px 30px rgba(0,0,0,0.9)`,
            }}
          >
            DON'T LET THIS BE
            <br />
            <span
              style={{
                color: COLORS.orange,
                fontSize: 72,
                textShadow: `0 0 50px ${COLORS.orange}88`,
              }}
            >
              VAIBHAV'S STORY
            </span>
          </div>
        </div>

        {/* CTA badge */}
        <div
          style={{
            transform: `scale(${interpolate(ctaBadge, [0, 1], [0.7, 1])})`,
            opacity: ctaBadge,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${COLORS.red}33, ${COLORS.orange}22)`,
              border: `2px solid ${COLORS.orange}66`,
              borderRadius: 20,
              padding: '20px 28px',
            }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 44,
                color: COLORS.white,
                letterSpacing: '0.06em',
                lineHeight: 1.2,
              }}
            >
              COMMENT BELOW 👇
            </div>
            <div
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                fontSize: 28,
                color: COLORS.orange,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: 8,
              }}
            >
              SHOULD HE LEAVE RR?
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Jersey dissolve overlay */}
      {jerseyDissolve > 0 && (
        <AbsoluteFill
          style={{
            background: `linear-gradient(180deg, ${COLORS.red}00, ${COLORS.red}44)`,
            opacity: jerseyDissolve,
            pointerEvents: 'none',
          }}
        />
      )}
    </AbsoluteFill>
  );
};
