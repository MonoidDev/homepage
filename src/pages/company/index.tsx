import React, { Fragment, useState } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';

import { AnimatedSwitch } from '@/components/company/AnimatedSwitch';

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
    info: [
      ['会社名', '合同会社MONOID'],
      ['設立', '2019年12月24日'],
      ['資本金', '1,000万円［2022年6月末時点］'],
      ['事業内容', '企画・開発・運用'],
      ['代表者', 'YANRU MAO'],
      ['所在地', '東京都大手町1-7-2 東京サンケイビル 27F'],
    ],
  },
  'ja-JP': {
    info: [
      ['会社名', '合同会社MONOID'],
      ['設立', '2019年12月24日'],
      ['資本金', '1,000万円［2022年6月末時点］'],
      ['事業内容', '企画・開発・運用'],
      ['代表者', 'YANRU MAO'],
      ['所在地', '東京都大手町1-7-2 東京サンケイビル 27F'],
    ],
  },
} as const);

const Vision: React.VFC = () => {
  const strings = useStrings();

  return (
    <main className="flex-1 font-dense px-[75px] pt-[15vh]">
      <h1 className="text-[70px] leading-[1] mb-[2.5vw]">{strings.title}</h1>
      <p className="text-[40px] leading-[55px] opacity-75 max-w-[60vw]">
        {strings.content}
      </p>
    </main>
  );
};

const Info: React.VFC = () => {
  const strings = useStrings();

  return (
    <main
      className="relative grid grid-cols-[300px_1fr] text-[32px] font-loose font-bold px-[75px] pt-[15vh] gap-x-[4rem] gap-y-[1rem]"
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

export default function () {
  const [current, setCurrent] = useState('vision');

  return (
    <div className="flex-1 flex flex-col text-white relative">
      <div className="fixed right-0 bottom-0 w-[526px] h-[275px]">
        <AnimatedSwitch current={current} onChangeCurrent={setCurrent} />
      </div>
      {current === 'vision' && <Vision />}
      {current === 'info' && <Info />}
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
