import React, { useEffect, useState, useId, useRef } from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createInterpolator } from 'range-interpolator';

import MobileSlogan from '@/assets/images/MobileSlogan.svg';
import Slogan from '@/assets/images/Slogan.svg';
import { LgbtCircle } from '@/components/LgbtCircle';
import { useOpeningStrings } from '@/data/opening';
import { useTheme } from '@/styles/theme';
import { useScrolledVideo } from '@/utils/useScrolledVideo';
import { useScrollPercent } from '@/utils/useScrollPercent';

const sloganSpeed = 5;

const shouldDisplayEasterEgg =
  new Date().getMonth() === 2 - 1 && new Date().getDate() === 24; // 2.24

const shouldDisplayLGBT =
  new Date().getMonth() === 4 - 1 &&
  new Date().getDate() >= 20 &&
  new Date().getDate() <= 30;

const initialX = 0;
const initialY = 0;

const RandomCircle: React.VFC<{ fill?: string; maxX: number; maxY: number }> = (
  props,
) => {
  const { fill = 'currentColor', maxX, maxY } = props;

  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);

  useEffect(() => {
    let curX = x;
    let curY = y;

    (async () => {
      while (true) {
        const theta = 2 * Math.PI * Math.random();

        let xSpeed = sloganSpeed * Math.cos(theta);
        let ySpeed = sloganSpeed * Math.sin(theta);

        for (let i = 0; i < 600; i++) {
          await new Promise((r) => requestAnimationFrame(r));

          if (curX > maxX + 100 || curX < 0 - 100) {
            xSpeed *= -1;
          }

          if (curY > maxY + 100 || curY < 0 - 100) {
            ySpeed *= -1;
          }

          curX = curX + xSpeed;
          curY = curY + ySpeed;
          setX(curX);
          setY(curY);
        }
      }
    })();
  }, []);

  if (shouldDisplayLGBT) {
    return <LgbtCircle r={180} cx={x} cy={y} />;
  }
  return <circle r={180} cx={x} cy={y} fill={fill} />;
};

const AnimatedSlogan: React.VFC = () => {
  const maskId = useId();

  return (
    <Link
      href={shouldDisplayLGBT ? 'https://tokyorainbowpride.com/' : '/company'}
    >
      <a
        aria-label={
          shouldDisplayLGBT
            ? 'Monoid supports LGBT rights!'
            : 'Learn More about Monoid'
        }
        title={
          shouldDisplayLGBT
            ? 'Monoid supports LGBT rights!'
            : 'Learn More about Monoid'
        }
      >
        <svg
          className="mb-[20vh] sm:hidden"
          width={'80vw'}
          viewBox="0 0 1575 118"
        >
          <mask id={String(maskId)}>
            <Slogan fill="white" />
          </mask>

          <Slogan />

          <g mask={`url(#${maskId})`}>
            <RandomCircle
              fill={shouldDisplayEasterEgg ? '#0057b8' : undefined}
              maxX={1575}
              maxY={118}
            />
            <RandomCircle
              fill={shouldDisplayEasterEgg ? '#ffd700' : undefined}
              maxX={1575}
              maxY={118}
            />
          </g>
        </svg>
      </a>
    </Link>
  );
};

const MobileAnimatedSlogan: React.VFC = () => {
  const maskId = useId();

  return (
    <Link
      href={shouldDisplayLGBT ? 'https://tokyorainbowpride.com/' : '/company'}
    >
      <a
        aria-label={
          shouldDisplayLGBT
            ? 'Monoid supports LGBT rights!'
            : 'Learn More about Monoid'
        }
      >
        <svg
          className=">sm:hidden [shape-rendering:optimizeSpeed]"
          width="80vw"
          viewBox="0 0 357 517"
        >
          <mask id={String(maskId)}>
            <MobileSlogan fill="white" />
          </mask>

          <MobileSlogan />
          <g mask={`url(#${maskId})`}>
            {!shouldDisplayLGBT && (
              <RandomCircle
                fill={shouldDisplayEasterEgg ? '#0057b8' : undefined}
                maxX={357}
                maxY={517}
              />
            )}
            <RandomCircle
              fill={shouldDisplayEasterEgg ? '#ffd700' : undefined}
              maxX={357}
              maxY={517}
            />
          </g>
        </svg>
      </a>
    </Link>
  );
};

