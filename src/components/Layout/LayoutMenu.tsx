import { Suspense, useState } from 'react';
import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { LanguageMenu } from './LanguageMenu';
import styles from './LayoutMenu.module.css';
import Slash from '@/assets/images/Slash.svg';
import { useAriaLabelStrings } from '@/data/ariaLabel';
import { useSiteStrings } from '@/data/site';
import { useTheme } from '@/styles/theme';
import { useAnimated } from '@/utils/animation';

interface NavMenuItemProps {
  index: number;
  textWidth: number;
  isLast?: boolean;
  action: 'open' | 'close';
  href?: string;
  children: React.ReactNode;
}

const NavMenuItem: React.FC<NavMenuItemProps> = (props) => {
  const { href, children, index, textWidth, action, isLast } = props;

  const [textExpanded, setTextExpanded] = useState(false);
  const [width] = useAnimated(
    (frame) => Math.sin((frame / 60) * Math.PI),
    action === 'open' ? 0 : 18 + textWidth + 50,
    action === 'open' ? 18 + textWidth + 50 : 0,
    {
      onStart: () => action === 'close' && setTextExpanded(false),
      onFinished: () => action === 'open' && setTextExpanded(true),
    },
  );
  const ariaLabelStrings = useAriaLabelStrings();

  const [lastMargin] = isLast
    ? useAnimated(
        (frame) => Math.sin((frame / 60) * Math.PI),
        action === 'open' ? 45 : 100,
        action === 'open' ? 100 : 45,
      )
    : [0, 'idle'];

  const { theme } = useTheme();

  return (
    <Link href={href ?? ''}>
      <a
        aria-label={children?.toString() || ariaLabelStrings.menu}
        className={styles.menuItem}
        style={{ marginRight: lastMargin }}
      >
        <div
          className={clsx(
            'flex will-change-[width] will-change-[transform] transition-[transform]',
            !textExpanded && 'translate-x-full',
          )}
          style={{ width, transitionDuration: '300ms' }}
        >
          <div className="w-[18px] shrink-0" />
          <div
            className="whitespace-pre"
            style={{ width: textWidth, height: 60 }}
          >
            {children}
          </div>
          <div className="w-[50px] shrink-0" />
        </div>
        <Slash
          className="white:text-black black:text-white absolute right-0 top-0"
          style={{ opacity: theme === 'black' ? 1 : 0.2 + 0.1 * index }}
        />
      </a>
    </Link>
  );
};

const AnimatedLogo = React.lazy(() => import('./AnimatedLogo'));

export const LayoutMenu: React.VFC<{
  loadingDone: boolean;
  hideLogo: boolean | 'mobile';
}> = ({ loadingDone, hideLogo }) => {
  const strings = useSiteStrings();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [menuAction, setMenuAction] = useState<'open' | 'close'>('open');

  const { locale = 'en-US' } = useRouter();

  const [languagesAction, setLanguagesAction] = useState<'open' | 'close'>(
    'close',
  );

  return (
    <div className="flex flex-col z-[10]">
      <div className="px-12 pt-12 pb-8">
        <div className="flex relative items-center">
          <div
            className={clsx(
              'h-[60px] flex items-center',
              hideLogo === 'mobile' && 'sm:hidden',
            )}
          >
            {hideLogo !== true && (
              <Suspense fallback={null}>
                <AnimatedLogo loadingDone={loadingDone} />
              </Suspense>
            )}
          </div>
          <div className="flex-1" />
          {loadingDone && (
            <>
              <NavMenuItem
                href="/"
                index={0}
                textWidth={locale === 'ja-JP' ? 64 : 48}
                action={menuAction}
              >
                {strings.top}
              </NavMenuItem>
              <NavMenuItem
                href="/company"
                index={1}
                textWidth={
                  locale === 'zh-CN' ? 96 : locale === 'ja-JP' ? 96 : 120
                }
                action={menuAction}
              >
                {strings.company}
              </NavMenuItem>
              <NavMenuItem
                href="/works"
                index={2}
                textWidth={
                  locale === 'zh-CN' ? 64 : locale === 'ja-JP' ? 96 : 84
                }
                action={menuAction}
              >
                {strings.works}
              </NavMenuItem>
              <NavMenuItem
                href="/recruit"
                index={3}
                textWidth={locale === 'ja-JP' ? 48 : 104}
                action={menuAction}
              >
                {strings.recruit}
              </NavMenuItem>
              <NavMenuItem
                href="/contact"
                index={4}
                textWidth={104}
                action={menuAction}
                isLast={true}
              >
                {strings.contact}
              </NavMenuItem>
            </>
          )}

          <div className="absolute top-0 bottom-0 right-[24px] flex items-center">
            <LanguageMenu
              action={languagesAction}
              onChangeAction={(action) => {
                setMenuAction(action === 'open' ? 'close' : 'open');
                setLanguagesAction(action);
              }}
            />
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-black mx-12 black:bg-white" />
    </div>
  );
};
