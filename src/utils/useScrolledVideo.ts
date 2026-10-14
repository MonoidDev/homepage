import React, { useEffect, useRef } from 'react';

export const useScrolledVideo = (
  containerRef: React.RefObject<HTMLDivElement>,
  videoRef: React.RefObject<HTMLVideoElement>,
  range: number,
  offset: number,
  enabled = true,
) => {
  const offsetRef = useRef(offset);
  offsetRef.current = offset;
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!enabled || !container || !video) return;
    let seeking = false;
    const update = () => {
      const length = range * (container.scrollHeight - container.clientHeight);
      if (
        seeking ||
        container.clientHeight <= 0 ||
        length <= 0 ||
        !Number.isFinite(video.duration)
      )
        return;
      const progress = Math.min(
        1,
        Math.max(0, container.scrollTop - offsetRef.current) / length,
      );
      const target = progress * video.duration;
      if (
        Number.isFinite(target) &&
        Math.abs(video.currentTime - target) > 1 / 30
      )
        video.currentTime = target;
    };
    const onSeeking = () => {
      seeking = true;
    };
    const onSeeked = () => {
      seeking = false;
      update();
    };
    video.addEventListener('seeking', onSeeking);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('loadedmetadata', update);
    container.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      video.removeEventListener('seeking', onSeeking);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadedmetadata', update);
      container.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [containerRef, videoRef, range, enabled]);
};
