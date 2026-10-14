import { useEffect, useId, useRef } from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import CN from '@/assets/images/CN.svg';
import EN from '@/assets/images/EN.svg';
import JP from '@/assets/images/JP.svg';
import Languages from '@/assets/images/Languages.svg';
import { useAriaLabelStrings } from '@/data/ariaLabel';

export interface LanguageMenuProps {
  action: 'open' | 'close';
  onChangeAction?: (action: 'open' | 'close') => void;
}

export const LanguageMenu: React.FC<LanguageMenuProps> = ({
  action,
  onChangeAction,
}) => {
  const router = useRouter();
  const labels = useAriaLabelStrings();
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const choices = useRef<HTMLDivElement>(null);
  const open = action === 'open';
  const close = () => {
    onChangeAction?.('close');
    trigger.current?.focus();
  };
  useEffect(() => {
    if (open) choices.current?.querySelector('a')?.focus();
  }, [open]);

  return (
    <div
      className={clsx(
        'flex items-center rounded-full p-2 gap-4',
        open &&
          'white:bg-black white:text-white black:bg-white black:text-black',
      )}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.stopPropagation();
          close();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          onChangeAction?.('close');
      }}
    >
      <div id={id} ref={choices} hidden={!open}>
        {open && (
          <div className="flex items-center gap-8 px-5 md:gap-5">
            {(
              [
                ['ja-JP', labels.jp, JP],
                ['en-US', labels.en, EN],
                ['zh-CN', labels.cn, CN],
              ] as const
            ).map(([locale, name, Icon]) => (
              <Link
                key={locale}
                href={router.asPath}
                locale={locale}
                aria-label={name}
                aria-current={router.locale === locale ? 'true' : undefined}
                className="flex min-h-[44px] items-center border-b border-transparent aria-[current=true]:border-current"
                onClick={close}
              >
                <Icon aria-hidden="true" />
              </Link>
            ))}
          </div>
        )}
      </div>
      <button
        type="button"
        ref={trigger}
        aria-label={labels.languages}
        aria-expanded={open}
        aria-controls={id}
        className="flex h-[44px] w-[44px] items-center justify-center rounded-full"
        onClick={() => (open ? close() : onChangeAction?.('open'))}
      >
        <Languages width={33} aria-hidden="true" />
      </button>
    </div>
  );
};
