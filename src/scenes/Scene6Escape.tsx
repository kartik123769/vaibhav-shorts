// src/scenes/Scene6Escape.tsx
// 0:37–0:47 | 600 frames @ 60fps
// Hope/excitement energy shift

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
import { TextBadge } from '../components/TextBadge';
import { ProgressBar } from '../components/ProgressBar';
import { FlashTransition } from '../components/FlashTransition';
import { FloatingCard } from '../components/FloatingCard';

// Team logo card
const TeamLogoCard: React.FC<{
  name: string;
  emoji: string;
  color: string;
  startFrame: number;
  index: number;
}> = ({ name, emoji, color, startFrame, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame - index * 20;

  const entrance = spring({ frame: local, fps, config: { damping: 10, stiffness: 220 } });
  const scale = interpolate(entrance, [0, 1], [0.4, 1]);
  const rotate = interpolate(entrance, [0, 1], [-30, 0]);
  const opacity = interpolate(entrance, [0, 0.3, 1], [0, 1, 1]);

  // Spinning entrance rotation
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${color}22, ${COLORS.bgCard})`,
        border: `2px solid ${color}55`,
        borderRadius: 20,
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        opacity,
        boxShadow: `0 0 30px ${color}22`,
        minWidth: 140,
      }}
    >
      <div style={{ fontSize: 52 }}>{emoji}</div>
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 30,
          color: COLORS.white,
          letterSpacing: '0.06em',
        }}
      >
        {name}
      </div>
    </div>
  );
};

// Confetti particle (CSS-driven)
const ConfettiParticle: React.FC<{ id: number; startFrame: number }> = ({ id, startFrame }) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - startFrame);

  const seeded = (n: number) => {
    const x = Math.sin(id * 9.3 + n) * 10000;
    return x - Math.floor(x);
  };

  const x = seeded(1) * 100;
  const size = 6 + seeded(2) * 12;
  const speed = 0.3 + seeded(3) * 0.4;
  const sway = Math.sin(local * 0.05 + seeded(4) * 10) * 40;

  const colors = [COLORS.green, COLORS.orange, COLORS.amber, COLORS.magenta, '#FFFFFF'];
  const color = colors[Math.floor(seeded(5) * colors.length)];

  const y = -5 + local * speed;
  if (y > 115) return null;

  const opacity = interpolate(y, [100, 115], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x + sway * 0.05}%`,
        top: `${y}%`,
        width: size,
        height: size * 0.5,
        background: color,
        borderRadius: 2,
        transform: `rotate(${local * seeded(6) * 10}deg)`,
        opacity,
      }}
    />
  );
};

const CONFETTI_IDS = Array.from({ length: 50 }, (_, i) => i);

const TEAM_LOGOS = [
  { name: 'RCB', emoji: '🏏', color: '#CC0000' },
  { name: 'MI', emoji: '💙', color: '#004BA0' },
  { name: 'CSK', emoji: '🦁', color: '#FFD700' },
];

