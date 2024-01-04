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

const LANGUAGES_WIDTH = 33;

const INITIAL_PADDING = 8;

const FINAL_PADDING = 13;

const INITIAL_RADIUS = LANGUAGES_WIDTH / 2 + INITIAL_PADDING;

const FINAL_RADIUS = LANGUAGES_WIDTH / 2 + FINAL_PADDING;

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
      from: INITIAL_RADIUS,
      to: FINAL_RADIUS,
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
      from: INITIAL_RADIUS * 2,
      to: 470,
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
              <Link
                href={router.asPath}
                locale="ja-JP"
                aria-label={ariaLabelStrings.jp}
                style={{ transform: `scale(${buttonScale})` }}
                onClick={reverse}
              >
                <JP />
              </Link>
            </div>
            <SlashThick
              style={{
                transform: `translateY(${slashOffsetY}px) translateX(${slashOffsetX}px)`,
              }}
            />
            <div className="w-[100px] flex items-center justify-center">
              <Link
                href={router.asPath}
                locale="en-US"
                aria-label={ariaLabelStrings.en}
                style={{ transform: `scale(${buttonScale})` }}
                onClick={reverse}
              >
                <EN />
              </Link>
            </div>
            <SlashThick
              style={{
                transform: `translateY(${-slashOffsetY!}px) translateX(${-slashOffsetX!}px)`,
              }}
            />
            <div className="w-[100px] flex items-center justify-center">
              <Link
                href={router.asPath}
                locale="zh-CN"
                aria-label={ariaLabelStrings.cn}
                style={{ transform: `scale(${buttonScale})` }}
                onClick={reverse}
              >
                <CN />
              </Link>
            </div>
          </>
        )}

        <div style={{ flex: 1 }} />
        <button
          aria-label={ariaLabelStrings.languages}
          className="block"
          style={{
            padding: borderRadius! - INITIAL_RADIUS + INITIAL_PADDING,
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
          <Languages width={33} />
        </button>
      </div>
    </div>
  );
};
