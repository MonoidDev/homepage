import React, { useRef } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import BackendEngineerCardSvg from '@/assets/images/BackendEngineerCard.svg';
import FrontendEngineerCardSvg from '@/assets/images/FrontendEngineerCard.svg';
import MarketingDirectorCardSvg from '@/assets/images/MarketingDirectorCard.svg';
import UIUXDesignerCardSvg from '@/assets/images/UIUXDesignerCard.svg';
import { BackendEngineerCard } from '@/components/recruit/BackendEngineerCard';
import { FrontendEngineerCard } from '@/components/recruit/FrontendEngineerCard';
import { MarketingDirectorCard } from '@/components/recruit/MarketingDirectorCard';
import { UIUXDesignerCard } from '@/components/recruit/UIUXDesignerCard';

const useStrings = makeStrings({
  'en-US': {
    viewMore: 'View More',
  },
});

interface MobileCardContainerProps {
  name: string;
  children: React.ReactNode;
}

const MobileCardContainer: React.FC<MobileCardContainerProps> = (props) => {
  const { name, children } = props;

  const router = useRouter();

  return (
    <div
      className={clsx(
        'overflow-hidden border-white border-2 rounded-[26px] w-[320px]',
        'transition-transform duration-300 shrink-0',
        'hover:translate-y-[-10px]',
      )}
      onClick={() => router.push(`/recruit/${name}`)}
    >
      {children}
    </div>
  );
};

function MobileRecruit() {
  const strings = useStrings();

  const lastElement = useRef<HTMLDivElement>(null);

  return (
    <main
      className="flex-1 >sm:hidden flex flex-col items-center pt-[32px] gap-y-6 overflow-auto"
      role="main"
    >
      <MobileCardContainer name="FRONTENDENGINEER">
        <FrontendEngineerCardSvg />
      </MobileCardContainer>

      <MobileCardContainer name="BACKENDENGINEER">
        <BackendEngineerCardSvg />
      </MobileCardContainer>

      <MobileCardContainer name="UIUXDESIGNER">
        <UIUXDesignerCardSvg />
      </MobileCardContainer>
      {/* 
      <MobileCardContainer name="PRODUCT MANAGER">
        <ProductManagerCardSvg />
      </MobileCardContainer> */}

      <MobileCardContainer name="MARKETINGDIRECTOR">
        <MarketingDirectorCardSvg />
      </MobileCardContainer>

      <div className="h-[200px] shrink-0" ref={lastElement} />

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
    <main
      className="flex-1 sm:hidden px-[120px] py-[64px] overflow-y-auto gap-x-10 flex"
      role="main"
    >
      <FrontendEngineerCard />
      <BackendEngineerCard />
      <UIUXDesignerCard />
      {/* <ProductManagerCard /> */}
      <MarketingDirectorCard />
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
