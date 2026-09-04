import React from 'react';
import {Composition} from 'remotion';
import {CourseOverviewVideo, OVERVIEW_FPS, getOverviewDurationInFrames} from './course-overview/CourseOverviewVideo';
import coreContent from '../core-video-content.json';

const coreVideoIds = coreContent.videos.map(video => video.id);

export const VideoRoot: React.FC = () => (
  <>
    {coreVideoIds.map((videoId) => (
      <Composition
        key={videoId}
        id={videoId}
        component={CourseOverviewVideo}
        width={1920}
        height={1080}
        fps={OVERVIEW_FPS}
        durationInFrames={getOverviewDurationInFrames(videoId)}
        defaultProps={{videoId}}
      />
    ))}
  </>
);