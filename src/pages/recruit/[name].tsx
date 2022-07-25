import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import LeftArrowSvg from '@/assets/images/LeftArrow.svg';
import LeftTriangleSvg from '@/assets/images/LeftTriangle.svg';
import RightArrowSvg from '@/assets/images/RightArrow.svg';
import RightTriangleOutlineSvg from '@/assets/images/RightTriangleOutline.svg';
import styles from '@/components/recruit/index.module.css';
import { useAriaLabelStrings } from '@/data/ariaLabel';
import { allJobNames, useRecruitStrings } from '@/data/recruit';

export default function JobDescription() {
  const {
    query: { name },
  } = useRouter();

  const descriptions = useRecruitStrings();
  const ariaLabelStrings = useAriaLabelStrings();

  const description = descriptions.jobs.find((item) => item.name === name);

  const renderDesktopHeader = () => (
    <div className="flex gap-x-[40px] mb-[1rem] font-loose">
      <Link href="/recruit/jobs">
        <a>
          <LeftTriangleSvg className="cursor-pointer" />
        </a>
      </Link>
      <span className="text-[80px] font-bold leading-none mt-[5px]">
        {name}
      </span>

      <div className="flex-1" />

      {name !== 'UIUX DESIGNER' && (
        <>
          <Link href={`/recruit/apply/${name}`}>
            <a className={styles.nextTitle}>APPLY</a>
          </Link>

          <Link href={`/recruit/apply/${name}`}>
            <RightTriangleOutlineSvg className="cursor-pointer mt-3" />
          </Link>
        </>
      )}
    </div>
  );

  const renderDesktopContent = () => (
    <div className="shrink overflow-scroll">
      <div
        className={clsx(
          'bg-black bg-opacity-[12.5%] rounded-[45px] p-[3rem] leading-loose font-loose text-[25px] mb-[4rem]',
          styles.content,
        )}
      >
        {description?.description}
      </div>
    </div>
  );

  const renderDesktop = () => (
    <div className="sm:hidden flex-1 shrink flex min-h-0 flex-col pt-[28px] mx-[128px] overflow-hidden">
      {renderDesktopHeader()}
      {renderDesktopContent()}
    </div>
  );

  const renderMobile = () => (
    <div className=">sm:hidden flex-1 shrink flex flex-col min-h-0">
      <h2 className="font-loose font-bold text-[60px] leading-[50px] px-[26px] mt-[-3rem] mb-[1rem]">
        {description?.mobileName}
      </h2>

      <div className="flex-1 shrink min-h-0 overflow-auto pt-[1rem] pb-[3rem]">
        <div
          className={clsx(
            'bg-[#DFDFDF] p-[2rem] rounded-[2rem]',
            styles.contentMobile,
          )}
        >
          {description?.description}
        </div>
      </div>

      <div className="px-[10px] h-[150px] shrink-0 flex items-center justify-between bg-white shadow-[0px_-1px_4px_rgba(0,0,0,0.25)]">
        <Link href="/recruit/jobs">
          <button aria-label={ariaLabelStrings.back}>
            <div className="font-loose font-bold text-[26px] leading-none">
              BACK
            </div>
            <LeftArrowSvg />
          </button>
        </Link>
        <Link href={`/recruit/apply/${name}`}>
          <button aria-label={ariaLabelStrings.apply}>
            <RightArrowSvg />
            <div className="font-loose font-bold text-[42px] leading-none mt-[0.75rem]">
              APPLY
            </div>
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {renderDesktop()}
      {renderMobile()}
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: ['en-US', 'ja-JP', 'zh-CN']
      .map((locale) =>
        allJobNames.map((name) => ({ params: { name }, locale })),
      )
      .flat(),
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'white',
      title: 'Jobs | 合同会社Monoid | G.K. Monoid | Monoid',
      screenHeight: true,
      hideLogo: true,
    },
  };
}
