// src/scenes/Scene1Hook.tsx
// 0:00–0:05 | 300 frames @ 60fps
// Hook: Scroll-stopper controversy

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
import { VideoBackground } from '../components/VideoBackground';
import { GlitchText } from '../components/GlitchText';
import { FlashTransition, Shockwave } from '../components/FlashTransition';
import { TextBadge } from '../components/TextBadge';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene entry flash
  const globalFade = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // RR Logo entrance
  const logoEntrance = spring({ frame, fps, config: { damping: 10, stiffness: 200 } });
  const logoScale = interpolate(logoEntrance, [0, 1], [2.5, 1]);

  // "DOESN'T DESERVE HIM" reveal
  const headlineEntrance = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, stiffness: 180 },
  });

  // Stamp slam at frame 35
  const stampEntrance = spring({
    frame: frame - 35,
    fps,
    config: { damping: 8, stiffness: 300 },
  });
  const stampScale = interpolate(stampEntrance, [0, 1], [3, 1]);
  const stampOpacity = interpolate(stampEntrance, [0, 0.3, 1], [0, 1, 1]);

  // "HERE'S WHY" appear at frame 55
  const ctaEntrance = spring({ frame: frame - 55, fps, config: { damping: 16, stiffness: 200 } });

  // Whip pan exit — last 10 frames
  const exitWipe = interpolate(frame, [290, 300], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Pulsing background glow
  const bgPulse = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.8, 1]);

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        opacity: globalFade,
        overflow: 'hidden',
      }}
    >
      {/* ── VIDEO BACKGROUND ── */}
      <VideoBackground
        src={undefined}
        placeholderLabel="VAIBHAV BOUNDARY CLIP"
        placeholderColor={COLORS.red}
        overlayOpacity={0.65}
      />

      {/* Colored background vignette */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${COLORS.red}22 0%, transparent 70%)`,
          opacity: bgPulse,
        }}
      />

      {/* ── SHOCKWAVE on logo slam ── */}
      <Shockwave startFrame={5} x="50%" y="38%" color={COLORS.red} />
      <Shockwave startFrame={8} x="50%" y="38%" color="#FF8844" />

      {/* ── CONTENT LAYER ── */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: SAFE_ZONE.top + 80,
          paddingLeft: SAFE_ZONE.left,
          paddingRight: SAFE_ZONE.right,
          gap: 0,
        }}
      >
        {/* RR Logo placeholder */}
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${COLORS.red}44, ${COLORS.red}11)`,
            border: `4px solid ${COLORS.red}66`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${logoScale})`,
            opacity: logoEntrance,
            marginBottom: 40,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, color: COLORS.red, letterSpacing: '0.06em' }}>
            RR
          </span>
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, rgba(255,255,255,0.05), transparent)`,
          }} />
        </div>

        {/* Main glitch headline */}
        <div
          style={{
            textAlign: 'center',
            transform: `translateY(${interpolate(headlineEntrance, [0, 1], [40, 0])}px)`,
            opacity: headlineEntrance,
          }}
        >
          <GlitchText
            text="RR DOESN'T"
            fontSize={100}
            color={COLORS.white}
            glitchColor1={COLORS.red}
            intensity={0.8}
          />
          <br />
          <GlitchText
            text="DESERVE"
            fontSize={110}
            color={COLORS.red}
            glitchColor1="#FF8800"
            intensity={1}
          />
          <br />
          <GlitchText
            text="VAIBHAV"
            fontSize={100}
            color={COLORS.white}
            glitchColor1={COLORS.red}
            intensity={0.6}
          />
        </div>

        {/* RED X STAMP */}
        <div
          style={{
            marginTop: 40,
            transform: `scale(${stampScale}) rotate(-8deg)`,
            opacity: stampOpacity,
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 120,
              color: COLORS.red,
              lineHeight: 1,
              border: `8px solid ${COLORS.red}`,
              padding: '4px 24px',
              borderRadius: 12,
              letterSpacing: '0.08em',
              boxShadow: `0 0 60px ${COLORS.red}88`,
            }}
          >
            ❌ GUILTY
          </div>
        </div>
      </AbsoluteFill>

      {/* ── CTA BOTTOM ── */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: SAFE_ZONE.bottom + 60,
          gap: 16,
        }}
      >
        <div
          style={{
            transform: `translateY(${interpolate(ctaEntrance, [0, 1], [50, 0])}px)`,
            opacity: ctaEntrance,
            textAlign: 'center',
          }}
        >
          <TextBadge
            text="👇 HERE'S WHY"
            variant="pill"
            accentColor={COLORS.orange}
            fontSize={36}
          />
        </div>
      </AbsoluteFill>

      {/* ── FLASH ENTRY ── */}
      <FlashTransition atFrame={0} durationFrames={5} color={COLORS.red} />

      {/* ── WHIP PAN EXIT ── */}
      <AbsoluteFill
        style={{
          background: COLORS.white,
          opacity: exitWipe * 0.9,
          transform: `translateX(${exitWipe * 100}%)`,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
