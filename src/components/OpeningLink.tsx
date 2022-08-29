import clsx from 'clsx';
import Link from 'next/link';

import { Theme } from '@/styles/theme';

export const OpeningLink = (props: {
  children: React.ReactNode;
  color: Theme;
  href: string;
  className?: string;
  target?: string;
  direction?: 'left' | 'right';
}) => {
  const {
    children,
    color,
    href,
    className,
    target,
    direction = 'right',
  } = props;

  return (
    <Link href={href}>
      <a
        className={clsx(
          color === 'white' && 'text-white border-white',
          color === 'black' && 'text-black border-black',
          'font-dense font-bold text-[32px] leading-none',
          'border-b',
          'flex justify-center items-center gap-x-[0.6rem]',
          className,
        )}
        target={target}
      >
        {direction === 'left' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="20"
            viewBox="0 0 15 20"
            fill="none"
            className="relative top-[-3px]"
          >
            <path
              d="M14.5 18.6164L0.93265 10L14.5 1.38358L14.5 18.6164Z"
              fill={color}
              stroke={color}
            />
          </svg>
        )}
        {children}
        {direction === 'right' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="20"
            viewBox="0 0 15 20"
            fill="none"
            className="relative top-[-3px]"
          >
            <path
              d="M0.500002 1.38357L14.0673 10L0.500001 18.6164L0.500002 1.38357Z"
              fill={color}
              stroke={color}
            />
          </svg>
        )}
      </a>
    </Link>
  );
};
