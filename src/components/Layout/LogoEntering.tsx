import { useEffect, useRef, useState } from 'react';

import LogoWhite from '@/assets/images/LogoWhite.svg';
import { useTheme } from '@/styles/theme';
import { useChain } from '@/utils/animation';

const LogoEnteringSingle: React.VFC<{ delay: number; opacity: number }> = ({
  delay,
  opacity,
}) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const sourceX = useRef<number>(0);
  const sourceY = useRef<number>(0);

  const interpolate = (x: number) => Math.sin((x / 60) * (Math.PI / 2));

  const animatedX = useChain([
    {
      from: sourceX.current,
      to: 0,
      interpolate,
    },
  ]);

  const animatedY = useChain([
    {
      from: sourceY.current,
      to: 0,
      interpolate,
    },
  ]);

  const scale = useChain([
    {
      from: 0.4235,
      to: 1,
      interpolate,
      onEnterFrame: ({ frame }) => frame >= 1 && setStarted(true),
    },
  ]);

  useEffect(() => {
    const { x, y } = logoRef.current!.getBoundingClientRect();

    sourceX.current = 31 - x;
    sourceY.current = 64 - y;

    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      setTimeout(() => {
        animatedX.play();
        animatedY.play();
        scale.play();
      }, delay);
    }
  }, [ready]);

  return (
    <div
      style={{ height: '100%', width: '100%', position: 'absolute' }}
      className="flex items-center justify-center"
    >
      <div
        ref={logoRef}
        style={{
          transform: `translateX(${animatedX
            .values[0]!}px) translateY(${animatedY.values[0]!}px) scale(${scale
            .values[0]!})`,
          opacity: started ? opacity : 0,
        }}
      >
        <LogoWhite />
      </div>
    </div>
  );
};

export function LogoEntering() {
  const { navbarHeight } = useTheme();

  const { loadingDone } = useTheme();

  if (!loadingDone) {
    return null;
  }

  return (
    <div
      style={{
        height: `calc(100vh - ${navbarHeight}px)`,
        position: 'relative',
      }}
    >
      <LogoEnteringSingle delay={500} opacity={0.15} />
      <LogoEnteringSingle delay={400} opacity={0.2} />
      <LogoEnteringSingle delay={300} opacity={0.4} />
      <LogoEnteringSingle delay={200} opacity={0.6} />
      <LogoEnteringSingle delay={100} opacity={0.8} />
      <LogoEnteringSingle delay={0} opacity={1} />
    </div>
  );
}
