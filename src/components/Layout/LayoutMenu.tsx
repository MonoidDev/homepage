import { Suspense, useState } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { LanguageMenu } from './LanguageMenu';
import { useAriaLabelStrings } from '@/data/ariaLabel';
import { useSiteStrings } from '@/data/site';
import { useTheme } from '@/styles/theme';

const AnimatedLogo = dynamic(() => import('./AnimatedLogo'), { ssr: false });

export const LayoutMenu: React.FC<{
  loadingDone: boolean;
  hideLogo: boolean | 'mobile';
  headerTransparent: boolean;
}> = ({ loadingDone, hideLogo, headerTransparent }) => {
  const strings = useSiteStrings();
  const labels = useAriaLabelStrings();
  const [languagesAction, setLanguagesAction] = useState<'open' | 'close'>(
    'close',
  );
  const { theme } = useTheme();

  return (
    <header
      className="z-[10] shrink-0 px-12 md:px-7"
      style={{ background: headerTransparent ? undefined : theme }}
    >
      <nav
        aria-label={labels.menu}
        className="flex h-[120px] items-center justify-between gap-5 border-b border-current"
      >
        {hideLogo !== true && (
          <Link
            href="/"
            aria-label={labels.home}
            className="w-[255px] shrink-0 md:w-[190px]"
          >
            <Suspense fallback={null}>
              <AnimatedLogo loadingDone={loadingDone} />
            </Suspense>
          </Link>
        )}
        <div className="flex flex-1 items-center justify-end gap-6 md:gap-3">
          {loadingDone && languagesAction === 'close' && (
            <div className="flex items-center gap-6 md:gap-3">
              {[
                ['/', strings.top],
                ['/company/vision', strings.company],
                ['/works/0', strings.works],
                ['/recruit', strings.recruit],
                ['/contact', strings.contact],
              ].map(([href, label], index) => (
                <Link
                  href={href!}
                  key={href}
                  className="relative flex min-h-[60px] items-center gap-6 font-dense text-[30px] md:gap-3 md:text-[24px]"
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className="h-[60px] w-px rotate-[25deg] bg-current"
                    style={{ opacity: 0.2 + index * 0.1 }}
                  />
                </Link>
              ))}
            </div>
          )}
          <LanguageMenu
            action={languagesAction}
            onChangeAction={setLanguagesAction}
          />
        </div>
      </nav>
    </header>
  );
};
