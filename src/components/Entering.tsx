import React, { useEffect } from 'react';

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
        color="black"
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  );
};

const EnteringCanvas: React.VFC<{ onFading: () => void }> = ({ onFading }) => {
  const { camera } = useThree();

  const { values: ringOpacity, play: playRingOpacity } = useChain(
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
  } = useChain([
    {
      from: 0,
      to: 80,
      interpolate: (x) => x / 120,
      onEnterFrame: ({ frame }) => frame === 80 && onFading(),
    },
  ]);

  useEffect(() => {
    playRingOpacity().then(() => {
      playCameraCircular();
      playCameraX();
    });
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

export const Entering: React.VFC<{ onDone: () => void }> = ({ onDone }) => {
  const {
    values: [backgroundOpacity],
    play,
  } = useChain([
    {
      from: 1,
      to: 0,
      interpolate: (x) => 1 - Math.cos((x / 15) * (Math.PI / 2)),
      onFinished: () => onDone(),
    },
  ]);

  return (
    <div
      id="canvas-container"
      className={clsx('fixed top-0 right-0 bottom-0 left-0')}
      style={{
        backgroundColor: `rgba(255, 255, 255, ${backgroundOpacity})`,
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          zoom: 5,
          position: [0, 0, 50],
        }}
      >
        <EnteringCanvas onFading={() => play()} />
      </Canvas>
    </div>
  );
};
