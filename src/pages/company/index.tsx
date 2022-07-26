import React, { Fragment, useState } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';

import { AnimatedSwitch } from '@/components/company/AnimatedSwitch';
import { MobileAnimatedSwitch } from '@/components/company/MobileAnimatedSwitch';
import { useLocale } from '@/utils/useLocale';

const useStrings = makeStrings({
  'en-US': {
    title: (
      <>
        With effective and rigid new techniques, we clear the path of old
        obstructions and pave the way to the future.
      </>
    ),
    content: (
      <>
        We embrace and respect traditional values; we understand the struggles
        and challenges people face whilst re-inventing themselves for a new era.
        We aim to be trustworthy partners who can help both modern and
        traditional companies make the right technical decisions.
      </>
    ),
    companyInfo: 'COMPANY INFO',
    info: [
      ['Name', 'G.K. Monoid'],
      ['Established', '2020/12/24'],
      ['Capital', '10,000,000 JPY'],
      ['Business', 'Design & Development'],
      ['Representative', 'Yanru Mao'],
      ['Location', 'Tokyo Sankei Building 27F, 1-7-2 Otemachi, Tokyo'],
    ],
  },
  'zh-CN': {
    title: <>数字化转型的引路人</>,
    content: (
      <>
        我们致力于通过高度专业化的设计师团队以及工程师团队创造性地解决多样的技术难题。
        <br />
        我们并非简单地将新技术强加于任何项目中，而是在旧与新的价值观及方法论产生摩擦时，根据客户的实际情况帮助客户作出正确的技术决策。我们使用高效，严谨的新技术和新框架，解决旧患旧疾，为新时代的来临铺平道路。
      </>
    ),
    info: [
      ['公司名称', '合同会社Monoid'],
      ['成立日期', '2020年12月24日'],
      ['注册资金', '1,000万日元［截止至2022年6月末］'],
      ['业务内容', '设计・开发・维护'],
      ['公司法人', 'Mao Yanru'],
      [
        '所在地',
        'Tokyo Sankei Building 27F, 1-7-2 Otemachi, Chiyoda-Ku, Tokyo',
      ],
    ],
  },
  'ja-JP': {
    title: <>新しい時代の技術を、全ての人に。</>,
    content: (
      <>
        私たちは、最先端かつ信頼性の高い新技術によって、日々の課題を解決し、新しい未来への道を切り拓いていく会社です。
        <br />
        高い専門性を持ったエンジニアチームによって、クリエイティブに日々の課題を解決し、より良い世界を創っていくことに私たちはコミットしています。
        <br />
        それと同時に、単純に新しい技術を押し付けるのではなく、旧来の価値観や手法が新しいものに移行していく際に生じる摩擦や軋轢などのリスクも含めてお客様の技術的な意思決定をサポートする、信頼できるテクノロジーパートナーです。
      </>
    ),
    info: [
      ['会社名', '合同会社Monoid'],
      ['設立', '2020年12月24日'],
      ['資本金', '1,000万円［2022年6月末時点］'],
      ['事業内容', '企画・開発・運用'],
      ['代表者', 'Mao Yanru'],
      ['所在地', '東京都千代田区大手町1-7-2 東京サンケイビル 27F'],
    ],
  },
} as const);

const Vision: React.VFC = () => {
  const strings = useStrings();

  const locale = useLocale();

  return (
    <main className="flex-1 font-dense px-[75px] sm:px-[32px] pt-[15vh] sm:pt-[60px]">
      <h1 className="text-[70px] sm:text-[45px] leading-[1] mb-[2.5vw] sm:mb-[25px] font-bold">
        {strings.title}
      </h1>
      <p
        className={clsx(
          'text-[40px] sm:text-[35px] sm:leading-[1.1] leading-[55px]',
          'opacity-75 max-w-[78vw] sm:max-w-[290px] sm:mb-[50px]',
          locale === 'ja-JP' && '!text-[30px] !font-bold',
        )}
      >
        {strings.content}
      </p>
    </main>
  );
};

const Info: React.VFC = () => {
  const strings = useStrings();

  const locale = useLocale();

  return (
    <main
      className={clsx(
        'sm:hidden',
        'relative grid grid-cols-[300px_1fr] text-[32px] font-loose font-bold',
        'px-[75px] sm:px-[32px] pt-[15vh] gap-x-[4rem] gap-y-[1rem]',
      )}
      style={{ gridAutoRows: 'min-content' }}
      role="main"
    >
      {strings.info?.map(([k, v]) => (
        <Fragment key={k}>
          <div
            className={clsx('text-center', locale === 'en-US' && 'text-right')}
          >
            {k}
          </div>
          <div className="opacity-75">{v}</div>
        </Fragment>
      ))}
      <div className="absolute w-[2px] top-[15vh] bottom-0 left-[405px] bg-white" />
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

      <div className="grid grid-cols-[0.8fr_2fr] text-[20px] leading-tight gap-x-[1rem] gap-y-[2rem] mr-4 mb-[3rem]">
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
      title: 'About | 合同会社Monoid | G.K. Monoid | Monoid',
    },
  };
}
