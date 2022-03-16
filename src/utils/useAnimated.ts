import { useEffect, useRef, useState } from 'react';

export const useAnimated = (
  interpolate: (from: number, target: number, frame: number) => number,
  initial: number,
  target: number,
) => {
  let currentTaskRef = useRef<number | undefined>(undefined);
  const [currentValue, setCurrentValue] = useState(initial);

  useEffect(() => {
    let i = 0;
    let cur = currentValue;
    let from = currentValue;

    function step() {
      if (Math.abs(cur - target) < 0.001) {
        return;
      }

      currentTaskRef.current = requestAnimationFrame(() => {
        cur = interpolate(from, target, i++);
        setCurrentValue(cur);
        step();
      });
    }

    step();

    return () => {
      currentTaskRef.current && cancelAnimationFrame(currentTaskRef.current);
    };
  }, [target]);

  return currentValue;
};
