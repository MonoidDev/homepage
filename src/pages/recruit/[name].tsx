import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './recruit.module.css';
import LeftTriangleSvg from '@/assets/images/LeftTriangle.svg';
import RightTriangleOutlineSvg from '@/assets/images/RightTriangleOutline.svg';
import { allJobNames, useRecruitStrings } from '@/data/recruit';

export default function JobDescription() {
  const {
    query: { name },
  } = useRouter();

  const descriptions = useRecruitStrings();

  const description = descriptions.jobs.find((item) => item.name === name);

  const renderHeader = () => (
    <div className="flex gap-x-[40px] mb-[1rem] font-loose">
      <Link href="/recruit/jobs">
        <LeftTriangleSvg className="cursor-pointer" />
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

          <Link href="">
            <RightTriangleOutlineSvg className="cursor-pointer mt-3" />
          </Link>
        </>
      )}
    </div>
  );

  const renderContent = () => (
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

  return (
    <div className="flex-1 shrink flex min-h-0 flex-col pt-[28px] mx-[128px] overflow-hidden">
      {renderHeader()}
      {renderContent()}
    </div>
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
    },
  };
}
