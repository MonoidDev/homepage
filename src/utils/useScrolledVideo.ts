import React, { useEffect, useRef } from 'react';

export const useScrolledVideo = (
  containerRef: React.RefObject<HTMLDivElement>,
  videoRef: React.RefObject<HTMLVideoElement>,
) => {
  const seekingRef = useRef(false);

  const unwrapContainer = () => containerRef.current!;
  const unwrapVideo = () => videoRef.current!;

  const getScrollPercent = () =>
    unwrapContainer().scrollTop /
    (unwrapContainer().scrollHeight - unwrapContainer().clientHeight);

  useEffect(() => {
    // To avoid "double seeking" that make Chrome stutter

    function setSeekingTrue() {
      seekingRef.current = true;
    }

    function setSeekingFalse() {
      seekingRef.current = false;
    }

    unwrapVideo().addEventListener('seeking', setSeekingTrue);

    unwrapVideo().addEventListener('seeked', setSeekingFalse);

    let cancelled = false;

    function step() {
      if (videoRef.current!.duration && !isNaN(getScrollPercent())) {
        if (!seekingRef.current) {
          videoRef.current!.currentTime =
            getScrollPercent() * videoRef.current!.duration;
        }
      }

      if (!cancelled) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);

    return () => {
      unwrapVideo().removeEventListener('seeking', setSeekingTrue);
      unwrapVideo().removeEventListener('seeked', setSeekingFalse);

      cancelled = true;
    };
  }, []);
};
