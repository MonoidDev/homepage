import { useEffect, useRef } from 'react';

import Link from 'next/link';

import { MenuTick } from './MenuTick';
import { MobileLanguageMenu } from './MobileLanguageMenu';
import { useAriaLabelStrings } from '@/data/ariaLabel';
import { useSiteStrings } from '@/data/site';

export interface MobileLayoutMenuProps {
  onClose: () => void;
  id?: string;
}

export const MobileLayoutMenu: React.FC<MobileLayoutMenuProps> = ({
  onClose,
  id,
}) => {
  const strings = useSiteStrings();
  const labels = useAriaLabelStrings();
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dialog.current?.querySelector('button')?.focus();
  }, []);

  return (
    <div
      id={id}
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={labels.menu}
      className=">sm:hidden fixed z-50 inset-0 bg-white bg-opacity-95 text-black py-5 flex flex-col items-end overflow-y-auto"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
        }
        if (event.key === 'Tab') {
          const controls = Array.from(
            dialog.current?.querySelectorAll<HTMLElement>('a[href], button') ??
              [],
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
      }}
    >
      <button
        type="button"
        className="mr-7 mb-2 min-h-[44px] px-2 font-loose text-lg"
        onClick={onClose}
      >
        {labels.close} ×
      </button>
      <MobileLanguageMenu />
      <nav aria-label={labels.menu} className="flex flex-col items-end">
        {[
          ['/', strings.top],
          ['/company/vision', strings.company],
          ['/works/0', strings.works],
          ['/recruit', strings.recruit],
          ['/contact', strings.contact],
        ].map(([href, label], index) => (
          <div key={href} className="flex flex-col items-end">
            <Link
              href={href!}
              className="mt-4 font-dense text-[48px] leading-none mr-7"
              onClick={onClose}
            >
              {label}
            </Link>
            {index < 4 && (
              <MenuTick
                aria-hidden="true"
                className="text-black mr-[30px]"
                style={{ opacity: 0.4 - index * 0.08 }}
                strokeWidth={6}
              />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
