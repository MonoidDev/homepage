import React, {
  useEffect,
  useState,
  useId,
  useRef,
  ComponentProps,
} from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { createInterpolator } from 'range-interpolator';

import BackToTopSvg from '@/assets/images/BackToTop.svg';
import DotsSvg from '@/assets/images/Dots.svg';
import MobileSlogan from '@/assets/images/MobileSlogan.svg';
import MouseSvg from '@/assets/images/Mouse.svg';
import Slogan from '@/assets/images/Slogan.svg';
import { LgbtCircle } from '@/components/LgbtCircle';
import { OpeningLink } from '@/components/OpeningLink';
import { useOpeningStrings } from '@/data/opening';
import { useTheme } from '@/styles/theme';
import { useLocale } from '@/utils/useLocale';
import { useRendered } from '@/utils/useRendered';
import { useScreen } from '@/utils/useScreen';
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

const AnimatedSlogan: React.FC<{ isBottom?: boolean }> = ({
  isBottom = false,
}) => {
  const maskId = useId();

  const openingStrings = useOpeningStrings();

  const locale = useLocale();

  return (
    <span>
      {isBottom && (
        <div className="h-0 relative text-[80px]">
          <DotsSvg className="absolute bottom-[43px] left-[-30px]" />

          <h2
            className={clsx(
              'absolute bottom-0 left-[10px] font-dense font-bold',
              (locale === 'en-US' || locale === 'zh-CN') && 'pl-[8px]',
            )}
          >
            {openingStrings.letsCreate}
          </h2>
        </div>
      )}
      <svg className="w-[1056px] h-[76px] sm:hidden" viewBox="0 0 1575 118">
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

      {isBottom && (
        <div className="h-0 relative text-[80px]">
          <h2
            className={clsx(
              'absolute top-[30px] left-[10px] font-dense font-bold',
              (locale === 'en-US' || locale === 'zh-CN') && 'pl-[12px]',
            )}
          >
            {openingStrings.together}
          </h2>

          <div className="absolute md:top-[150px] >md:top-[220px] left-[20px] flex gap-x-[80px]">
            <OpeningLink color="black" target="_blank" href="/contact">
              CONTACT US
            </OpeningLink>

            <OpeningLink color="black" target="_blank" href="/recruit">
              JOIN US
            </OpeningLink>
          </div>
        </div>
      )}
    </span>
  );
};

