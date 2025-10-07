import React, { Fragment, useEffect } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import KeySvg from '@/assets/images/Key.svg';
import { AnimatedSwitch2 } from '@/components/company/AnimatedSwitch2';
import { MobileAnimatedSwitch } from '@/components/company/MobileAnimatedSwitch';
import { OpeningLink } from '@/components/OpeningLink';
import { useOpeningStrings } from '@/data/opening';
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
        We cherish and respect traditional values; we know the struggles and
        obstacles people might face while evolving and preparing for the new
        era. We are trustable partners to help traditional companies make right
        technical decisions.
      </>
    ),
    companyInfo: 'COMPANY INFO',
    info: [
      ['Name', 'G.K. Monoid'],
      ['Established', '2020/12/24'],
      ['Capital', '10,000,000 JPY'],
      ['Business', 'Design & Development'],
      ['Representative', 'Suzue Anjo'],
      [
        'Location',
        'Tokyo Sankei Building 27F, 1-7-2 Otemachi, Chiyoda-Ku, Tokyo',
      ],
    ],
  },
  'zh-CN': {
    title: (
      <>
        我们致力于通过高度专业化的设计师以及工程师团队创造性地解决多样的技术难题。
      </>
    ),
    content: (
      <>
        我们并非简单地将新技术强加于任何项目中，而是在旧与新的价值观及方法论产生摩擦时，根据客户的实际情况帮助客户作出正确的技术决策。
        <br />
        我们使用高效，严谨的新技术和新框架，解决旧患旧疾，为新时代的来临铺平道路。
      </>
    ),
    info: [
      ['公司名称', '合同会社Monoid'],
      ['成立日期', '2020年12月24日'],
      [
        '注册资金',
        <>
          1,000万日元<span className=">sm:hidden">{'\n'}</span>
          [截止至2022年6月末]
        </>,
      ],
      ['业务内容', '设计・开发・维护'],
      ['公司法人', '鈴江 晏如'],
      [
        '所在地',
        'Tokyo Sankei Building 27F, 1-7-2 Otemachi, Chiyoda-Ku, Tokyo',
      ],
    ],
  },
  'ja-JP': {
    title: (
      <>
        私たちは、あなたの「テクノロジーパートナー」として、次世代へ向けた新しいものを発明します。
      </>
    ),
    content: (
      <>
        デザイナーとエンジニアの専門チームによるクリエイティブな課題解決で、より良い世界の実現にコミットしています。
        <br />
        ただ新しい技術を押しつけるのではなく、旧来の価値観や手法が新しいものに移行していく際に生じる摩擦や軋轢などのリスクも含め、お客様の技術的な意思決定を包括的にサポートします。
      </>
    ),
    info: [
      ['会社名', '合同会社Monoid'],
      ['設立', '2020年12月24日'],
      [
        '資本金',
        <>
          1,000万円
          <span className=">sm:hidden">{'\n'}</span>
          [2022年6月末時点]
        </>,
      ],
      ['事業内容', '企画・開発・運用'],
      ['代表者', '鈴江 晏如'],
      ['所在地', '東京都千代田区大手町1-7-2 東京サンケイビル 27F'],
    ],
  },
} as const);

const Vision: React.FC = () => {
  const strings = useStrings();

  const locale = useLocale();

  return (
    <main className="flex-1 flex font-dense px-[75px] sm:px-[32px] pt-[100px] sm:pt-[60px]">
      <div className="px-[150px] sm:hidden">
        <KeySvg />
      </div>

      <div className=">sm:pr-[100px]">
        <h1
          className={clsx(
            'text-[40px] sm:!text-[28px] sm:!leading-[55px] leading-[1.25] mb-[2.5vw] sm:mb-[25px] font-bold',
            locale === 'en-US' && '!text-[50px] sm:!text-[40px]',
          )}
        >
          {strings.title}
        </h1>
        <p
          className={clsx(
            'text-[24px] sm:text-[20px] leading-[1.25]',
            'opacity-75 max-w-[78vw] sm:max-w-[290px] sm:mb-[50px]',
            locale === 'en-US' && '!text-[30px]',
            locale === 'ja-JP' && '!font-bold',
          )}
        >
          {strings.content}
        </p>
      </div>
    </main>
  );
};

