import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const TechTracker: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 14,
      mass: 0.8,
    },
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 500,
          left: 280,
          width: 380,
          height: 500,
          border: '3px solid #34d399',
          transform: `scale(${scale})`,
          boxShadow: '0 0 20px #34d399',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 460,
          left: 680,
          color: '#34d399',
          fontSize: 36,
          fontWeight: 700,
        }}
      >
        STRIKE RATE
      </div>

      <div
        style={{
          position: 'absolute',
          top: 510,
          left: 680,
          color: 'white',
          fontSize: 60,
          fontWeight: 900,
        }}
      >
        192.6
      </div>
    </AbsoluteFill>
  );
};