export const Scene6Escape: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flash + energy burst entry
  const burstFade = interpolate(frame, [4, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Green glow pulse
  const greenPulse = interpolate(Math.sin(frame * 0.12), [-1, 1], [0.6, 1.0]);

  // "TAKE EVERY OFFER" — quick entrance
  const headline1 = spring({ frame: frame - 15, fps, config: { damping: 10, stiffness: 220 } });

  // "OFFER ACCEPTED ✅" badge slam
  const badgeEntrance = spring({ frame: frame - 40, fps, config: { damping: 8, stiffness: 300 } });
  const badgeScale = interpolate(badgeEntrance, [0, 1], [2.5, 1]);

  // Team logos spin in — staggered at 80, 100, 120
  // Progress bar starts at 150
  // Dream graphic at 300

  // "FIND A BETTER TEAM" at frame 100
  const headline2 = spring({ frame: frame - 100, fps, config: { damping: 14, stiffness: 180 } });

  // Confetti at frame 45
  const showConfetti = frame > 45;

  // Zoom in exit
  const exitScale = interpolate(frame, [580, 600], [1, 1.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitOpacity = interpolate(frame, [580, 600], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        opacity: burstFade * exitOpacity,
        transform: `scale(${exitScale})`,
        overflow: 'hidden',
      }}
    >
      {/* Green glow background */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${COLORS.green}18 0%, transparent 65%)`,
          opacity: greenPulse,
        }}
      />

      {/* Confetti burst */}
      {showConfetti && (
        <AbsoluteFill style={{ pointerEvents: 'none', overflow: 'hidden' }}>
          {CONFETTI_IDS.map((id) => (
            <ConfettiParticle key={id} id={id} startFrame={45} />
          ))}
        </AbsoluteFill>
      )}

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: SAFE_ZONE.top + 30,
          paddingLeft: SAFE_ZONE.left,
          paddingRight: SAFE_ZONE.right,
          paddingBottom: SAFE_ZONE.bottom,
          gap: 28,
        }}
      >
        {/* Main headline */}
        <div
          style={{
            textAlign: 'center',
            transform: `translateY(${interpolate(headline1, [0, 1], [-60, 0])}px) scale(${interpolate(headline1, [0, 1], [0.8, 1])})`,
            opacity: headline1,
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 88,
              color: COLORS.white,
              lineHeight: 1,
              letterSpacing: '0.02em',
              textShadow: `0 4px 30px rgba(0,0,0,0.8), 0 0 60px ${COLORS.green}44`,
            }}
          >
            TAKE EVERY
            <br />
            <span style={{ color: COLORS.green }}>OFFER 💸</span>
          </div>
        </div>

        {/* "OFFER ACCEPTED" badge */}
        <div
          style={{
            transform: `scale(${badgeScale})`,
            opacity: badgeEntrance,
          }}
        >
          <div
            style={{
              background: COLORS.green,
              color: '#000',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 44,
              padding: '10px 32px',
              borderRadius: 12,
              letterSpacing: '0.08em',
              boxShadow: `0 0 60px ${COLORS.green}88`,
            }}
          >
            OFFER ACCEPTED ✅
          </div>
        </div>

        {/* Team logos */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {TEAM_LOGOS.map((team, i) => (
            <TeamLogoCard
              key={team.name}
              name={team.name}
              emoji={team.emoji}
              color={team.color}
              startFrame={80}
              index={i}
            />
          ))}
        </div>

        {/* "FIND A BETTER TEAM" */}
        <div
          style={{
            textAlign: 'center',
            transform: `translateY(${interpolate(headline2, [0, 1], [40, 0])}px)`,
            opacity: headline2,
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 64,
              color: COLORS.white,
              lineHeight: 1,
              letterSpacing: '0.04em',
            }}
          >
            FIND A BETTER TEAM
          </div>
        </div>

        {/* Upgrade loading bar */}
        <div style={{ width: '100%' }}>
          <ProgressBar
            label="UPGRADE"
            startFrame={150}
            durationFrames={200}
            fillPercent={75}
            color={COLORS.green}
            height={22}
            showPercentage
            showLabel
          />
        </div>

        {/* Dream graphic — Virat + Vaibhav */}
        {frame > 300 && (
          <div
            style={{
              background: `linear-gradient(135deg, #CC000022, ${COLORS.orange}22)`,
              border: `2px solid ${COLORS.orange}44`,
              borderRadius: 20,
              padding: '24px 32px',
              width: '100%',
              textAlign: 'center',
              opacity: interpolate(frame, [300, 330], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 36,
                color: COLORS.subtext,
                letterSpacing: '0.1em',
                marginBottom: 8,
              }}
            >
              DREAM TEAM LOADING...
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48 }}>👑</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: '#CC0000' }}>VIRAT</div>
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 40,
                  color: COLORS.orange,
                }}
              >
                +
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48 }}>⚡</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: COLORS.orange }}>VAIBHAV</div>
              </div>
            </div>
          </div>
        )}
      </AbsoluteFill>

      {/* Floating offer cards */}
        {frame > 45 {/* Flash entry */}{/* Flash entry */} frame < 200 {/* Flash entry */}{/* Flash entry */} (
          <FloatingCard x={60} y={900} startFrame={45} accentColor={COLORS.green} title="IPL 2025" value="RCB" subtext="offer accepted" />
        )}
        {frame > 300 {/* Flash entry */}{/* Flash entry */} (
          <FloatingCard x={620} y={900} startFrame={300} accentColor={COLORS.orange} title="DREAM TEAM" value="RCB+" subtext="virat + vaibhav" />
        )}

        {/* Flash entry */}
      <FlashTransition atFrame={0} durationFrames={5} color={COLORS.green} />
    </AbsoluteFill>
  );
};