const MobileAnimatedSlogan: React.VFC = () => {
  const maskId = useId();

  return (
    <Link
      href={
        shouldDisplayLGBT ? 'https://tokyorainbowpride.com/' : '/company/vision'
      }
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

const VIDEO_START = 1 / 10.2;
const VIDEO_RANGE = 6 / 10.2;

const VIDEO_WHITE_START = 0.7255;

export default function () {
  const { navbarHeight, setTheme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const openingStrings = useOpeningStrings();

  const rendered = useRendered();
  const screen = useScreen();

  const locale = useLocale();

  const shouldDisplayVideo = rendered === true && screen === 'desktop';

  const { scrollTop, clientHeight, scrollPercent, scrollHeight } = useScroll(
    containerRef,
    shouldDisplayVideo,
  );

  const id = useId();

  const yVideo =
    clientHeight === undefined ||
    scrollHeight === undefined ||
    !shouldDisplayVideo
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

  const videoOffset =
    clientHeight === undefined ||
    scrollHeight === undefined ||
    !shouldDisplayVideo
      ? 9999
      : createInterpolator({
          inputRange: [
            0,
            clientHeight,
            (scrollHeight - clientHeight) * (VIDEO_START + VIDEO_RANGE),
            (scrollHeight - clientHeight) * (VIDEO_START + VIDEO_RANGE) +
              clientHeight,
          ],
          outputRange: [clientHeight, 0, 0, -clientHeight],
          extrapolate: 'clamp',
        })(scrollTop);

  useEffect(() => {
    if (yVideo >= VIDEO_WHITE_START || yVideo === 0) {
      setTheme('white');
    } else {
      setTheme('black');
    }
  }, [yVideo === 0, yVideo >= VIDEO_WHITE_START]);

  const renderTopScreen = () => (
    <main
      className={clsx(
        'flex flex-col items-center justify-between overflow-scroll shrink-0 pt-[220px] sm:!pt-[50px] pb-[40px]',
      )}
      role="main"
    >
      <AnimatedSlogan />
      <MobileAnimatedSlogan />

      <div
        className={clsx(
          'pt-[24vh] md:!pt-[12vh] sm:hidden',
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

  const renderVideo = () => {
    return (
      <video
        className={clsx(
          'pointer-events-none z-30 fixed right-0 bottom-0 left-0 object-cover w-screen max-w-[initial]',
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
      inputRange: [0, 0.06, 0.073],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const introOpacity = createInterpolator({
      inputRange: [0.151, 0.1724, 0.4456, 0.4817],
      outputRange: [0, 1, 1, 0],
      extrapolate: 'clamp',
    });

    const technologyOpacity = createInterpolator({
      inputRange: [0.5034, 0.5159, 0.5672, 0.5771],
      outputRange: [0, 1, 1, 0],
      extrapolate: 'clamp',
    });

    const servicesOpacity = createInterpolator({
      inputRange: [0.95, 0.9914, 1],
      outputRange: [0, 1, 1],
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
          {/* <div className="text-green-500">{yVideo}</div> */}

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
              'font-dense absolute top-[63%] left-[0] right-[0] flex justify-center',
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
              <OpeningLink color="white" href="/company/info" target="_blank">
                COMPANY
              </OpeningLink>
            </div>
          </div>

          <div className="absolute left-0 right-0 top-[38vh] flex justify-center">
            <div
              className={clsx(
                'text-[100px] leading-none font-dense',
                (locale === 'en-US' || locale === 'zh-CN') && 'text-[120px]',
              )}
              style={
                {
                  '-webkit-text-fill-color': 'white',
                  '-webkit-text-stroke-width': '1px',
                  '-webkit-text-stroke-color': 'black',
                  opacity: servicesOpacity(yVideo),
                } as any
              }
            >
              {openingStrings.services}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBusinessContent = () => {
    const ratio = createInterpolator({
      inputRange: [7 / 9, 8 / 9],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const renderDX = () => {
      const renderTexts = () => (
        <>
          {(locale === 'ja-JP' || locale === 'zh-CN') && (
            <text
              x={0}
              y={78}
              className="font-dense font-bold text-[80px] text-black"
            >
              {openingStrings.DXAcceleration}
            </text>
          )}
          {locale === 'en-US' && (
            <>
              <text
                x={0}
                y={70}
                className="font-dense font-bold text-[80px] text-black"
                opacity={0.6}
              >
                DX
              </text>

              <text
                x={40}
                y={107}
                className="font-dense font-bold text-[80px] text-black"
              >
                Acceleration
              </text>
            </>
          )}

          <text
            x={0}
            y={110}
            className="font-dense font-bold text-[20px] text-black"
          >
            {openingStrings.DXAccelerationSummary?.map((s, i) => (
              <tspan key={i} x="0" dy="1.2em">
                {s}
              </tspan>
            ))}
          </text>
        </>
      );

      const renderCircle = (props: ComponentProps<'circle'>) => {
        return (
          <circle cx="250" cy="132" r={120 * ratio(scrollPercent)} {...props} />
        );
      };

      return (
        <svg
          width={395}
          height={254}
          viewBox="0 0 395 254"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id={`${id}:businessContentDXMask`}>
            {renderCircle({ fill: 'white' })}
            {renderTexts()}
          </mask>
          {renderTexts()}

          {renderCircle({ fill: 'white' })}

          {renderCircle({ mask: `url(#${id}:businessContentDXMask)` })}
        </svg>
      );
    };

    const renderNewBusiness = () => {
      const renderTexts = () => {
        return (
          <>
            {(locale === 'ja-JP' || locale === 'zh-CN') && (
              <text
                x={150}
                y={150}
                className="font-dense font-bold text-[80px] text-black"
              >
                {openingStrings.newBusiness}
              </text>
            )}

            {locale === 'en-US' && (
              <>
                <text
                  x={150}
                  y={138}
                  className="font-dense font-bold text-[80px] text-black"
                  opacity={0.6}
                >
                  Product
                </text>

                <text
                  x={204}
                  y={175}
                  className="font-dense font-bold text-[80px] text-black"
                >
                  Incubation
                </text>
              </>
            )}

            <text
              y={180}
              className="font-dense font-bold text-[20px] text-black"
            >
              {openingStrings.newBusinessSummary?.map((s, i) => (
                <tspan key={i} x="320" dy="1.2em" textAnchor="right">
                  {s}
                </tspan>
              ))}
            </text>
          </>
        );
      };

      const x = 59;
      const y = 61;
      const width = 288;
      const height = 288;
      const [centerX, centerY] = [x + width / 2, y + height / 2];

      const renderRect = (props?: ComponentProps<'rect'>) => {
        const r = ratio(scrollPercent) * 360 + 30;
        return (
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            transform={`rotate(${r}, ${centerX}, ${centerY})`}
            {...props}
          />
        );
      };

      return (
        <svg
          width={551}
          height={408}
          viewBox="0 0 551 408"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id={`${id}:businessContentNewBusinessMask`}>
            {renderRect({ fill: 'white' })}
            {renderTexts()}
          </mask>

          {renderTexts()}
          {renderRect({
            fill: 'white',
          })}
          <g mask={`url(#${id}:businessContentNewBusinessMask)`}>
            {renderRect({})}
          </g>
        </svg>
      );
    };

    const renderItem = (index: number, title: React.ReactNode) => {
      return (
        <li key={index} className="list-none">
          <span className="font-dense text-[36px] font-bold mr-[10px]">
            {index.toString().padStart(2, '0')}
          </span>

          <span className="font-dense text-[24px] font-bold">{title}</span>
        </li>
      );
    };

    return (
      <div
        id="#businessContent"
        className="shrink-0 w-[1056px] self-center flex flex-col gap-y-[37px] justify-center relative z-40"
        style={{
          height: `calc(2.2 * (100vh - ${navbarHeight}px))`,
        }}
      >
        <div className="h-[1px] bg-black absolute left-[100px] right-[100px] rotate-[-20deg]" />

        <div className="flex h-[254px] gap-x-[100px]">
          <div className="relative">
            {renderDX()}

            <OpeningLink
              color="black"
              href="/works/1"
              className="absolute left-0 bottom-0"
              target="_blank"
            >
              SEE WORKS
            </OpeningLink>
          </div>

          <div className="flex-1">
            {openingStrings.DXAccelarationItems?.map((v, index) =>
              renderItem(index, v),
            )}
          </div>
        </div>

        <div className="flex h-[408px]">
          <div className="flex-1 flex justify-end">
            <div className="pt-[80px]">
              {openingStrings.newBusinessItems?.map((v, index) =>
                renderItem(index, v),
              )}
            </div>
          </div>

          <div className="relative">
            {renderNewBusiness()}

            <OpeningLink
              color="black"
              href="/works/0"
              className="absolute right-0 bottom-0"
              target="_blank"
            >
              SEE WORKS
            </OpeningLink>
          </div>
        </div>
      </div>
    );
  };

  const renderBottomScreen = () => {
    return (
      <main
        style={{
          height: `calc(100vh - ${navbarHeight}px)`,
        }}
        className={clsx(
          'flex flex-col items-center justify-between overflow-scroll shrink-0 pt-[220px] pb-[40px]',
          'relative',
        )}
        role="main"
      >
        <AnimatedSlogan isBottom />
        <MobileAnimatedSlogan />

        <BackToTopSvg
          className="absolute bottom-0 right-0 cursor-pointer"
          onClick={() => {
            containerRef.current!.scrollTop = 0;
          }}
        />
      </main>
    );
  };

  return (
    <div
      className="flex flex-col shrink overflow-scroll relative z-0"
      ref={containerRef}
    >
      {/* 1/9 */}
      {renderTopScreen()}
      {rendered && screen === 'desktop' && (
        <>
          {renderVideo()}

          {renderVideoTexts()}

          {/* 7/9 */}
          <div
            className="shrink-0"
            style={{
              height: `calc(7 * (100vh - ${navbarHeight}px))`,
            }}
          />
          {/* 1/9 */}
          {renderBusinessContent()}

          {/* 1/9 */}
          {renderBottomScreen()}
        </>
      )}
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