const VIDEO_RANGE = 0.5;

export default function () {
  const router = useRouter();

  const { navbarHeight } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const openingStrings = useOpeningStrings();

  useScrolledVideo(containerRef, videoRef, VIDEO_RANGE);

  const y = useScrollPercent(containerRef);

  const yVideo = Math.min(1, y / VIDEO_RANGE);

  const renderTopScreen = () => (
    <main
      style={{
        height: `calc(100vh - ${navbarHeight}px)`,
      }}
      className="flex flex-col justify-center items-center overflow-scroll shrink-0"
      role="main"
    >
      <div className="flex flex-col">
        <AnimatedSlogan />
        <MobileAnimatedSlogan />

        <button
          onClick={() => router.push('/company')}
          className={clsx(
            'sm:hidden font-loose text-[40px] font-bold self-end px-8 pb-2 pt-4',
            'border-4 border-black hover:text-gray-700 hover:border-gray-700',
          )}
        >
          LEARN MORE
        </button>
      </div>
    </main>
  );

  const renderVideo = () => {
    return (
      <video
        className={clsx(
          'pointer-events-none z-40 fixed right-0 bottom-0 left-0 object-cover w-screen max-w-[initial]',
        )}
        style={{ top: navbarHeight, height: `calc(100vh - ${navbarHeight}px)` }}
        ref={videoRef}
        preload="true"
        muted
      >
        <source src="/videos/opening.mp4" type="video/mp4" />
      </video>
    );
  };

  const renderVideoTexts = () => {
    const sloganOpacity = createInterpolator({
      inputRange: [0.001, 0.04, 0.06, 0.07],
      outputRange: [0, 1, 1, 0],
      extrapolate: 'clamp',
    });

    const introOpacity = createInterpolator({
      inputRange: [0.123, 0.16, 0.6, 0.64],
      outputRange: [0, 1, 1, 0],
      extrapolate: 'clamp',
    });

    const technologyOpacity = createInterpolator({
      inputRange: [0.7, 0.75, 0.78, 0.8],
      outputRange: [0, 1, 1, 0],
      extrapolate: 'clamp',
    });

    return (
      <div
        className={clsx(
          'pointer-events-none z-50 fixed right-0 bottom-0 left-0',
          'text-white',
        )}
        style={{ top: navbarHeight }}
      >
        <div className="h-full w-full relative">
          <div>{yVideo}</div>

          <div
            className="font-dense absolute text-[80px] left-[10vw] bottom-[20vh]"
            style={{
              opacity: sloganOpacity(yVideo),
            }}
          >
            {openingStrings.slogan}
          </div>

          <div
            className={clsx(
              'font-dense absolute bottom-[80px] left-[0] right-[0] flex justify-center',
            )}
            style={{
              opacity: introOpacity(yVideo),
            }}
          >
            <div className="w-[860px]">
              <h2 className="text-[40px] font-bold">
                {openingStrings.introTitle}
              </h2>

              <p className="text-[24px]">{openingStrings.introDetails}</p>
            </div>
          </div>

          <div
            className={clsx(
              'font-dense absolute right-[140px] top-0 bottom-0 flex flex-col justify-center',
              'w-[690px]',
            )}
            style={{
              opacity: technologyOpacity(yVideo),
            }}
          >
            <h2 className="text-[40px] font-bold">
              {openingStrings.technologyTitle}
            </h2>

            <p className="text-[24px]">{openingStrings.technologyDetails}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col shrink overflow-scroll" ref={containerRef}>
      {renderTopScreen()}

      <div className="pt-[400vh] shrink-0"></div>

      {renderVideo()}

      {renderVideoTexts()}
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'white',
      title: '合同会社Monoid | G.K. Monoid | Monoid',
    },
  };
}
