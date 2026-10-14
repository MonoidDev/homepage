import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import LeftArrowSvg from '@/assets/images/LeftArrow.svg';
import LeftTriangleSvg from '@/assets/images/LeftTriangle.svg';
import RightArrowSvg from '@/assets/images/RightArrow.svg';
import RightTriangleOutlineSvg from '@/assets/images/RightTriangleOutline.svg';
import styles from '@/components/recruit/index.module.css';
import { useCandidateStrings } from '@/components/recruit/recruitForm';
import { useAriaLabelStrings } from '@/data/ariaLabel';
import { allJobNames, JobDescription, useRecruitStrings } from '@/data/recruit';

export default function JobDescription() {
  const {
    query: { name },
  } = useRouter();

  const descriptions = useRecruitStrings();
  const strings = useCandidateStrings();
  const ariaLabelStrings = useAriaLabelStrings();

  const description = (descriptions.jobs as JobDescription[]).find(
    (item) => item.name === name,
  );

  const renderDesktopHeader = () => (
    <div className="flex gap-x-[20px] mb-[1rem] font-loose">
      <Link href="/recruit/jobs" aria-label={ariaLabelStrings.back}>
        <LeftTriangleSvg className="cursor-pointer mt-[2px]" />
      </Link>
      <h1 className="text-[60px] md:text-[42px] font-bold leading-none mt-[5px]">
        {description?.mobileName?.toLocaleUpperCase()}
      </h1>

      <div className="flex-1" />

      {!description?.notHiring && (
        <Link href={`/recruit/apply/${name}`} className={styles.headerAction}>
          <span className={styles.nextTitle}>{strings.apply}</span>
          <RightTriangleOutlineSvg
            aria-hidden="true"
            className="w-[55px] h-[55px]"
          />
        </Link>
      )}
    </div>
  );

  const renderDesktopContent = () => (
    <div
      role="region"
      aria-label={strings.description}
      tabIndex={0}
      className="shrink min-h-0 overflow-auto px-1"
    >
      <div
        className={clsx(
          'bg-black bg-opacity-[12.5%] rounded-[45px] p-[3rem] !leading-[36px] font-loose text-[20px] mb-[4rem]',
          styles.content,
        )}
      >
        {description?.notHiring ? strings.notHiring : description?.description}
        {!description?.notHiring && (
          <Link href={`/recruit/apply/${name}`} className={styles.pill}>
            {strings.applyRole}
          </Link>
        )}
      </div>
    </div>
  );

  const renderDesktop = () => (
    <main className="sm:hidden flex-1 shrink flex min-h-0 flex-col pt-[28px] mx-[128px] md:mx-[48px] overflow-hidden">
      {renderDesktopHeader()}
      {renderDesktopContent()}
    </main>
  );

  const renderMobile = () => (
    <main className=">sm:hidden flex-1 shrink flex flex-col min-h-0">
      <h1 className="font-loose font-bold text-[60px] leading-[50px] px-[26px] mt-[-3rem] mb-[1rem]">
        {description?.mobileName}
      </h1>

      <div
        role="region"
        aria-label={strings.description}
        tabIndex={0}
        className="flex-1 shrink min-h-0 overflow-auto pt-[1rem] px-[1rem] pb-[3rem]"
      >
        <div
          className={clsx(
            'bg-[#DFDFDF] p-[1.5rem] rounded-[2rem]',
            styles.contentMobile,
          )}
        >
          {description?.notHiring
            ? strings.notHiring
            : description?.description}
        </div>
      </div>

      <div className="px-[10px] h-[150px] shrink-0 flex items-center justify-between bg-white shadow-[0px_-1px_4px_rgba(0,0,0,0.25)]">
        <Link
          href="/recruit/jobs"
          aria-label={strings.jobs}
          className="rounded px-3 py-2 hover:bg-[#DFDFDF]"
        >
          <div className="font-loose font-bold text-[26px] leading-none">
            {strings.back}
          </div>
          <LeftArrowSvg aria-hidden="true" />
        </Link>
        {!description?.notHiring && (
          <Link
            href={`/recruit/apply/${name}`}
            className="rounded px-3 py-2 hover:bg-[#DFDFDF]"
          >
            <RightArrowSvg aria-hidden="true" />
            <div className="font-loose font-bold text-[42px] leading-none mt-[0.75rem]">
              {strings.apply}
            </div>
          </Link>
        )}
      </div>
    </main>
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
