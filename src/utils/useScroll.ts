import { useEffect, useState } from 'react';

export const useScroll = (
  containerRef: React.RefObject<HTMLDivElement>,
  shouldReturn: boolean,
) => {
  const unwrapContainer = () => containerRef.current!;
  const getScrollPercent = () =>
    unwrapContainer().scrollTop /
    (unwrapContainer().scrollHeight - unwrapContainer().clientHeight);

  const [scrollTop, setScrollTop] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [clientHeight, setClientHeight] = useState<number | undefined>();
  const [scrollHeight, setScrollHeight] = useState<number | undefined>();

  useEffect(() => {
    let cancelled = false;

    function step() {
      if (unwrapContainer() && shouldReturn) {
        setScrollPercent(getScrollPercent);
        setScrollTop(unwrapContainer().scrollTop);
        setClientHeight(unwrapContainer().clientHeight);
        setScrollHeight(unwrapContainer().scrollHeight);
      }

      if (!cancelled) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);

    return () => {
      cancelled = true;
    };
  }, [shouldReturn]);

  return {
    scrollTop,
    scrollPercent,
    clientHeight,
    scrollHeight,
  };
};
