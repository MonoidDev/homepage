import { useEffect } from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import CN from '@/assets/images/CN.svg';
import EN from '@/assets/images/EN.svg';
import JP from '@/assets/images/JP.svg';
import Languages from '@/assets/images/Languages.svg';
import SlashThick from '@/assets/images/SlashThick.svg';
import { useAriaLabelStrings } from '@/data/ariaLabel';
import { useChain } from '@/utils/animation';
export interface LanguageMenuProps {
  action: 'open' | 'close';
  onChangeAction?: (action: 'open' | 'close') => void;
}

export const LanguageMenu: React.VFC<LanguageMenuProps> = (props) => {
  const { action, onChangeAction } = props;

  const router = useRouter();
  const ariaLabelStrings = useAriaLabelStrings();

  useEffect(() => {
    if (action === 'open') {
      play();
      playBorderRadius();
    }
  }, [action]);

  const {
    values: [borderRadius],
    play: playBorderRadius,
    reverse: reverseBorderRadius,
  } = useChain([
    {
      from: 32,
      to: 40,
      interpolate: (frame) => Math.sin(((frame / 15) * Math.PI) / 2),
    },
  ]);

  const {
    values: [width, slashOffsetY, buttonScale],
    play,
    reverse,
    currentIndex,
    isPlaying,
  } = useChain([
    {
      from: 64,
      to: 572,
      interpolate: (frame) => Math.sin(((frame / 30) * Math.PI) / 2),
    },
    {
      from: 80,
      to: 0,
      onStart: ({ reversed }) => {
        if (reversed) {
          reverseBorderRadius();
          onChangeAction?.('close');
        }
      },
      interpolate: (frame) => Math.sin(((frame / 15) * Math.PI) / 2),
    },
    {
      from: 0,
      to: 1,
      interpolate: (frame) => Math.sin(((frame / 10) * Math.PI) / 2),
    },
  ]);

  const slashOffsetX = (-45 / 80) * slashOffsetY!;

  return (
    <div className="flex">
      <div
        className={clsx(
          'white:text-black black:text-white flex overflow-hidden',
          action === 'close' &&
            'hover:white:bg-black hover:black:bg-white hover:white:text-white hover:black:text-black',
          (action === 'open' || isPlaying || currentIndex >= 2) &&
            'white:bg-black black:bg-white white:!text-white black:!text-black',
        )}
        style={{
          borderRadius,
          height: 2 * borderRadius!,
          width,
        }}
        aria-expanded={action === 'open'}
      >
        {currentIndex >= 1 && (
          <>
            <div className="w-[40px]" />
            <div className="w-[100px] flex items-center justify-center">
              <Link href={router.asPath} locale="ja-JP">
                <a
                  aria-label={ariaLabelStrings.jp}
                  style={{ transform: `scale(${buttonScale})` }}
                  onClick={reverse}
                >
                  <JP />
                </a>
              </Link>
            </div>
            <SlashThick
              style={{
                transform: `translateY(${slashOffsetY}px) translateX(${slashOffsetX}px)`,
              }}
            />
            <div className="w-[100px] flex items-center justify-center">
              <Link href={router.asPath} locale="en-US">
                <a
                  aria-label={ariaLabelStrings.en}
                  style={{ transform: `scale(${buttonScale})` }}
                  onClick={reverse}
                >
                  <EN />
                </a>
              </Link>
            </div>
            <SlashThick
              style={{
                transform: `translateY(${-slashOffsetY!}px) translateX(${-slashOffsetX!}px)`,
              }}
            />
            <div className="w-[100px] flex items-center justify-center">
              <Link href={router.asPath} locale="zh-CN">
                <a
                  aria-label={ariaLabelStrings.cn}
                  style={{ transform: `scale(${buttonScale})` }}
                  onClick={reverse}
                >
                  <CN />
                </a>
              </Link>
            </div>
          </>
        )}

        <div style={{ flex: 1 }} />
        <button
          aria-label={ariaLabelStrings.languages}
          className="block"
          style={{
            padding: borderRadius! - 32 + 8, // 8 -> 16
          }}
          disabled={isPlaying}
          onClick={() => {
            if (action === 'open') {
              reverse();
            } else {
              onChangeAction?.('open');
            }
          }}
        >
          <Languages width={48} />
        </button>
      </div>
    </div>
  );
};
