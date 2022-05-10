import React from 'react';

import { useRouter } from 'next/router';

import { RecruitSuccess } from '@/components/recruit/RecruitSuccess';

export default function Success() {
  const router = useRouter();

  return (
    <>
      <main className="flex-1 sm:hidden px-[120px] py-[64px] flex items-center justify-around">
        <h2 className="font-loose font-bold text-[110px] shrink">THANK YOU</h2>
        <RecruitSuccess onDone={() => router.push('/recruit')} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'white',
      title: 'Jobs | 合同会社Monoid | G.K. Monoid | Monoid',
    },
  };
}
