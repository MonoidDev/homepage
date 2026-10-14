import { useEffect, useState } from 'react';

export const useScroll = (
  containerRef: React.RefObject<HTMLDivElement>,
  shouldReturn: boolean,
) => {
  const [geometry, setGeometry] = useState({
    scrollTop: 0,
    scrollPercent: 0,
    clientHeight: 0,
    scrollHeight: 0,
  });
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !shouldReturn) return;
    const update = () => {
      const { scrollTop, clientHeight, scrollHeight } = container;
      const range = scrollHeight - clientHeight;
      const percent = clientHeight > 0 && range > 0 ? scrollTop / range : 0;
      setGeometry({
        scrollTop,
        clientHeight,
        scrollHeight,
        scrollPercent: Number.isFinite(percent)
          ? Math.max(0, Math.min(1, percent))
          : 0,
      });
    };
    update();
    container.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(container);
    for (const child of Array.from(container.children)) observer.observe(child);
    return () => {
      container.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, [containerRef, shouldReturn]);
  return geometry;
};
