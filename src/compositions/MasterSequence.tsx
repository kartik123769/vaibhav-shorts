// src/compositions/MasterSequence.tsx

import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { COLORS, SCENE_DURATIONS } from '../constants/timing';

import { Scene1Hook }     from '../scenes/Scene1Hook';
import { Scene2Sacrifice } from '../scenes/Scene2Sacrifice';
import { Scene3Stats }    from '../scenes/Scene3Stats';
import { Scene4Curse }   from '../scenes/Scene4Curse';
import { Scene5Truth }   from '../scenes/Scene5Truth';
import { Scene6Escape }  from '../scenes/Scene6Escape';
import { Scene7Warning } from '../scenes/Scene7Warning';

// Thin orange progress bar at the top of the video — retention hack
const ProgressIndicator: React.FC<{ totalFrames: number }> = ({ totalFrames }) => {
  // This component lives outside Series, so it has access to global frame
  // via useCurrentFrame — note: it will reset per-scene inside Series.
  // For a true global indicator, it must be placed in AbsoluteFill *outside* Series.
  return null; // handled in Root composition via globalFrame
};

export const MasterSequence: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#0A0A0A' }}>
      <Series>
        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene1}>
          <Scene1Hook />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene2}>
          <Scene2Sacrifice />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene3}>
          <Scene3Stats />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene4}>
          <Scene4Curse />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene5}>
          <Scene5Truth />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene6}>
          <Scene6Escape />
        </Series.Sequence>

        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene7}>
          <Scene7Warning />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
