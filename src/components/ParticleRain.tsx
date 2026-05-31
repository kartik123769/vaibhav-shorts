// src/components/ParticleRain.tsx
// CSS-driven falling particle system — no canvas needed

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface Particle {
  id: number;
  x: number;
  startY: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
}

// Deterministic pseudo-random using seed
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

const generateParticles = (count: number): Particle[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: seededRandom(i * 3.7) * 100,
    startY: -5 - seededRandom(i * 2.1) * 20,
    size: 4 + seededRandom(i * 5.3) * 8,
    speed: 0.15 + seededRandom(i * 1.9) * 0.25,
    opacity: 0.3 + seededRandom(i * 4.4) * 0.5,
    delay: seededRandom(i * 6.1) * 60,
  }));

const PARTICLES = generateParticles(40);

interface ParticleRainProps {
  color?: string;
  count?: number;
  startFrame?: number;
}

export const ParticleRain: React.FC<ParticleRainProps> = ({
  color = '#FF6B35',
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: fadeIn,
      }}
    >
      {PARTICLES.map((p) => {
        const effectiveFrame = Math.max(0, localFrame - p.delay);
        const y = (p.startY + effectiveFrame * p.speed * 100) % 120;
        const fadeOut = interpolate(y, [100, 120], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: color,
              opacity: p.opacity * fadeOut,
              filter: `blur(${p.size * 0.3}px)`,
              boxShadow: `0 0 ${p.size * 2}px ${color}66`,
            }}
          />
        );
      })}
    </div>
  );
};
