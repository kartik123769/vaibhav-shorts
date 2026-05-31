import React from 'react';
import { useCurrentFrame, spring, interpolate, useVideoConfig } from 'remotion';
import { COLORS } from '../constants/colors';

interface DataTag {
  label: string;
  value: string;
  edge: 'top' | 'bottom' | 'left' | 'right';
  offsetPercent: number;
}

interface HUDOverlayProps {
  width: number;
  height: number;
  startFrame?: number;
  accentColor?: string;
  tags?: DataTag[];
  showGrid?: boolean;
  label?: string;
}

const Corner: React.FC<{
  x: number; y: number; size: number; color: string;
  flipX?: boolean; flipY?: boolean; progress: number;
}> = ({ x, y, size, color, flipX, flipY, progress }) => {
  const sx = flipX ? -1 : 1;
  const sy = flipY ? -1 : 1;
  const len = size * progress;
  return (
    <g transform={`translate(${x},${y}) scale(${sx},${sy})`}>
      <line x1={0} y1={0} x2={len} y2={0}
        stroke={color} strokeWidth={3} strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
      <line x1={0} y1={0} x2={0} y2={len}
        stroke={color} strokeWidth={3} strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
      <circle cx={0} cy={0} r={3} fill={color}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
    </g>
  );
};

const HUDTag: React.FC<{
  tag: DataTag; boxW: number; boxH: number;
  color: string; startFrame: number;
}> = ({ tag, boxW, boxH, color, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({
    frame: frame - startFrame, fps,
    config: { damping: 14, stiffness: 200 },
  });
  let x = 0, y = 0;
  const pct = tag.offsetPercent / 100;
  switch (tag.edge) {
    case 'top':    x = boxW * pct; y = -2; break;
    case 'bottom': x = boxW * pct; y = boxH + 2; break;
    case 'left':   x = -2; y = boxH * pct; break;
    case 'right':  x = boxW + 2; y = boxH * pct; break;
  }
  const slideMap: Record<string, [number, number]> = {
    top: [0, -30], bottom: [0, 30],
    left: [-60, 0], right: [60, 0],
  };
  const [fromX, fromY] = slideMap[tag.edge];
  const tx = interpolate(entrance, [0, 1], [fromX, 0]);
  const ty = interpolate(entrance, [0, 1], [fromY, 0]);
  const opacity = interpolate(entrance, [0, 0.3, 1], [0, 1, 1]);
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: `translate(${tx}px, ${ty}px)`,
      opacity, pointerEvents: 'none',
    }}>
      <div style={{
        background: `${COLORS.bg}EE`,
        border: `1px solid ${color}88`,
        borderRadius: 6, padding: '4px 10px',
        display: 'inline-flex', flexDirection: 'column',
        alignItems: 'center', gap: 1,
        boxShadow: `0 0 12px ${color}44`,
        minWidth: 90,
      }}>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 11, fontWeight: 700,
          color: `${color}AA`, letterSpacing: '0.16em',
          textTransform: 'uppercase',
        }}>{tag.label}</div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 22, color, lineHeight: 1,
          textShadow: `0 0 10px ${color}88`,
        }}>{tag.value}</div>
      </div>
    </div>
  );
};

export const HUDOverlay: React.FC<HUDOverlayProps> = ({
  width, height,
  startFrame = 0,
  accentColor = '#00FF88',
  tags = [],
  showGrid = true,
  label = 'PLAYER ANALYSIS',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;
  const boxSnap = spring({ frame: local, fps, config: { damping: 12, stiffness: 180 } });
  const cornerProgress = interpolate(boxSnap, [0, 1], [0, 1]);
  const boxOpacity = interpolate(local, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const scaleX = interpolate(boxSnap, [0, 1], [1.08, 1]);
  const scaleY = interpolate(boxSnap, [0, 1], [1.06, 1]);
  const CORNER_SIZE = Math.min(width, height) * 0.14;
  const scanY = interpolate(local % 120, [0, 120], [-10, height + 10]);
  const labelEntrance = spring({
    frame: local - 8, fps, config: { damping: 16, stiffness: 200 },
  });

  return (
    <div style={{
      position: 'absolute', left: 0, top: 0,
      width, height, pointerEvents: 'none', overflow: 'visible',
    }}>
      {showGrid && (
        <svg width={width} height={height}
          style={{ position: 'absolute', inset: 0, opacity: 0.12 }}>
          {[0.25, 0.5, 0.75].map((f) => (
            <React.Fragment key={f}>
              <line x1={width * f} y1={0} x2={width * f} y2={height}
                stroke={accentColor} strokeWidth={0.5} />
              <line x1={0} y1={height * f} x2={width} y2={height * f}
                stroke={accentColor} strokeWidth={0.5} />
            </React.Fragment>
          ))}
          <circle cx={width / 2} cy={height / 2} r={12}
            fill="none" stroke={accentColor} strokeWidth={0.8} opacity={0.5} />
        </svg>
      )}

      {local > 0 && (
        <div style={{
          position: 'absolute', left: 0, right: 0, top: scanY,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${accentColor}88, transparent)`,
          boxShadow: `0 0 8px ${accentColor}66`,
        }} />
      )}

      <div style={{
        position: 'absolute', left: 0, top: 0,
        width, height,
        transform: `scale(${scaleX}, ${scaleY})`,
        transformOrigin: 'center center',
        opacity: boxOpacity,
      }}>
        <svg width={width} height={height}
          style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          <Corner x={0} y={0} size={CORNER_SIZE}
            color={accentColor} progress={cornerProgress} />
          <Corner x={width} y={0} size={CORNER_SIZE}
            color={accentColor} progress={cornerProgress} flipX />
          <Corner x={0} y={height} size={CORNER_SIZE}
            color={accentColor} progress={cornerProgress} flipY />
          <Corner x={width} y={height} size={CORNER_SIZE}
            color={accentColor} progress={cornerProgress} flipX flipY />
        </svg>

        {tags.map((tag, i) => (
          <HUDTag
            key={tag.label} tag={tag}
            boxW={width} boxH={height}
            color={accentColor}
            startFrame={startFrame + 15 + i * 12}
          />
        ))}
      </div>

      <div style={{
        position: 'absolute', top: -32, left: 0,
        transform: `translateY(${interpolate(labelEntrance, [0, 1], [-16, 0])}px)`,
        opacity: labelEntrance,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <div style={{
          width: 7, height: 7, borderRadius: '50%',
          background: accentColor,
          boxShadow: `0 0 8px ${accentColor}`,
          opacity: local % 60 < 30 ? 1 : 0.3,
        }} />
        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 14, fontWeight: 700,
          color: accentColor, letterSpacing: '0.14em',
          textTransform: 'uppercase',
          textShadow: `0 0 10px ${accentColor}88`,
        }}>{label}</div>
      </div>
    </div>
  );
};
