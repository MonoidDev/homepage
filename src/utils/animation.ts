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
  cancel: () => void;
  reset: () => void;
  reverse: () => Promise<void>;
  currentIndex: number;
  isPlaying: boolean;
  currentValue: number;
}

export const useChain = (items: ChainItem[]): UseChainReturn => {
  const [values, setValues] = useState<number[]>(
    items.map((item) => item.from),
  );
  let currentTaskRef = useRef<number | undefined>(undefined);
  let currentItemIndexRef = useRef<number>(0);
  let [isPlaying, setIsPlaying] = useState(false);

  const cancel = () => {
    currentTaskRef.current && cancelAnimationFrame(currentTaskRef.current);
  };

  const reset = () => {
    cancel();

    currentItemIndexRef.current = 0;
    setValues(items.map((item) => item.from));
    setIsPlaying(false);
  };

  const play = (reversed = false) => {
    cancel();

    if (reversed) {
      currentItemIndexRef.current = items.length - 1;
      setValues(items.map((item) => item.to));
    } else {
      currentItemIndexRef.current = 0;
      setValues(items.map((item) => item.from));
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

        const indexToUpdate = currentItemIndexRef.current; // This might be changed later
        unstable_batchedUpdates(() => {
          setIsPlaying(true);
          setValues((values) =>
            values.map((v, i) => (i === indexToUpdate ? nextValue : v)),
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
    currentValue:
      values[
        Math.max(0, Math.min(currentItemIndexRef.current, values.length - 1))
      ]!,
    play,
    cancel,
    isPlaying,
    reverse: () => play(true),
    reset,
  };
};

export const mix = (from: number, to: number, t: number) =>
  from + (to - from) * t;

/** Maps `progress` inside [start, end] to [0, 1], clamped outside the window. */
export const segment = (progress: number, start: number, end: number) =>
  Math.min(1, Math.max(0, (progress - start) / (end - start)));

export const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

/**
 * Hover timeline: `progress` moves linearly toward 1 on enter and toward 0 on
 * leave, at a speed of one full run per `enterMs` / `leaveMs`, always starting
 * from its current value — so leaving mid-animation reverses smoothly instead
 * of snapping to the end first. Durations are in elapsed time, so the speed
 * doesn't depend on the display's refresh rate. With reduced motion it jumps
 * straight to the target.
 */
export const useHoverTimeline = (
  enterMs: number,
  leaveMs: number = enterMs,
) => {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const frameRef = useRef<number>();

  const runTo = (target: 0 | 1) => {
    if (frameRef.current !== undefined) {
      cancelAnimationFrame(frameRef.current);
    }

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const duration = reduceMotion ? 0 : target === 1 ? enterMs : leaveMs;
    const from = progressRef.current;
    const start = performance.now();

    const step = (now: number) => {
      // A frame's timestamp can be slightly older than the hover event.
      const elapsed = Math.max(0, now - start);
      const travelled = duration === 0 ? 1 : elapsed / duration;
      const next =
        target === 1
          ? Math.min(1, from + travelled)
          : Math.max(0, from - travelled);

      progressRef.current = next;
      setProgress(next);
      frameRef.current =
        next === target ? undefined : requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
  };

  useEffect(
    () => () => {
      if (frameRef.current !== undefined) {
        cancelAnimationFrame(frameRef.current);
      }
    },
    [],
  );

  return {
    progress,
    enter: () => runTo(1),
    leave: () => runTo(0),
  };
};
