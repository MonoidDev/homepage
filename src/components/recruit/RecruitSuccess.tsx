import React, { Suspense, useEffect } from 'react';

import { useAnimations, useGLTF } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { AxesHelper, LoopOnce } from 'three';

interface RecruitSuccessCanvasProps {
  onDone?: () => void;
}

const MODEL_SOURCE = '/models/post0505动画22.glb';

if (typeof window !== 'undefined') {
  useGLTF.preload(MODEL_SOURCE);
}

const RecruitSuccessCanvas: React.VFC<RecruitSuccessCanvasProps> = (props) => {
  const { onDone } = props;

  const gltf = useGLTF(MODEL_SOURCE);
  const { camera } = useThree();

  const { actions, mixer } = useAnimations(gltf.animations, gltf.scene);

  useEffect(() => {
    camera.lookAt(0, 2.4, 0);
  }, []);

  useEffect(() => {
    requestIdleCallback(() => {
      const mail = actions['平面.002Action.002']!;
      const gate = actions['柱体.003Action.001']!;
      const postbox = actions['空物体Action.001']!;

      mail.loop = LoopOnce;
      gate.loop = LoopOnce;
      gate.clampWhenFinished = true;
      postbox.loop = LoopOnce;

      mail.play();
      setTimeout(() => {
        gate.play();
        postbox.play();
      }, 400);

      mixer.addEventListener('finished', (e) => {
        if (e.action.getClip() === gate.getClip()) {
          onDone?.();
        }
      });
    });
  }, []);

  return (
    <>
      {false && <primitive object={new AxesHelper(10)} />}
      <primitive object={gltf.scene} />
    </>
  );
};

export interface RecruitSuccessProps {
  shouldLoad: boolean;
  zoom?: number;
  onDone?: () => void;
}

export const RecruitSuccess: React.VFC<RecruitSuccessProps> = (props) => {
  const { shouldLoad, onDone, zoom = 6.5 } = props;

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{
        fov: 75,
        near: 0.1,
        far: 1000,
        zoom,
        position: [-17, 17, -25],
      }}
    >
      {shouldLoad && (
        <Suspense fallback={null}>
          <RecruitSuccessCanvas onDone={onDone} />
        </Suspense>
      )}
    </Canvas>
  );
};
