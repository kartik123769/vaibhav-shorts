import React from 'react';
import { Composition, AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { MasterSequence } from './compositions/MasterSequence';
import { TOTAL_FRAMES, FPS, VIDEO_WIDTH, VIDEO_HEIGHT, SCENE_DURATIONS } from './constants/timing';
import { COLORS } from './constants/colors';

const GlobalProgressBar: React.FC<{ totalFrames: number }> = ({ totalFrames }) => {
  const frame = useCurrentFrame();
  const pct = (frame / totalFrames) * 100;
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, zIndex: 9998, background: 'rgba(0,0,0,0.4)' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${COLORS.orange}AA, ${COLORS.orange})`, boxShadow: `0 0 8px ${COLORS.orange}88` }} />
    </div>
  );
};

const FullVideo: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.bg }}>
    <MasterSequence />
    <GlobalProgressBar totalFrames={TOTAL_FRAMES} />
  </AbsoluteFill>
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="VaibhavShortsFullVideo"
      component={FullVideo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
    <Composition
      id="Scene1-Hook"
      component={MasterSequence}
      durationInFrames={SCENE_DURATIONS.scene1}
      fps={FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
    <Composition
      id="Scene2-Sacrifice"
      component={MasterSequence}
      durationInFrames={SCENE_DURATIONS.scene2}
      fps={FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
    <Composition
      id="Scene3-Stats"
      component={MasterSequence}
      durationInFrames={SCENE_DURATIONS.scene3}
      fps={FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  </>
);
