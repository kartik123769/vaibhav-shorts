// src/components/PlayerCarousel.tsx

import React from 'react';
import { useCurrentFrame, spring, interpolate, useVideoConfig, AbsoluteFill } from 'remotion';
import { COLORS } from '../constants/colors';
import { SPRING_CONFIGS } from '../constants/timing';

interface Player {
  name: string;
  year: string;
  tag: string;
  imageSrc?: string; // staticFile() path
  accentColor?: string;
}

interface PlayerCarouselProps {
  players: Player[];
  activeIndex: number;
  startFrame?: number;
}

const PlayerPanel: React.FC<{
  player: Player;
  isActive: boolean;
  frame: number;
  fps: number;
  panelIndex: number;
}> = ({ player, isActive, frame, fps, panelIndex }) => {
  const brightness = interpolate(
    Number(isActive),
    [0, 1],
    [0.25, 1]
  );

  const borderOpacity = interpolate(Number(isActive), [0, 1], [0.1, 0.9]);
  const accentColor = player.accentColor ?? COLORS.orange;

  // Light sweep for active panel
  const sweepX = interpolate(frame % 60, [0, 60], [-100, 200]);

  return (
    <div
      style={{
        flex: 1,
        background: isActive
          ? `linear-gradient(180deg, ${accentColor}22, ${COLORS.bgCard})`
          : COLORS.bgCard,
        border: `2px solid ${accentColor}${Math.round(borderOpacity * 255).toString(16).padStart(2, '0')}`,
        borderRadius: 20,
        padding: '40px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        filter: `brightness(${brightness})`,
        position: 'relative',
        overflow: 'hidden',
        transition: 'none',
      }}
    >
      {/* Light sweep on active */}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `${sweepX}%`,
            width: '40%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
            transform: 'skewX(-10deg)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Player image placeholder */}
      <div
        style={{
          width: 200,
          height: 220,
          borderRadius: 16,
          background: isActive
            ? `linear-gradient(180deg, ${accentColor}44, ${COLORS.bg})`
            : `${COLORS.bgElevated}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 64,
          border: `1px solid ${accentColor}33`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {player.imageSrc ? (
          <img
            src={player.imageSrc}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt={player.name}
          />
        ) : (
          <span>🏏</span>
        )}

        {/* Year badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            background: `${accentColor}CC`,
            color: '#000',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 18,
            padding: '2px 10px',
            borderRadius: 6,
          }}
        >
          {player.year}
        </div>
      </div>

      {/* Name */}
      <div
        style={{
          fontFamily: "'Bebas Neue', 'Impact', sans-serif",
          fontSize: isActive ? 38 : 30,
          color: isActive ? COLORS.white : COLORS.subtext,
          letterSpacing: '0.04em',
          textAlign: 'center',
          lineHeight: 1.1,
        }}
      >
        {player.name}
      </div>

      {/* Tag badge */}
      {isActive && (
        <div
          style={{
            background: accentColor,
            color: '#000',
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            padding: '4px 16px',
            borderRadius: 20,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {player.tag}
        </div>
      )}
    </div>
  );
};

export const PlayerCarousel: React.FC<PlayerCarouselProps> = ({
  players,
  activeIndex,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        width: '100%',
        padding: '0 24px',
      }}
    >
      {players.map((player, i) => (
        <PlayerPanel
          key={player.name}
          player={player}
          isActive={i === activeIndex}
          frame={localFrame}
          fps={fps}
          panelIndex={i}
        />
      ))}
    </div>
  );
};
