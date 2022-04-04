import React from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
import Link from 'next/link';

const useStrings = makeStrings({
  'en-US': {
    title: 'A productive playground',
    slogan: '“Monoid is an oasis for talented engineers and creators. ”',
    benefits: [
      'fully remote & flexible hours',
      'home office improvement incentives',
      'flat management',
      'vacation incentives',
      'results oriented',
      'paid time off (full-time employees only)',
    ],
    apply: 'APPLY',
  },
});

export default function Recruit() {
  const strings = useStrings();

  return (
    <main
      className={
        'font-dense flex-1 flex flex-col px-[100px] pb-[50px] justify-end text-white'
      }
    >
      <h2 className="text-[140px]">{strings.title}</h2>
      <h3 className="text-[64px] opacity-[.45]">{strings.slogan}</h3>
      <div className="h-[2vh]" />
      <div className="flex justify-between items-end flex-wrap gap-y-4">
        <ul className="text-[35px] grid grid-cols-[5fr_6fr] w-[60vw] gap-x-4">
          {strings.benefits.map((s) => (
            <li key={s} className="list-disc list-inside">
              {s}
            </li>
          ))}
        </ul>

        <Link href="/recruit/jobs">
          <a className="text-center w-[300px] h-[120px] text-[80px] border-[5px] leading-[1.7] border-white rounded-[60px] hover:text-gray-400 hover:border-gray-400">
            {strings.apply}
          </a>
        </Link>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'black',
      title: 'Recruit - Monoid',
    },
  };
}
