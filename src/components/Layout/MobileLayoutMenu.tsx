import { useEffect, useRef } from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { MenuTick } from './MenuTick';
import LanguagesSvg from '@/assets/images/Languages.svg';
import { useSiteStrings } from '@/data/site';
import { useChain } from '@/utils/animation';

export interface MobileLayoutMenuProps {
  onClose: () => void;
}

export const MobileLayoutMenu: React.VFC<MobileLayoutMenuProps> = (props) => {
  const { onClose } = props;

  const siteStrings = useSiteStrings();

  const backgroundRef = useRef<HTMLDivElement>(null);

  const { locale } = useRouter();

  const opacityChain = useChain([
    {
      from: 0,
      to: 1,
      interpolate: (f) => Math.sin(((f / 15) * Math.PI) / 2),
    },
  ]);

  const renderLink = (
    link: string,
    label: string,
    tickOpacity: number,
    hasTick: boolean = true,
  ) => {
    return (
      <>
        <Link href={link}>
          <a
            className={clsx(
              'mt-4 font-dense text-[48px] leading-none',
              (locale === 'ja-JP' || locale === 'zh-CN') && 'text-[36px]',
            )}
            onClick={async () => {
              await opacityChain.reverse();
              onClose();
            }}
          >
            {label}
          </a>
        </Link>
        {hasTick && (
          <MenuTick
            className="text-black mr-1"
            style={{ opacity: tickOpacity }}
            strokeWidth={6}
          />
        )}
      </>
    );
  };

  useEffect(() => {
    opacityChain.play();
  }, []);

  return (
    <div
      ref={backgroundRef}
      className=">sm:hidden fixed z-50 left-0 top-0 right-0 bottom-0 bg-white px-[28px] py-[40px] flex flex-col items-end"
      style={
        {
          '--tw-bg-opacity': opacityChain.currentValue * 0.9,
          opacity: opacityChain.currentValue,
        } as any
      }
      onClick={async (e) => {
        if (e.target === backgroundRef.current) {
          await opacityChain.reverse();
          onClose();
        }
      }}
    >
      <LanguagesSvg height={58} className="mb-[36px]" />
      {renderLink('/', siteStrings.top, 0.4)}
      {renderLink('/company', siteStrings.company, 0.3)}
      {renderLink('/', siteStrings.works, 0.2)}
      {renderLink('/recruit', siteStrings.recruit, 0.15)}
      {renderLink('/contact', siteStrings.contact, 0, false)}
    </div>
  );
};
