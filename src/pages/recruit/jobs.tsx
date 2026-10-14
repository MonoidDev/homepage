import React, { useEffect, useRef, useState } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';
import Link from 'next/link';

import BackendEngineerCardSvg from '@/assets/images/BackendEngineerCard.svg';
import FrontendEngineerCardSvg from '@/assets/images/FrontendEngineerCard.svg';
import MarketingDirectorCardSvg from '@/assets/images/MarketingDirectorCard.svg';
import ProductManagerCardSvg from '@/assets/images/ProductManagerCard.svg';
import UIUXDesignerCardSvg from '@/assets/images/UIUXDesignerCard.svg';
import { BackendEngineerCard } from '@/components/recruit/BackendEngineerCard';
import { FrontendEngineerCard } from '@/components/recruit/FrontendEngineerCard';
import styles from '@/components/recruit/Jobs.module.css';
import { MarketingDirectorCard } from '@/components/recruit/MarketingDirectorCard';
import { ProductManagerCard } from '@/components/recruit/ProductManagerCard';
import { UIUXDesignerCard } from '@/components/recruit/UIUXDesignerCard';

const useStrings = makeStrings({
  'en-US': {
    heading: 'Open positions',
    viewMore: 'View More',
  },
  'ja-JP': {
    heading: '募集職種',
    viewMore: 'もっと見る',
  },
  'zh-CN': {
    heading: '招聘职位',
    viewMore: '查看更多',
  },
});

const MOBILE_CARDS = [
  {
    slug: 'FRONTENDENGINEER',
    title: 'Frontend Engineer',
    Svg: FrontendEngineerCardSvg,
  },
  {
    slug: 'BACKENDENGINEER',
    title: 'Backend Engineer',
    Svg: BackendEngineerCardSvg,
  },
  { slug: 'UIUXDESIGNER', title: 'UI/UX Designer', Svg: UIUXDesignerCardSvg },
  {
    slug: 'PRODUCTMANAGER',
    title: 'Product Manager',
    Svg: ProductManagerCardSvg,
  },
  {
    slug: 'MARKETINGDIRECTOR',
    title: 'Marketing Director',
    Svg: MarketingDirectorCardSvg,
  },
];

function MobileRecruit() {
  const strings = useStrings();
  const scrollerRef = useRef<HTMLElement>(null);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const update = () =>
      setAtEnd(
        scroller.scrollTop + scroller.clientHeight >=
          scroller.scrollHeight - 24,
      );

    update();
    scroller.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      scroller.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <main
      ref={scrollerRef}
      className="flex-1 >sm:hidden flex flex-col items-center pt-[32px] overflow-auto"
      role="main"
    >
      <h1 className="sr-only">{strings.heading}</h1>

      <ul className="flex flex-col items-center gap-y-6">
        {MOBILE_CARDS.map(({ slug, title, Svg }) => (
          <li key={slug}>
            <Link
              href={`/recruit/${slug}`}
              aria-label={title}
              className={clsx(
                'block overflow-hidden border-white border-2 rounded-[26px] w-[320px]',
                'transition-transform duration-300',
                'hover:translate-y-[-10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white',
              )}
            >
              <Svg aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>

      {/* Room for the last card to scroll clear of the floating button. */}
      <div className="h-[200px] shrink-0" />

      <div
        className={clsx(
          'fixed bottom-0 left-0 right-0 h-[315px] pointer-events-none [background:linear-gradient(180deg,rgba(0,0,0,0)_0%,#000000_100%)]',
          'transition-opacity duration-300',
          atEnd && 'opacity-0',
        )}
      />

      <button
        type="button"
        tabIndex={atEnd ? -1 : 0}
        aria-hidden={atEnd}
        className={clsx(
          'fixed bottom-[50px] h-[56px] rounded-[15px] w-[322px]',
          'bg-white text-black text-[30px] font-loose font-bold pt-[5px]',
          'transition-opacity duration-300',
          atEnd && 'opacity-0 pointer-events-none',
        )}
        onClick={() => {
          const scroller = scrollerRef.current;
          scroller?.scrollBy({
            top: scroller.clientHeight * 0.75,
            behavior: 'smooth',
          });
        }}
      >
        {strings.viewMore}
      </button>
    </main>
  );
}

function DesktopRecruit() {
  const strings = useStrings();

  return (
    <main
      className="flex-1 sm:hidden flex flex-col px-[64px] py-[64px] overflow-y-auto"
      role="main"
    >
      <h1 className="sr-only">{strings.heading}</h1>

      <ul className={clsx(styles.row, 'flex gap-10 w-max m-auto')}>
        <li>
          <FrontendEngineerCard />
        </li>
        <li>
          <BackendEngineerCard />
        </li>
        <li>
          <UIUXDesignerCard />
        </li>
        <li>
          <ProductManagerCard />
        </li>
        <li>
          <MarketingDirectorCard />
        </li>
      </ul>
    </main>
  );
}

export default function Recruit() {
  return (
    <>
      <DesktopRecruit />
      <MobileRecruit />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'black',
      title: 'Jobs | 合同会社Monoid | G.K. Monoid | Monoid',
    },
  };
}
