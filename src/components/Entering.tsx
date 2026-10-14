/* React Three Fiber declares these mesh/material properties. */
/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef, useState } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import clsx from 'clsx';
import * as THREE from 'three';

import { useChain } from '@/utils/animation';

const RING_SIZE = 1.25;

const Ring: React.VFC<{
  index: number;
  positionX: number;
  opacity: number;
}> = ({ index, positionX, opacity }) => {
  const adjustment = [
    index === 6 && -0.014,
    index === 7 && -0.028,
    index === 8 && 0.028,
    index === 9 && 0.014,
  ]
    .filter(Boolean)
    .reduce((a, b) => (a as number) + (b as number), 0) as number;

  return (
    <mesh
      position={[positionX, 0, 0]}
      rotation={[0, ((1 + adjustment) * Math.PI) / 2, 0]}
    >
      <ringGeometry args={[RING_SIZE * 0.95, RING_SIZE, 64]} />
      <meshBasicMaterial
        side={THREE.DoubleSide}
        color="white"
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  );
};

const EnteringCanvas: React.VFC<{ onFading: () => void }> = ({ onFading }) => {
  const { camera } = useThree();

  const {
    values: ringOpacity,
    play: playRingOpacity,
    cancel: cancelRings,
  } = useChain(
    Array(16)
      .fill(1)
      .map((_) => ({
        from: 0,
        to: 1,
        interpolate: (x) => x / 10,
      })),
  );

  const {
    values: [cameraCircular],
    play: playCameraCircular,
    cancel: cancelCircular,
  } = useChain([
    {
      from: 0,
      to: Math.PI / 2,
      interpolate: (x) => x / 40,
    },
  ]);

  const {
    values: [cameraX],
    play: playCameraX,
    cancel: cancelCamera,
  } = useChain([
    {
      from: 0,
      to: 80,
      interpolate: (x) => x / 120,
      onEnterFrame: ({ frame }) => frame === 80 && onFading(),
    },
  ]);

  useEffect(() => {
    let cancelled = false;
    playRingOpacity().then(() => {
      if (cancelled) return;
      playCameraCircular();
      playCameraX();
    });
    return () => {
      cancelled = true;
      cancelRings();
      cancelCircular();
      cancelCamera();
    };
  }, []);

  useFrame(() => {
    camera.position.x = -50 * Math.sin(cameraCircular!) + cameraX!;
    camera.position.z = 50 * Math.cos(cameraCircular!);
    if (camera.position.x <= 0) {
      camera.lookAt(0, 0, 0);
    } else {
      camera.lookAt(1000, 0, 0);
    }
  });

  return (
    <>
      {Array(16)
        .fill(1)
        .map((_, i) => (
          <Ring
            key={i}
            index={i}
            positionX={(i - 7.5) * 1.5}
            opacity={ringOpacity[i]!}
          />
        ))}
    </>
  );
};

const useStrings = makeStrings({
  'en-US': { skip: 'Skip introduction' },
  'ja-JP': { skip: 'イントロをスキップ' },
  'zh-CN': { skip: '跳过开场动画' },
});

const FailOpen = ({ onDone }: { onDone: () => void }) => {
  useEffect(onDone, [onDone]);
  return null;
};
class EntranceBoundary extends React.Component<
  { onDone: () => void; children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onDone();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export const Entering: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const strings = useStrings();
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || window.matchMedia('(max-width: 899px)').matches) {
      doneRef.current();
      return;
    }
    setReady(true);
    const timeout = window.setTimeout(() => doneRef.current(), 8000);
    const bypass = () => {
      if (motion.matches) doneRef.current();
    };
    motion.addEventListener('change', bypass);
    return () => {
      clearTimeout(timeout);
      motion.removeEventListener('change', bypass);
    };
  }, []);
  const finish = () => doneRef.current();
  if (!ready) return null;
  return (
    <div className={clsx('z-[60] fixed inset-0 sm:hidden bg-black text-white')}>
      <EntranceBoundary onDone={finish}>
        <Canvas
          fallback={<FailOpen onDone={finish} />}
          dpr={[1, 2]}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', finish, {
              once: true,
            });
          }}
          camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
            zoom: 5,
            position: [0, 0, 50],
          }}
        >
          <EnteringCanvas onFading={finish} />
        </Canvas>
      </EntranceBoundary>
      <button
        autoFocus
        type="button"
        onClick={finish}
        className="absolute right-8 bottom-8 border border-white rounded-full px-6 py-3 font-loose"
      >
        {strings.skip}
      </button>
    </div>
  );
};
