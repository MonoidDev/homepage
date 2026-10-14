import React, {
  useEffect,
  useState,
  useId,
  useRef,
  ComponentProps,
} from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
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
import { useScreen, useReducedMotion } from '@/utils/useScreen';
import { useScroll } from '@/utils/useScroll';
import { useScrolledVideo } from '@/utils/useScrolledVideo';

const sloganSpeed = 5;
const useHomeStrings = makeStrings({
  'en-US': {
    works: 'SEE WORKS',
    contact: 'CONTACT US',
    join: 'JOIN US',
    company: 'ABOUT MONOID',
    top: 'Back to top',
    scroll: 'Scroll to explore',
  },
  'ja-JP': {
    works: '実績を見る',
    contact: 'お問い合わせ',
    join: '採用情報',
    company: 'Monoidについて',
    top: 'ページの先頭へ',
    scroll: 'スクロールして見る',
  },
  'zh-CN': {
    works: '查看案例',
    contact: '联系我们',
    join: '加入我们',
    company: '关于 Monoid',
    top: '返回顶部',
    scroll: '向下滚动',
  },
});

const shouldDisplayEasterEgg =
  new Date().getMonth() === 2 - 1 && new Date().getDate() === 24; // 2.24

const shouldDisplayLGBT =
  [4, 5].includes(new Date().getMonth() + 1) &&
  new Date().getDate() >= 19 &&
  new Date().getDate() <= 31;

const initialX = 0;
const initialY = 0;

const RandomCircle: React.VFC<{ fill?: string; maxX: number; maxY: number }> = (
  props,
) => {
  const { fill = 'currentColor', maxX, maxY } = props;

  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);

  const node = useRef<SVGGElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (
      reduced ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    let frame = 0;
    let running = false;
    let curX = initialX;
    let curY = initialY;
    let theta = 2 * Math.PI * Math.random();
    let dx = sloganSpeed * Math.cos(theta);
    let dy = sloganSpeed * Math.sin(theta);
    const step = () => {
      if (!running) return;
      if (!document.hidden) {
        if (curX > maxX + 100 || curX < -100) dx *= -1;
        if (curY > maxY + 100 || curY < -100) dy *= -1;
        curX += dx;
        curY += dy;
        setX(curX);
        setY(curY);
      }
      frame = requestAnimationFrame(step);
    };
    const observer = new IntersectionObserver(([entry]) => {
      running = entry?.isIntersecting ?? false;
      cancelAnimationFrame(frame);
      if (running) frame = requestAnimationFrame(step);
    });
    if (node.current) observer.observe(node.current);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [maxX, maxY, reduced]);

  if (shouldDisplayLGBT) {
    return (
      <g ref={node}>
        <LgbtCircle r={180} cx={x} cy={y} />
      </g>
    );
  }
  return (
    <g ref={node}>
      <circle r={180} cx={x} cy={y} fill={fill} />
    </g>
  );
};

const AnimatedSlogan: React.FC<{ isBottom?: boolean }> = ({
  isBottom = false,
}) => {
  const maskId = useId();

  const openingStrings = useOpeningStrings();
  const homeStrings = useHomeStrings();

  const locale = useLocale();

  return (
    <div className="w-[1056px] max-w-[calc(100%-96px)] md:max-w-[calc(100%-56px)]">
      {isBottom && (
        <div className="h-0 relative text-[80px]">
          <DotsSvg
            aria-hidden="true"
            className="absolute bottom-[43px] left-[-30px] md:left-0 md:opacity-30"
          />

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
      <svg
        aria-hidden="true"
        className="w-full h-auto sm:hidden"
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
            <OpeningLink color="black" href="/contact">
              {homeStrings.contact}
            </OpeningLink>

            <OpeningLink color="black" href="/recruit">
              {homeStrings.join}
            </OpeningLink>
          </div>
        </div>
      )}
    </div>
  );
};

const MobileAnimatedSlogan: React.VFC = () => {
  const homeStrings = useHomeStrings();
  const maskId = useId();

  return (
    <Link
      className=">sm:hidden"
      href={
        shouldDisplayLGBT ? 'https://tokyorainbowpride.com/' : '/company/vision'
      }
      aria-label={
        shouldDisplayLGBT ? 'Monoid supports LGBT rights!' : homeStrings.company
      }
    >
      <svg
        aria-hidden="true"
        className="[shape-rendering:optimizeSpeed]"
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
    </Link>
  );
};

const VIDEO_START = 1 / 10.2;
const VIDEO_RANGE = 6 / 10.2;

const VIDEO_WHITE_START = 0.7255;

