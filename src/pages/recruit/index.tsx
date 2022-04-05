import React from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';
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
        'font-dense flex-1 flex flex-col px-[100px] sm:px-[32px] pb-[50px] >sm:justify-end text-white'
      }
    >
      <h2 className="text-[140px] sm:text-[80px] sm:leading-[1] sm:mt-[2rem]">
        {strings.title}
      </h2>
      <h3 className="text-[64px] sm:text-[30px] sm:leading-[1] sm:my-[2rem] opacity-[.45]">
        {strings.slogan}
      </h3>
      <div className="h-[2vh] sm:h-[2vh]" />
      <div className="flex justify-between items-end sm:flex-col sm:justify-start sm:items-center flex-wrap gap-y-4 sm:gap-y-8">
        <ul
          className={clsx(
            'text-[35px] sm:text-[25px] sm:opacity-80 sm:leading-tight',
            'grid grid-cols-[5fr_6fr] sm:flex sm:flex-col gap-x-4',
            'w-[60vw] sm:w-full',
          )}
        >
          {strings.benefits.map((s) => (
            <li key={s} className="list-disc list-inside">
              {s}
            </li>
          ))}
        </ul>

        <Link href="/recruit/jobs">
          <a
            className={clsx(
              'text-center w-[300px] sm:w-[240px] h-[120px] sm:h-[60px] >sm:font-loose font-bold text-[80px] sm:text-[35px] border-[5px] leading-[1.7]',
              'border-white rounded-[60px] hover:text-gray-400 hover:border-gray-400',
            )}
          >
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
