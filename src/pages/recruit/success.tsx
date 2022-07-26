import React from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
import { useRouter } from 'next/router';
import useCountDown from 'react-countdown-hook';

import { GoBackTriangleTitle } from '@/components/recruit/GoBackTriangleTitle';
import { RecruitSuccess } from '@/components/recruit/RecruitSuccess';
import { useScreen } from '@/utils/useScreen';

const useStrings = makeStrings({
  'ja-JP': {
    autoReturn: (seconds: number) => `${seconds}秒後自動にTOPへ戻ります`,
  },
  'en-US': {
    autoReturn: (seconds: number) => `Returning in ${seconds} seconds`,
  },
  'zh-CN': {
    autoReturn: (seconds: number) => `${seconds}秒后自动返回主页`,
  },
});

export default function Success() {
  const router = useRouter();

  const screen = useScreen();

  const strings = useStrings();

  const [timeLeft, { start }] = useCountDown(15 * 1000);

  const renderDesktop = () => (
    <main
      className="flex-1 sm:hidden px-[120px] py-[64px] flex items-center justify-around"
      role="main"
    >
      <h2 className="font-loose font-bold text-[110px] shrink">THANK YOU</h2>
      <div className="bg-white self-stretch w-[550px]">
        <RecruitSuccess
          shouldLoad={screen === 'desktop'}
          onDone={() => setTimeout(() => router.push('/recruit'), 2000)}
        />
      </div>
    </main>
  );

  const renderMobile = () => (
    <main className="flex-1 >sm:hidden flex flex-col pt-[4rem]" role="main">
      <div className="fixed top-0 left-0 flex flex-col pl-[1rem]">
        <GoBackTriangleTitle noIcon>THANK YOU</GoBackTriangleTitle>
      </div>

      <div className="h-[500px] mb-[-3rem]">
        <RecruitSuccess
          zoom={7.5}
          shouldLoad={screen === 'mobile'}
          onDone={() => {
            setTimeout(() => router.push('/recruit'), 15000);
            start();
          }}
        />
      </div>
      {timeLeft > 0 && (
        <button
          className="mx-[30px] h-[64px] bg-black rounded-[20px] text-white text-[22px] z-10 relative"
          onClick={() => router.push('/recruit')}
        >
          {strings.autoReturn(Math.ceil(timeLeft / 1000))}
        </button>
      )}
    </main>
  );

  return (
    <>
      {renderDesktop()}
      {renderMobile()}
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'white',
      hideLogo: 'mobile',
      title: 'Jobs | 合同会社Monoid | G.K. Monoid | Monoid',
    },
  };
}