export default function () {
  const { navbarHeight, setTheme, screen: layoutScreen } = useTheme();
  const reduced = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const openingStrings = useOpeningStrings();
  const homeStrings = useHomeStrings();

  const rendered = useRendered();
  const screen = useScreen();

  const locale = useLocale();

  const active = rendered && screen === layoutScreen;
  const shouldDisplayVideo = active && screen === 'desktop' && !reduced;

  const { scrollTop, clientHeight, scrollPercent, scrollHeight } = useScroll(
    containerRef,
    shouldDisplayVideo,
  );

  const id = useId();

  const yVideo =
    clientHeight <= 0 || scrollHeight <= clientHeight || !shouldDisplayVideo
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

  useScrolledVideo(
    containerRef,
    videoRef,
    VIDEO_RANGE,
    clientHeight || 99999,
    shouldDisplayVideo,
  );

  const videoOffset =
    clientHeight <= 0 || scrollHeight <= clientHeight || !shouldDisplayVideo
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
    <section
      className={clsx(
        'flex flex-col items-center justify-between shrink-0 pt-[220px] md:pt-[160px] sm:!pt-[30px] pb-[40px]',
      )}
    >
      {layoutScreen === 'desktop' ? (
        <AnimatedSlogan />
      ) : (
        <MobileAnimatedSlogan />
      )}
      <h1 className="sr-only">{openingStrings.slogan}</h1>

      <div
        className={clsx(
          // Column-centred so the icon stays over its (localized, wider) label.
          'pt-[24vh] md:!pt-[12vh] sm:hidden flex flex-col items-center',
          scrollTop === 0 && 'animate-bounce-scroll',
        )}
      >
        <MouseSvg />
        <div className="text-[20px] text-center text-black font-dense mt-[6px]">
          {homeStrings.scroll}
        </div>
      </div>
    </section>
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
        preload="metadata"
        playsInline
        aria-hidden="true"
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
              visibility: sloganOpacity(yVideo) > 0 ? 'visible' : 'hidden',
            }}
          >
            {openingStrings.slogan}
          </div>

          <div
            className={clsx(
              'font-dense absolute bottom-[clamp(24px,5vh,48px)] left-0 right-0 flex justify-center',
            )}
            style={{
              opacity: introOpacity(yVideo),
              visibility: introOpacity(yVideo) > 0 ? 'visible' : 'hidden',
            }}
          >
            <div className="w-[860px] max-w-[calc(100%-96px)]">
              <h2
                className={clsx(
                  'text-[clamp(30px,4.4vh,40px)] leading-[1.35] font-bold [text-wrap:balance]',
                  locale === 'en-US' &&
                    '!text-[clamp(36px,5.55vh,50px)] !leading-tight',
                )}
              >
                {openingStrings.introTitle}
              </h2>

              <p
                className={clsx(
                  'mt-3 text-[clamp(20px,2.67vh,24px)] leading-normal',
                  locale === 'en-US' &&
                    '!text-[clamp(24px,3.33vh,30px)] !leading-tight',
                )}
              >
                {openingStrings.introDetails}
              </p>
            </div>
          </div>

          <div
            className={clsx(
              'font-dense absolute right-[140px] top-0 bottom-0 flex flex-col justify-center',
              'w-[690px] md:w-[70vw] md:right-[8vw]',
            )}
            style={{
              opacity: technologyOpacity(yVideo),
              visibility: technologyOpacity(yVideo) > 0 ? 'visible' : 'hidden',
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
              <OpeningLink color="white" href="/company/info">
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
              style={{
                WebkitTextFillColor: 'white',
                WebkitTextStrokeWidth: '1px',
                WebkitTextStrokeColor: 'black',
                opacity: servicesOpacity(yVideo),
                visibility: servicesOpacity(yVideo) > 0 ? 'visible' : 'hidden',
              }}
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
          aria-hidden="true"
          className="max-w-full h-auto"
          width={420}
          height={254}
          viewBox="0 0 420 254"
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
                <tspan key={i} x="320" dy="1.2em" textAnchor="end">
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
          aria-hidden="true"
          className="max-w-full h-auto"
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
          <span
            aria-hidden="true"
            className="font-dense text-[36px] font-bold mr-[10px]"
          >
            {index.toString().padStart(2, '0')}
          </span>

          <span className="font-dense text-[24px] md:text-[21px] font-bold">
            {title}
          </span>
        </li>
      );
    };

    return (
      <div
        id={`${id}-businessContent`}
        className="shrink-0 w-[1056px] max-w-[calc(100%-96px)] md:max-w-[calc(100%-56px)] self-center flex flex-col gap-y-[37px] justify-center relative z-40"
        style={{
          minHeight: reduced
            ? undefined
            : `calc(2.2 * (100vh - ${navbarHeight}px))`,
        }}
      >
        <div className="h-[1px] bg-black absolute left-[100px] right-[100px] rotate-[-20deg]" />

        <div className="flex min-h-[254px] gap-x-[70px] md:gap-x-6">
          <div className="relative w-[420px] md:w-[46%] shrink-0">
            <h3 className="sr-only">{openingStrings.DXAcceleration}</h3>
            <p className="sr-only">{openingStrings.DXAccelerationSummary}</p>
            {renderDX()}

            <OpeningLink
              color="black"
              href="/works/1"
              className="absolute left-0 bottom-0"
            >
              {homeStrings.works}
            </OpeningLink>
          </div>

          <ul className="flex-1">
            {openingStrings.DXAccelarationItems?.map((v, index) =>
              renderItem(index, v),
            )}
          </ul>
        </div>

        <div className="flex min-h-[408px]">
          <div className="flex-1 flex justify-end">
            <ul className="pt-[80px] md:pt-10">
              {openingStrings.newBusinessItems?.map((v, index) =>
                renderItem(index, v),
              )}
            </ul>
          </div>

          <div className="relative w-[551px] md:w-[52%] shrink-0">
            <h3 className="sr-only">{openingStrings.newBusiness}</h3>
            <p className="sr-only">{openingStrings.newBusinessSummary}</p>
            {renderNewBusiness()}

            <OpeningLink
              color="black"
              href="/works/0"
              className="absolute right-0 bottom-0"
            >
              {homeStrings.works}
            </OpeningLink>
          </div>
        </div>
      </div>
    );
  };

  const renderBottomScreen = () => {
    return (
      <section
        style={{
          height: `calc(100vh - ${navbarHeight}px)`,
        }}
        className={clsx(
          'flex flex-col items-center justify-between shrink-0 pt-[220px] pb-[40px]',
          'relative',
        )}
      >
        <AnimatedSlogan isBottom />
        <button
          type="button"
          aria-label={homeStrings.top}
          className="absolute bottom-3 right-7"
          onClick={() => {
            containerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
            containerRef.current?.focus();
          }}
        >
          <BackToTopSvg aria-hidden="true" />
        </button>
      </section>
    );
  };

  const renderSummary = () => (
    <section className="px-7 pb-16 pt-8 max-w-[1056px] mx-auto font-loose">
      <h2 className="text-[28px] >sm:text-[44px] leading-tight font-bold">
        {openingStrings.introTitle}
      </h2>
      <p className="mt-6 text-lg leading-relaxed">
        {openingStrings.introDetails}
      </p>
      <h2 className="font-dense text-[48px] mt-14 border-t border-current pt-8">
        {openingStrings.services}
      </h2>
      <div className="grid >sm:grid-cols-2 gap-10 mt-6">
        <section>
          <h3 className="font-dense text-[32px]">
            {openingStrings.DXAcceleration}
          </h3>
          <p className="mt-3 leading-relaxed">
            {openingStrings.DXAccelerationSummary?.map((text, index) => (
              <React.Fragment key={index}>{text} </React.Fragment>
            ))}
          </p>
          <ul className="mt-4 space-y-2">
            {openingStrings.DXAccelarationItems?.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="font-dense text-[32px]">
            {openingStrings.newBusiness}
          </h3>
          <p className="mt-3 leading-relaxed">
            {openingStrings.newBusinessSummary?.map((text, index) => (
              <React.Fragment key={index}>{text} </React.Fragment>
            ))}
          </p>
          <ul className="mt-4 space-y-2">
            {openingStrings.newBusinessItems?.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        </section>
      </div>
      <nav
        aria-label={homeStrings.company}
        className="mt-12 flex flex-wrap gap-x-8 gap-y-6 border-t border-current pt-8"
      >
        <OpeningLink color="black" href="/works/0">
          {homeStrings.works}
        </OpeningLink>
        <OpeningLink color="black" href="/contact">
          {homeStrings.contact}
        </OpeningLink>
        <OpeningLink color="black" href="/recruit">
          {homeStrings.join}
        </OpeningLink>
      </nav>
    </section>
  );

  return (
    <main
      className="flex flex-col min-h-0 flex-1 overflow-y-auto overflow-x-hidden relative z-0"
      ref={containerRef}
      tabIndex={0}
      aria-label={homeStrings.company}
    >
      {(!rendered || active) && (
        <>
          {renderTopScreen()}
          {(layoutScreen === 'mobile' || reduced) && renderSummary()}
          {shouldDisplayVideo && (
            <>
              {renderVideo()}
              {renderVideoTexts()}
              <div
                className="shrink-0"
                style={{ height: `calc(7 * (100vh - ${navbarHeight}px))` }}
              />
              <h2 className="sr-only">{openingStrings.services}</h2>
              {renderBusinessContent()}
              {renderBottomScreen()}
            </>
          )}
        </>
      )}
    </main>
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