const Services: React.FC = () => {
  const locale = useLocale();

  const openingStrings = useOpeningStrings();

  const renderItem = (index: number, item: React.ReactNode) => {
    return (
      <div key={index}>
        <span className="font-dense font-bold text-[36px] leading-none mr-[10px]">
          {(index + 1).toString().padStart(2, '0')}
        </span>

        <span className="font-dense font-bold text-[24px]">{item}</span>
      </div>
    );
  };

  return (
    <main
      className={clsx(
        'flex-1 px-[120px] py-[85px] font-dense text-white',
        'flex flex-col gap-y-[70px]',
        'sm:hidden',
      )}
    >
      <div className="flex gap-x-[60px] md:!gap-x-[30px]">
        <div className="flex flex-col">
          {(locale === 'ja-JP' || locale === 'zh-CN') && (
            <h3 className="text-[60px] leading-none font-bold mb-[0.5rem]">
              {openingStrings.DXAcceleration}
            </h3>
          )}
          {locale === 'en-US' && (
            <h3 className="text-[80px] leading-none font-bold mb-[1.8rem]">
              <span className="opacity-60 relative">DX</span>
              <span className="ml-[-25px] inline-block relative top-[40px]">
                Acceleration
              </span>
            </h3>
          )}

          <p className="text-[20px] font-bold leading-tight">
            {openingStrings.DXAccelerationSummary.map((d, i) => (
              <Fragment key={i}>
                {d}
                <br />
              </Fragment>
            ))}
          </p>
        </div>

        <div className="grid grid-flow-col grid-rows-3 gap-x-[60px] md:!gap-x-[20px]">
          {openingStrings.DXAccelarationItems.map((item, i) =>
            renderItem(i, item),
          )}
        </div>
        {(locale === 'ja-JP' || locale === 'zh-CN') && (
          <div className="pt-[1rem]">
            <OpeningLink href="/works/0" color="white">
              SEE WORKS
            </OpeningLink>
          </div>
        )}
      </div>

      <div className="flex gap-x-[60px] md:!gap-x-[30px] justify-end">
        <div className="flex flex-col justify-end pb-[0.5rem]">
          {(locale === 'ja-JP' || locale === 'zh-CN') && (
            <OpeningLink href="/works/1" color="white" direction="left">
              SEE WORKS
            </OpeningLink>
          )}

          {locale === 'en-US' && (
            <Link href="/works/0">
              <div className="p-[12px] text-white text-[32px] font-dense border-white border-2 leading-none cursor-pointer">
                SEE WORKS
              </div>
            </Link>
          )}
        </div>

        <div className="grid grid-flow-col grid-rows-3 gap-x-[60px]">
          {openingStrings.newBusinessItems.map((item, i) =>
            renderItem(i, item),
          )}
        </div>

        <div className="flex flex-col">
          {(locale === 'ja-JP' || locale === 'zh-CN') && (
            <h3 className="text-[60px] leading-none font-bold mb-[1rem]">
              {openingStrings.newBusiness}
            </h3>
          )}
          {locale === 'en-US' && (
            <h3 className="text-[80px] leading-none font-bold mb-[1.8rem]">
              <span className="opacity-60 relative">Product</span>
              <span className="ml-[-135px] inline-block relative top-[40px]">
                Incubation
              </span>
            </h3>
          )}

          <p className="text-[20px] font-bold leading-tight text-right">
            {openingStrings.newBusinessSummary.map((d, i) => (
              <Fragment key={i}>
                {d}
                <br />
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    </main>
  );
};

const MobileServices: React.FC = () => {
  const locale = useLocale();

  const openingStrings = useOpeningStrings();

  return (
    <main
      className={clsx(
        'py-[60px] px-[32px] font-dense text-white',
        '>sm:hidden',
      )}
    >
      <h2 className="text-[28px] mb-[0.5rem]">
        {openingStrings.DXAcceleration}
      </h2>
      <p
        className={clsx(
          'text-[20px] mb-[0.5rem]',
          locale === 'en-US' && 'opacity-60',
        )}
      >
        {openingStrings.DXAccelerationSummary.map((d, i) => (
          <Fragment key={i}>
            {d}
            <br />
          </Fragment>
        ))}
      </p>

      <div className="flex flex-col gap-y-[10px]">
        {openingStrings.DXAccelarationItems.map((item, i) => (
          <div key={i} className="text-[20px] flex">
            {String(i + 1).padStart(2, '0')}
            <div className="w-[20px]" />
            {item}
          </div>
        ))}
      </div>

      <div className="h-[45px]" />

      <h2 className="text-[28px] mb-[0.5rem]">{openingStrings.newBusiness}</h2>
      <p
        className={clsx(
          'text-[20px] mb-[0.5rem]',
          locale === 'en-US' && 'opacity-60',
        )}
      >
        {openingStrings.newBusinessSummary.map((d, i) => (
          <Fragment key={i}>
            {d}
            <br />
          </Fragment>
        ))}
      </p>

      <div className="flex flex-col gap-y-[10px]">
        {openingStrings.newBusinessItems.map((item, i) => (
          <div key={i} className="text-[20px] flex">
            {String(i + 1).padStart(2, '0')}
            <div className="w-[20px]" />
            {item}
          </div>
        ))}
      </div>

      <div className="flex mt-[50px]">
        <OpeningLink href="/works/0" color="white">
          SEE WORKS
        </OpeningLink>
      </div>
    </main>
  );
};

const Info: React.FC = () => {
  const strings = useStrings();

  const locale = useLocale();

  return (
    <main
      className={clsx(
        'sm:hidden',
        'relative grid grid-cols-[300px_1fr] text-[30px] font-loose font-bold',
        'px-[75px] pt-[100px] gap-x-[4rem] gap-y-[1rem]',
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
      <div className="absolute w-[2px] top-[100px] bottom-0 left-[405px] bg-white" />
    </main>
  );
};

const MobileInfo: React.VFC = () => {
  const strings = useStrings();
  const locale = useLocale();

  return (
    <main
      className={clsx(
        '>sm:hidden',
        'pt-[60px] px-[24px] leading-[65px] font-loose font-bold',
      )}
    >
      <h2 className="mb-[3rem] text-[50px]">{strings.companyInfo}</h2>

      <div
        className={clsx(
          'grid grid-cols-[0.8fr_2fr] text-[20px] leading-tight gap-x-[1rem] gap-y-[2rem] mr-4 mb-[3rem]',
          locale === 'en-US' && '!text-[16px]',
        )}
      >
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
  const router = useRouter();
  const { current } = router.query as { current: string };

  useEffect(() => {
    ['vision', 'services', 'info'].map((v) => router.prefetch(`/company/${v}`));
  }, []);

  return (
    <div className="flex-1 flex flex-col text-white relative overflow-scroll min-h-0 >sm:pb-[90px]">
      <div
        className={clsx(
          'sm:hidden fixed left-0 right-0 bottom-0 py-[20px] z-50 bg-black',
          'flex justify-end',
        )}
      >
        <AnimatedSwitch2
          current={current}
          onChangeCurrent={(v) => router.push(v)}
        />
      </div>
      <div className=">sm:hidden fixed right-0 bottom-0 w-[38px] h-[360px]">
        <MobileAnimatedSwitch
          current={current}
          onChangeCurrent={(v) => router.push(v)}
        />
      </div>
      {current === 'vision' && <Vision />}

      {current === 'services' && (
        <>
          <Services />
          <MobileServices />
        </>
      )}

      {current === 'info' && (
        <>
          <Info />
          <MobileInfo />
        </>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: ['en-US', 'ja-JP', 'zh-CN']
      .map((locale) =>
        ['vision', 'services', 'info'].map((current) => ({
          params: { current },
          locale,
        })),
      )
      .flat(),
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'black',
      title: 'About | 合同会社Monoid | G.K. Monoid | Monoid',
    },
  };
}
