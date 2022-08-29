import React from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
import Lottie from 'lottie-react';
import { useRouter } from 'next/router';
import useCountDown from 'react-countdown-hook';

import recruitMailbox from '@/assets/lottie/recruit-mailbox.json';

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

  const strings = useStrings();

  const [timeLeft, { start }] = useCountDown(15 * 1000);

  const renderDesktop = () => (
    <main
      className="flex-1 sm:hidden px-[120px] py-[64px] flex items-center justify-around relative z-0"
      role="main"
    >
      <h2 className="font-loose font-bold text-[110px] shrink relative z-10">
        THANK YOU
      </h2>
      <div className="bg-white self-center w-[550px] scale-150 origin-top-right relative top-[-10vh] z-0">
        <Lottie
          autoPlay
          loop={false}
          animationData={recruitMailbox}
          onComplete={() => {
            // setTimeout(() => router.push('/recruit'), 15000);
          }}
        />
      </div>
    </main>
  );

  const renderMobile = () => (
    <main className="flex-1 >sm:hidden flex flex-col pt-[4rem]" role="main">
      <h2 className="text-[45px] font-loose font-bold leading-none text-center mb-[3rem]">
        THANK YOU
      </h2>

      <div className="h-[500px] mb-[-6rem] scale-150 origin-top-right">
        <Lottie
          autoPlay
          loop={false}
          animationData={recruitMailbox}
          onComplete={() => {
            // setTimeout(() => router.push('/recruit'), 15000);
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
