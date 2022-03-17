import { useEffect, useRef, useState } from 'react';

import { unstable_batchedUpdates } from 'react-dom';
/** A function that maps frame index (60fps) to [0, 1] */
export type Interpolate = (frame: number) => number;

export interface AnimatedOptions {
  onStart?: () => void;
  onFinished?: () => void;
}

export const useAnimated = (
  interpolate: Interpolate,
  initial: number,
  target: number,
  options: AnimatedOptions = {},
): [number, 'idle' | 'pending'] => {
  let currentTaskRef = useRef<number | undefined>(undefined);
  const [currentValue, setCurrentValue] = useState(initial);
  const stateRef = useRef<'idle' | 'pending'>('idle');

  useEffect(() => {
    let i = 0;
    let cur = currentValue;
    let from = currentValue;

    function step() {
      currentTaskRef.current = requestAnimationFrame(() => {
        const intepolated = interpolate(i++);
        cur = from + (target - from) * intepolated;
        if (intepolated >= 1) {
          options.onFinished?.();
          stateRef.current = 'idle';
          setCurrentValue(cur);
          return;
        }

        stateRef.current = 'pending';
        setCurrentValue(cur);
        step();
      });
    }

    stateRef.current = 'idle';
    step();
    options.onStart?.();

    return () => {
      currentTaskRef.current && cancelAnimationFrame(currentTaskRef.current);
    };
  }, [target]);

  return [currentValue, stateRef.current];
};

export interface ChainCallbackEvent {
  reversed: boolean;
}

export interface ChainItem {
  interpolate: Interpolate;
  from: number;
  to: number;
  onStart?: (e: ChainCallbackEvent) => void;
  onFinished?: (e: ChainCallbackEvent) => void;
  onEnterFrame?: (
    e: ChainCallbackEvent & { interpolated: number; frame: number },
  ) => void;
}

export interface UseChainReturn {
  values: number[];
  play: () => Promise<void>;
  reverse: () => Promise<void>;
  currentIndex: number;
  isPlaying: boolean;
}

export const useChain = (items: ChainItem[]): UseChainReturn => {
  const [values, setValues] = useState<number[]>(
    items.map((item) => item.from),
  );
  let currentTaskRef = useRef<number | undefined>(undefined);
  let currentItemIndexRef = useRef<number>(0);
  let [isPlaying, setIsPlaying] = useState(false);

  const play = (reversed = false) => {
    currentTaskRef.current && cancelAnimationFrame(currentTaskRef.current);

    if (reversed) {
      currentItemIndexRef.current = items.length - 1;
    } else {
      currentItemIndexRef.current = 0;
    }

    let currentFrame = 0;

    return new Promise<void>((resolve) => {
      function step() {
        const item = items[currentItemIndexRef.current];

        if (item === undefined) {
          setIsPlaying(false);
          resolve();
          return;
        }

        const interpolatedFrame = currentFrame++;
        const interpolated = item.interpolate(interpolatedFrame);
        item?.onEnterFrame?.({
          reversed,
          interpolated,
          frame: interpolatedFrame,
        });

        const nextValue = reversed
          ? item.to + (item.from - item.to) * interpolated
          : item.from + (item.to - item.from) * interpolated;

        unstable_batchedUpdates(() => {
          setIsPlaying(true);
          setValues((values) =>
            values.map((v, i) =>
              i === currentItemIndexRef.current ? nextValue : v,
            ),
          );
        });

        if (interpolated >= 1) {
          item.onFinished?.({ reversed });

          if (reversed) {
            currentItemIndexRef.current--;
          } else {
            currentItemIndexRef.current++;
          }

          items[currentItemIndexRef.current]?.onStart?.({ reversed });

          currentFrame = 0;
        }

        currentTaskRef.current = requestAnimationFrame(step);
      }

      step();
    });
  };

  return {
    values,
    currentIndex: currentItemIndexRef.current,
    play,
    isPlaying,
    reverse: () => play(true),
  };
};
