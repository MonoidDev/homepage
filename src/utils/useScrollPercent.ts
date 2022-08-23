import { useEffect, useState } from 'react';

export const useScrollPercent = (
  containerRef: React.RefObject<HTMLDivElement>,
) => {
  const unwrapContainer = () => containerRef.current!;
  const getScrollPercent = () =>
    unwrapContainer().scrollTop /
    (unwrapContainer().scrollHeight - unwrapContainer().clientHeight);

  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    let cancelled = false;

    function step() {
      setScrollPercent(getScrollPercent);

      if (!cancelled) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);

    return () => {
      cancelled = true;
    };
  }, []);

  return scrollPercent;
};
