// src/components/VideoBackground.tsx
// Wraps either a real <Video> or a placeholder gradient

import React from 'react';
import { AbsoluteFill, Video, OffthreadVideo, staticFile } from 'remotion';
import { COLORS } from '../constants/colors';

interface VideoBackgroundProps {
  src?: string;        // staticFile() path — optional
  placeholderLabel?: string;
  placeholderColor?: string;
  opacity?: number;
  gradient?: boolean;
  overlayOpacity?: number;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  placeholderLabel = 'VIDEO CLIP',
  placeholderColor = COLORS.orange,
  opacity = 1,
  gradient = true,
  overlayOpacity = 0.5,
}) => {
  return (
    <AbsoluteFill style={{ opacity }}>
      {src ? (
        <OffthreadVideo
          src={staticFile(src)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        // Placeholder for development
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(160deg, ${placeholderColor}22, ${COLORS.bg} 60%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              border: `2px dashed ${placeholderColor}44`,
              borderRadius: 16,
              padding: '20px 40px',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 24,
              fontWeight: 700,
              color: `${placeholderColor}66`,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            [ {placeholderLabel} ]
          </div>
        </div>
      )}

      {/* Dark overlay */}
      {gradient && (
        <AbsoluteFill
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,${overlayOpacity}) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,${overlayOpacity + 0.2}) 100%)`,
          }}
        />
      )}
    </AbsoluteFill>
  );
};

// Static image background
interface ImageBackgroundProps {
  src?: string;
  placeholderLabel?: string;
  accentColor?: string;
  overlayOpacity?: number;
  opacity?: number;
}

export const ImageBackground: React.FC<ImageBackgroundProps> = ({
  src,
  placeholderLabel = 'PHOTO',
  accentColor = COLORS.orange,
  overlayOpacity = 0.55,
  opacity = 1,
}) => {
  return (
    <AbsoluteFill style={{ opacity }}>
      {src ? (
        <img
          src={staticFile(src)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt=""
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(160deg, ${accentColor}18, ${COLORS.bg})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              border: `2px dashed ${accentColor}33`,
              borderRadius: 16,
              padding: '20px 40px',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: 24,
              fontWeight: 700,
              color: `${accentColor}55`,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            [ {placeholderLabel} ]
          </div>
        </div>
      )}
      <AbsoluteFill
        style={{
          background: `rgba(0,0,0,${overlayOpacity})`,
        }}
      />
    </AbsoluteFill>
  );
};
