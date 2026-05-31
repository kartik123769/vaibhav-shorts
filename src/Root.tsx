// src/Root.tsx — Remotion entry point

import React from 'react';
import { Composition, AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { MasterSequence } from './compositions/MasterSequence';
import { TOTAL_FRAMES, FPS, VIDEO_WIDTH, VIDEO_HEIGHT, SCENE_DURATIONS } from './constants/timing';
import { COLORS } from './constants/colors';

// Global progress bar — sits above all scenes
const GlobalProgressBar: React.FC<{ totalFrames: number }> = ({ totalFrames }) => {
  const frame = useCurrentFrame();
  const pct = (frame / totalFrames) * 100;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 6,
        zIndex: 9998,
        background: 'rgba(0,0,0,0.4)',
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${COLORS.orange}AA, ${COLORS.orange})`,
          boxShadow: `0 0 8px ${COLORS.orange}88`,
        }}
      />
    </div>
  );
};

// Full composition wrapper with global overlays
const FullVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      <MasterSequence />
      <GlobalProgressBar totalFrames={TOTAL_FRAMES} />
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => (
  <>
    {/* MAIN: Full 58-second video */}
    <Composition
      id="VaibhavShortsFullVideo"
      component={FullVideo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />

    {/* INDIVIDUAL SCENE PREVIEWS — for fast iteration */}
    <Composition
      id="Scene1_Hook"
      component={MasterSequence}
      durationInFrames={SCENE_DURATIONS.scene1}
      fps={FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
    <Composition
      id="Scene2_Sacrifice"
      component={MasterSequence}
      durationInFrames={SCENE_DURATIONS.scene2}
      fps={FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
    <Composition
      id="Scene3_Stats"
      component={MasterSequence}
      durationInFrames={SCENE_DURATIONS.scene3}
      fps={FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  </>
);
