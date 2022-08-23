import React, { useEffect, useState, useId, useRef } from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { createInterpolator } from 'range-interpolator';

import MobileSlogan from '@/assets/images/MobileSlogan.svg';
import MouseSvg from '@/assets/images/Mouse.svg';
import Slogan from '@/assets/images/Slogan.svg';
import { LgbtCircle } from '@/components/LgbtCircle';
import { OpeningLink } from '@/components/OpeningLink';
import { useOpeningStrings } from '@/data/opening';
import { useTheme } from '@/styles/theme';
import { useLocale } from '@/utils/useLocale';
import { useScroll } from '@/utils/useScroll';
import { useScrolledVideo } from '@/utils/useScrolledVideo';

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
          className="w-[1056px] h-[76px] sm:hidden"
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
  const { navbarHeight, setTheme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const openingStrings = useOpeningStrings();

  const locale = useLocale();

  const { scrollTop, clientHeight, scrollHeight } = useScroll(containerRef);

  const yVideo =
    clientHeight === undefined || scrollHeight === undefined
      ? 0
      : Math.max(
          0,
          Math.min(
            1,
            (scrollTop - clientHeight) /
              (scrollHeight - clientHeight) /
              VIDEO_RANGE,
          ),
        );

  useScrolledVideo(containerRef, videoRef, VIDEO_RANGE, clientHeight ?? 99999);

  useEffect(() => {
    if (yVideo > 0) {
      setTheme('black');
    } else {
      setTheme('white');
    }
  }, [yVideo === 0]);

  const renderTopScreen = () => (
    <main
      style={{
        height: `calc(100vh - ${navbarHeight}px)`,
      }}
      className="flex flex-col items-center justify-between overflow-scroll shrink-0 pt-[220px] pb-[40px]"
      role="main"
    >
      <AnimatedSlogan />
      <MobileAnimatedSlogan />

      <div
        className={clsx(
          'pt-[30vh] sm:hidden',
          scrollTop === 0 && 'animate-bounce-scroll',
        )}
      >
        <MouseSvg />
        <div className="text-[20px] text-center text-black font-dense mt-[6px]">
          scroll
        </div>
      </div>
    </main>
  );

  const videoOffset =
    clientHeight === undefined
      ? 9999
      : scrollTop < clientHeight
      ? clientHeight - scrollTop
      : 0;

  const renderVideo = () => {
    return (
      <video
        className={clsx(
          'pointer-events-none z-40 fixed right-0 bottom-0 left-0 object-cover w-screen max-w-[initial]',
        )}
        style={{
          top: navbarHeight,
          height: `calc(100vh - ${navbarHeight}px)`,
          transform: `translateY(${videoOffset}px)`,
        }}
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
      inputRange: [0.08, 0.1, 0.12],
      outputRange: [1, 1, 0],
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
        style={{ top: navbarHeight, transform: `translateY(${videoOffset}px)` }}
      >
        <div className="h-full w-full relative">
          <div>{yVideo}</div>

          <div
            className={clsx(
              'font-dense absolute text-[80px] left-[10vw] bottom-[20vh]',
              (locale === 'en-US' || locale === 'zh-CN') &&
                'text-[100px] leading-[0.95]',
            )}
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
              <h2
                className={clsx(
                  'text-[40px] font-bold',
                  locale === 'en-US' && 'text-[50px] leading-tight',
                )}
              >
                {openingStrings.introTitle}
              </h2>

              <p
                className={clsx(
                  'text-[24px]',
                  locale === 'en-US' && 'text-[30px] leading-tight',
                )}
              >
                {openingStrings.introDetails}
              </p>
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
            <h2
              className={clsx(
                'text-[40px] font-bold',
                locale === 'en-US' && 'text-[50px] leading-tight',
              )}
            >
              {openingStrings.technologyTitle}
            </h2>

            <p
              className={clsx(
                'text-[24px]',
                locale === 'en-US' && 'text-[30px] opacity-60',
                locale === 'zh-CN' && 'opacity-60',
              )}
            >
              {openingStrings.technologyDetails}
            </p>

            <div
              className="flex justify-end mt-[40px]"
              style={{
                pointerEvents:
                  technologyOpacity(yVideo) === 0 ? 'none' : 'auto',
              }}
            >
              <OpeningLink color="white" href="/company">
                COMPANY
              </OpeningLink>
            </div>
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
