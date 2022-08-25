import React, { useState } from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import CN from '@/assets/images/CN.svg';
import EN from '@/assets/images/EN.svg';
import JP from '@/assets/images/JP.svg';
import LanguagesSvg from '@/assets/images/Languages.svg';
import { useAriaLabelStrings } from '@/data/ariaLabel';
import { useChain } from '@/utils/animation';

export const MobileLanguageMenu = () => {
  const [open, setOpen] = useState(false);
  const ariaLabelStrings = useAriaLabelStrings();
  const router = useRouter();

  const menuChain = useChain([
    {
      from: 0,
      to: 1,
      interpolate: (x) => Math.sin(((x / 15) * Math.PI) / 2),
    },
  ]);

  const t = menuChain.currentValue;

  const backgroundColor = `rgba(
    ${(1 - t) * 255}, ${(1 - t) * 255}, ${(1 - t) * 255}, ${t}
  )`;

  const onOpen = async () => {
    await menuChain.play();
    setOpen(true);
  };

  const onClose = async () => {
    await menuChain.reverse();
    setOpen(false);
  };

  const renderSlash = () => (
    <div className="relative">
      <svg
        className="absolute left-[-25px] top-[-47.5px]"
        width={50}
        viewBox="0 0 50 95"
      >
        <line x1={45} y1={-1} x2={5} y2={96} strokeWidth={5} stroke="white" />
      </svg>
    </div>
  );

  const renderLanguageButton = (locale: string, icon: React.ReactNode) => (
    <Link href={router.asPath} locale={locale}>
      <a aria-label={ariaLabelStrings.close} onClick={onClose}>
        {icon}
      </a>
    </Link>
  );

  return (
    <div
      className="mb-[18px] py-[18px] w-full h-[94px] flex"
      style={{
        color: `rgb(${t * 255}, ${t * 255}, ${t * 255})`,
        backgroundColor,
      }}
    >
      <div
        className={clsx(
          'flex-1 flex items-center justify-between pl-[28px] pr-[32px] relative',
          !open && 'pointer-events-none',
        )}
        style={{ opacity: t }}
      >
        {renderLanguageButton('ja-JP', <JP />)}
        {renderSlash()}
        {renderLanguageButton('zh-CN', <CN />)}
        {renderSlash()}
        {renderLanguageButton('en-US', <EN />)}
      </div>
      <button
        aria-label={ariaLabelStrings.languages}
        onClick={async () => {
          if (!open) {
            await onOpen();
          } else {
            await onClose();
          }
        }}
      >
        <LanguagesSvg height={58 - 8 * t} className="mr-[28px]" />
      </button>
    </div>
  );
};
