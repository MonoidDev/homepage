import React, { useRef } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';

import BackendEngineerCardSvg from '@/assets/images/BackendEngineerCard.svg';
import FrontendEngineerCardSvg from '@/assets/images/FrontendEngineerCard.svg';
import ProductManagerCardSvg from '@/assets/images/ProductManagerCard.svg';
import UIUXEngineerCardSvg from '@/assets/images/UIUXEngineerCard.svg';
import { BackendEngineerCard } from '@/components/recruit/BackendEngineerCard';
import { FrontendEngineerCard } from '@/components/recruit/FrontendEngineerCard';
import { ProductManagerCard } from '@/components/recruit/ProductManagerCard';
import { UIUXEngineerCard } from '@/components/recruit/UIUXEngineerCard';

const useStrings = makeStrings({
  'en-US': {
    viewMore: 'View More',
  },
});

const MobileCardContainer: React.FC = (props) => {
  const { children } = props;

  return (
    <div
      className={clsx(
        'overflow-hidden border-white border-2 rounded-[26px] w-[320px]',
        'transition-transform duration-300 shrink-0',
        'hover:translate-y-[-10px]',
      )}
    >
      {children}
    </div>
  );
};

function MobileRecruit() {
  const strings = useStrings();

  const lastElement = useRef<HTMLDivElement>(null);

  return (
    <main className="flex-1 >sm:hidden flex flex-col items-center pt-[32px] gap-y-6 overflow-auto">
      <MobileCardContainer>
        <FrontendEngineerCardSvg />
      </MobileCardContainer>

      <MobileCardContainer>
        <BackendEngineerCardSvg />
      </MobileCardContainer>

      <MobileCardContainer>
        <UIUXEngineerCardSvg />
      </MobileCardContainer>

      <MobileCardContainer>
        <ProductManagerCardSvg />
      </MobileCardContainer>

      <div className="h-[120px] shrink-0" ref={lastElement} />

      <div className="fixed bottom-0 left-0 right-0 h-[315px] pointer-events-none [background:linear-gradient(180deg,rgba(0,0,0,0)_0%,#000000_100%)]" />

      <button
        className={clsx(
          'fixed bottom-[50px] h-[56px] rounded-[15px] w-[322px]',
          'bg-white text-black text-[30px] font-loose font-bold pt-[5px]',
        )}
        onClick={() =>
          lastElement.current?.scrollIntoView({
            behavior: 'smooth',
          })
        }
      >
        {strings.viewMore}
      </button>
    </main>
  );
}

function DesktopRecruit() {
  return (
    <main className="flex-1 sm:hidden px-[120px] py-[64px] overflow-y-auto gap-x-10 flex">
      <FrontendEngineerCard />
      <BackendEngineerCard />
      <UIUXEngineerCard />
      <ProductManagerCard />
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
