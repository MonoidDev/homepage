import React, { useEffect, useRef, useState } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';
import Link from 'next/link';

import { useScreen } from '@/utils/useScreen';

const benefitsEn = [
  'flexible hours',
  'vacation incentives',
  'flat management',
  'paid time off (full-time employees only)',
  'results oriented',
];

const useStrings = makeStrings({
  'en-US': {
    title: 'A productive playground',
    slogan: '“Monoid is an oasis for talented engineers and creators. ”',
    benefits: benefitsEn,
    apply: 'APPLY',
    pauseVideo: 'Pause background video',
  },
  'ja-JP': {
    title: 'A productive playground',
    slogan:
      '「Monoid は、才能あるエンジニアとクリエイターのためのオアシスです。」',
    benefits: [
      'フレックスタイム',
      '休暇インセンティブ',
      'フラットな組織',
      '有給休暇（正社員のみ）',
      '成果主義',
    ],
    apply: 'APPLY',
    pauseVideo: '背景動画を一時停止',
  },
  'zh-CN': {
    title: 'A productive playground',
    slogan: '“Monoid 是才华横溢的工程师与创作者的绿洲。”',
    benefits: [
      '弹性工作时间',
      '休假激励',
      '扁平化管理',
      '带薪休假（仅限全职员工）',
      '结果导向',
    ],
    apply: 'APPLY',
    pauseVideo: '暂停背景视频',
  },
});

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);

    update();
    query.addEventListener('change', update);

    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
};

const backgroundClassName = 'object-cover w-[100vw] h-[100vh] fixed z-[1]';

export default function Recruit() {
  const strings = useStrings();
  const screen = useScreen();
  const reducedMotion = usePrefersReducedMotion();

  const [shouldShowVideo, setShouldShowVideo] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePaused = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => undefined);
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  useEffect(() => {
    setShouldShowVideo(true);
  }, []);

  const poster =
    screen === 'mobile'
      ? '/videos/recruit-mobile-poster.jpg'
      : '/videos/recruit-poster.jpg';

  return (
    <>
      {shouldShowVideo &&
        (reducedMotion ? (
          <img className={backgroundClassName} src={poster} alt="" />
        ) : (
          <video
            ref={videoRef}
            key={screen}
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
            aria-hidden="true"
            className={backgroundClassName}
          >
            <source
              src={
                screen === 'mobile'
                  ? '/videos/recruit-mobile-loop.mp4'
                  : '/videos/recruit.mp4'
              }
              type="video/mp4"
            />
          </video>
        ))}

      <div className="w-[100vw] h-[100vh] fixed z-[1] bg-black bg-opacity-70" />

      {shouldShowVideo && !reducedMotion && (
        <button
          type="button"
          aria-label={strings.pauseVideo}
          aria-pressed={paused}
          onClick={togglePaused}
          className={clsx(
            'fixed z-[20] right-[48px] top-[140px] sm:right-[28px] sm:top-[112px]',
            'w-[40px] h-[40px] rounded-full border-2 border-white text-white',
            'flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity',
          )}
        >
          {/* Pause bars while playing, a play triangle once paused. */}
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14">
            {paused ? (
              <path d="M2 0L14 7L2 14Z" fill="currentColor" />
            ) : (
              <>
                <rect x="1" y="0" width="4" height="14" fill="currentColor" />
                <rect x="9" y="0" width="4" height="14" fill="currentColor" />
              </>
            )}
          </svg>
        </button>
      )}

      <main
        className={clsx(
          'font-dense flex-1 flex flex-col overflow-auto px-[100px] sm:px-[32px] pb-[50px] text-white z-[10]',
        )}
        role="main"
      >
        <div className="flex-1" />
        <h1 className="text-[140px] >sm:md:text-[96px] >sm:md:leading-[1.05] sm:text-[80px] sm:leading-[1] sm:mt-[2rem]">
          {strings.title}
        </h1>
        <p className="text-[50px] >sm:md:text-[34px] sm:text-[30px] sm:leading-[1] sm:my-[2rem] opacity-[.45]">
          {strings.slogan}
        </p>
        <div className="h-[2vh] sm:h-[2vh]" />
        <div className="flex justify-between items-end sm:flex-col sm:justify-start sm:items-center flex-wrap gap-y-4 sm:gap-y-8">
          <ul
            className={clsx(
              'text-[30px] >sm:md:text-[24px] leading-tight sm:text-[25px] sm:opacity-80 sm:leading-tight',
              'grid grid-cols-[5fr_6fr] sm:flex sm:flex-col gap-x-4',
              'w-[60vw] sm:w-full',
            )}
          >
            {strings.benefits.map((s) => (
              <li key={s} className="list-disc list-inside">
                {s}
              </li>
            ))}
          </ul>

          <Link
            href="/recruit/jobs"
            className={clsx(
              'text-center w-[340px] >sm:md:w-[260px] sm:w-[240px] h-[130px] >sm:md:h-[100px] sm:h-[60px] >sm:font-loose font-bold text-[80px] >sm:md:text-[60px] sm:text-[35px] border-[5px] leading-[1.7]',
              'border-white rounded-[65px] hover:text-gray-400 hover:border-gray-400',
              'transition-colors duration-200',
            )}
          >
            {strings.apply}
          </Link>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'black',
      title: 'Recruit | 合同会社Monoid | G.K. Monoid | Monoid',
      headerTransparent: true,
    },
  };
}
