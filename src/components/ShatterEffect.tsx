// src/components/ShatterEffect.tsx
// Trophy/object shatter using CSS clip-path shards

import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS } from '../constants/colors';

interface Shard {
  id: number;
  clipPath: string;
  dx: number;
  dy: number;
  rotate: number;
}

// Pre-computed shard geometry for a 200x240 rectangle
const SHARDS: Shard[] = [
  { id: 0, clipPath: 'polygon(0% 0%, 45% 0%, 30% 35%, 0% 25%)',   dx: -120, dy: -80,  rotate: -35 },
  { id: 1, clipPath: 'polygon(45% 0%, 100% 0%, 100% 20%, 60% 30%)',dx: 130,  dy: -70,  rotate: 28  },
  { id: 2, clipPath: 'polygon(0% 25%, 30% 35%, 20% 65%, 0% 55%)',  dx: -110, dy: 40,   rotate: -45 },
  { id: 3, clipPath: 'polygon(30% 35%, 60% 30%, 55% 60%, 20% 65%)',dx: 0,    dy: -50,  rotate: 15  },
  { id: 4, clipPath: 'polygon(60% 30%, 100% 20%, 100% 55%, 65% 65%)',dx:130, dy: 30,   rotate: 40  },
  { id: 5, clipPath: 'polygon(0% 55%, 20% 65%, 10% 100%, 0% 100%)',dx: -90, dy: 100,   rotate: -60 },
  { id: 6, clipPath: 'polygon(20% 65%, 55% 60%, 50% 90%, 10% 100%)',dx: -30, dy: 110,  rotate: 20  },
  { id: 7, clipPath: 'polygon(55% 60%, 65% 65%, 60% 100%, 50% 90%)',dx: 20,  dy: 130,  rotate: -10 },
  { id: 8, clipPath: 'polygon(65% 65%, 100% 55%, 100% 100%, 60% 100%)',dx:120,dy: 90,  rotate: 55  },
];

interface ShatterEffectProps {
  children: React.ReactNode;
  startFrame: number; // frame when shatter begins
  width?: number;
  height?: number;
}

export const ShatterEffect: React.FC<ShatterEffectProps> = ({
  children,
  startFrame,
  width = 200,
  height = 240,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  // Before shatter — show intact
  if (localFrame < 0) {
    return <div style={{ width, height, position: 'relative' }}>{children}</div>;
  }

  const progress = spring({
    frame: localFrame,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  return (
    <div style={{ width, height, position: 'relative' }}>
      {SHARDS.map((shard) => {
        const tx = interpolate(progress, [0, 1], [0, shard.dx]);
        const ty = interpolate(progress, [0, 1], [0, shard.dy]);
        const rot = interpolate(progress, [0, 1], [0, shard.rotate]);
        const opacity = interpolate(progress, [0, 0.6, 1], [1, 0.9, 0]);

        return (
          <div
            key={shard.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              clipPath: shard.clipPath,
              transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
              opacity,
              transformOrigin: 'center center',
            }}
          >
            {children}
          </div>
        );
      })}
    </div>
  );
};
