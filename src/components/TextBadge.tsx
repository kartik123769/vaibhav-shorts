// src/components/TextBadge.tsx

import React from 'react';
import { useCurrentFrame, spring, interpolate, useVideoConfig } from 'remotion';
import { COLORS } from '../constants/colors';
import { SPRING_CONFIGS } from '../constants/timing';

type BadgeVariant = 'stamp' | 'pill' | 'headline' | 'warning' | 'label';

interface TextBadgeProps {
  text: string;
  variant?: BadgeVariant;
  accentColor?: string;
  startFrame?: number;
  fontSize?: number;
  style?: React.CSSProperties;
}

export const TextBadge: React.FC<TextBadgeProps> = ({
  text,
  variant = 'headline',
  accentColor = COLORS.orange,
  startFrame = 0,
  fontSize,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const entrance = spring({
    frame: localFrame,
    fps,
    config: variant === 'stamp' ? SPRING_CONFIGS.bouncy : SPRING_CONFIGS.snappy,
  });

  const scale = interpolate(entrance, [0, 1], [variant === 'stamp' ? 2 : 0.7, 1]);
  const opacity = interpolate(entrance, [0, 0.3, 1], [0, 1, 1]);

  const baseStyles: Record<BadgeVariant, React.CSSProperties> = {
    headline: {
      fontFamily: "'Bebas Neue', 'Impact', sans-serif",
      fontSize: fontSize ?? 88,
      fontWeight: 900,
      color: COLORS.white,
      letterSpacing: '0.02em',
      lineHeight: 1,
      textShadow: `0 4px 24px rgba(0,0,0,0.8), 0 0 60px ${accentColor}44`,
      textTransform: 'uppercase',
    },
    stamp: {
      fontFamily: "'Bebas Neue', 'Impact', sans-serif",
      fontSize: fontSize ?? 72,
      fontWeight: 900,
      color: accentColor,
      letterSpacing: '0.06em',
      border: `6px solid ${accentColor}`,
      padding: '6px 20px',
      borderRadius: 8,
      textTransform: 'uppercase',
      transform: `rotate(-5deg)`,
      boxShadow: `0 0 30px ${accentColor}66`,
    },
    pill: {
      fontFamily: "'Rajdhani', sans-serif",
      fontSize: fontSize ?? 32,
      fontWeight: 700,
      color: '#000',
      background: accentColor,
      padding: '8px 28px',
      borderRadius: 40,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    warning: {
      fontFamily: "'Bebas Neue', 'Impact', sans-serif",
      fontSize: fontSize ?? 60,
      fontWeight: 900,
      color: COLORS.red,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      textShadow: `0 0 40px ${COLORS.red}88`,
    },
    label: {
      fontFamily: "'Rajdhani', sans-serif",
      fontSize: fontSize ?? 28,
      fontWeight: 700,
      color: COLORS.subtext,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
    },
  };

  return (
    <div
      style={{
        ...baseStyles[variant],
        transform: `${(baseStyles[variant] as any).transform ?? ''} scale(${scale})`,
        opacity,
        display: 'inline-block',
        ...style,
      }}
    >
      {text}
    </div>
  );
};
