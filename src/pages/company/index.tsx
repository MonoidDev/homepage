import React, { Fragment, useState } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';

import { AnimatedSwitch } from '@/components/company/AnimatedSwitch';
import { MobileAnimatedSwitch } from '@/components/company/MobileAnimatedSwitch';

const useStrings = makeStrings({
  'en-US': {
    title: (
      <>
        With effective and rigid new techniques,
        <br />
        we sweep away old issues and pave the way to the future.
      </>
    ),
    content: (
      <>
        We cherish and respect traditional values; we know the struggles and
        obstacles people might face while evolving and preparing for the new
        era. We are trustable partners to help traditional companies make right
        technical decisions.
      </>
    ),
    companyInfo: 'COMPANY INFO',
    info: [
      ['会社名', '合同会社MONOID'],
      ['設立', '2019年12月24日'],
      ['資本金', '1,000万円\n［2022年6月末時点］'],
      ['事業内容', '企画・開発・運用'],
      ['代表者', 'YANRU MAO'],
      ['所在地', '東京都大手町1-7-2\n東京サンケイビル 27F'],
    ],
  },
} as const);

const Vision: React.VFC = () => {
  const strings = useStrings();

  return (
    <main className="flex-1 font-dense px-[75px] sm:px-[32px] pt-[15vh] sm:pt-[60px]">
      <h1 className="text-[70px] sm:text-[45px] leading-[1] mb-[2.5vw] sm:mb-[25px]">
        {strings.title}
      </h1>
      <p className="text-[40px] sm:text-[35px] sm:leading-[1.1] leading-[55px] opacity-75 max-w-[60vw] sm:max-w-[290px] sm:mb-[50px]">
        {strings.content}
      </p>
    </main>
  );
};

const Info: React.VFC = () => {
  const strings = useStrings();

  return (
    <main
      className={clsx(
        'sm:hidden',
        'relative grid grid-cols-[300px_1fr] text-[32px] font-loose font-bold',
        'px-[75px] sm:px-[32px] pt-[15vh] gap-x-[4rem] gap-y-[1rem]',
      )}
      style={{ gridAutoRows: 'min-content' }}
    >
      {strings.info?.map(([k, v]) => (
        <Fragment key={k}>
          <div className="text-center">{k}</div>
          <div className="opacity-75">{v}</div>
        </Fragment>
      ))}
      <div className="absolute w-[2px] top-[15vh] bottom-0 left-[360px] bg-white" />
    </main>
  );
};

const MobileInfo: React.VFC = () => {
  const strings = useStrings();

  return (
    <main
      className={clsx(
        '>sm:hidden',
        'pt-[60px] px-[32px] leading-[65px] font-loose font-bold',
      )}
    >
      <h2 className="mb-[3rem] text-[55px]">{strings.companyInfo}</h2>

      <div className="grid grid-cols-[0.8fr_2fr] text-[20px] leading-tight gap-x-[1rem] gap-y-[2rem] mr-4">
        {strings.info?.map(([k, v]) => (
          <Fragment key={k}>
            <div className="text-center">{k}</div>
            <div className="opacity-75 whitespace-pre-wrap">{v}</div>
          </Fragment>
        ))}
      </div>
    </main>
  );
};

export default function () {
  const [current, setCurrent] = useState('vision');

  return (
    <div className="flex-1 flex flex-col text-white relative overflow-scroll min-h-0">
      <div className="sm:hidden fixed right-0 bottom-0 w-[526px] h-[275px]">
        <AnimatedSwitch current={current} onChangeCurrent={setCurrent} />
      </div>
      <div className=">sm:hidden fixed right-0 bottom-0 w-[38px] h-[280px]">
        <MobileAnimatedSwitch current={current} onChangeCurrent={setCurrent} />
      </div>
      {current === 'vision' && <Vision />}
      {current === 'info' && (
        <>
          <Info />
          <MobileInfo />
        </>
      )}
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'black',
      title: 'Monoid',
    },
  };
}
