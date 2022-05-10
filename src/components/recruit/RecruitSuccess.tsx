import React, { Suspense, useEffect } from 'react';

import { useAnimations, useGLTF } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { AxesHelper, LoopOnce } from 'three';

interface RecruitSuccessCanvasProps {
  onDone: () => void;
}

const RecruitSuccessCanvas: React.VFC<RecruitSuccessCanvasProps> = (props) => {
  const { onDone } = props;

  const gltf = useGLTF('/models/post1.glb');
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
          setTimeout(() => {
            onDone();
          }, 2000);
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
  onDone: () => void;
}

export const RecruitSuccess: React.VFC<RecruitSuccessProps> = (props) => {
  const { onDone } = props;

  return (
    <div className="bg-white self-stretch w-[550px]">
      <Canvas
        dpr={[1, 2]}
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          zoom: 6.5,
          position: [-17, 17, -25],
        }}
      >
        <Suspense fallback={null}>
          <RecruitSuccessCanvas onDone={onDone} />
        </Suspense>
      </Canvas>
    </div>
  );
};
