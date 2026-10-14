import dynamic from 'next/dynamic';
import Link from 'next/link';

import styles from '@/components/recruit/index.module.css';
import { useCandidateStrings } from '@/components/recruit/recruitForm';

const RecruitSuccessLottie = dynamic(
  () => import('@/components/recruit/RecruitSuccessLottie'),
  { ssr: false },
);

export default function Success() {
  const strings = useCandidateStrings();
  return (
    <main className="flex-1 flex sm:flex-col items-center justify-center gap-8 px-[80px] >sm:md:px-[40px] sm:px-[24px] py-[40px] font-loose">
      <div className="relative z-10 max-w-[650px] sm:text-center">
        <h1 className="font-bold text-[70px] sm:text-[40px] leading-tight mb-6">
          {strings.thanks}
        </h1>
        <p className="text-[26px] sm:text-[22px] font-bold mb-3">
          {strings.confirmed}
        </p>
        <p className="text-[18px] mb-8">{strings.confirmationDetail}</p>
        <div className="flex flex-wrap gap-4 sm:justify-center">
          <Link href="/recruit/jobs" className={styles.pill}>
            {strings.jobs}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-black px-8 py-4 text-[22px] font-bold hover:bg-[#DFDFDF]"
          >
            {strings.home}
          </Link>
        </div>
      </div>
      <div aria-hidden="true" className="w-[400px] sm:w-[260px] shrink-0">
        <RecruitSuccessLottie />
      </div>
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'white',
      hideLogo: 'mobile',
      title: 'Application received | Monoid',
    },
  };
}
