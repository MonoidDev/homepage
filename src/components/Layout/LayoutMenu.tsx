import { useState } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import { LanguageMenu } from './LanguageMenu';
import styles from './LayoutMenu.module.css';
import Slash from '@/assets/images/Slash.svg';
import { useSiteStrings } from '@/data/site';
import { useAnimated } from '@/utils/animation';

interface NavMenuItemProps {
  index: number;
  textWidth: number;
  isLast?: boolean;
  action: 'open' | 'close';
}

const NavMenuItem: React.FC<NavMenuItemProps> = (props) => {
  const { children, index, textWidth, action, isLast } = props;

  const [textExpanded, setTextExpanded] = useState(false);

  const [width] = useAnimated(
    (frame) => Math.sin((frame / 60) * Math.PI),
    action === 'open' ? 0 : 18 + textWidth + 50,
    action === 'open' ? 18 + textWidth + 50 : 0,
    {
      onFinished: () => setTextExpanded(true),
    },
  );

  const [lastMargin] = isLast
    ? useAnimated(
        (frame) => Math.sin((frame / 60) * Math.PI),
        action === 'open' ? 45 : 100,
        action === 'open' ? 100 : 45,
      )
    : [0, 'idle'];

  return (
    <button className={styles.menuItem} style={{ marginRight: lastMargin }}>
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
        className="text-black absolute right-0 top-0"
        style={{ opacity: 0.2 + 0.1 * index }}
      />
    </button>
  );
};

export const LayoutMenu: React.VFC = (_props) => {
  const strings = useSiteStrings();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [menuAction, setMenuAction] = useState<'open' | 'close'>('open');

  const { locale = 'en-US' } = useRouter();

  const [languagesAction, setLanguagesAction] = useState<'open' | 'close'>(
    'close',
  );

  return (
    <div className="p-12">
      {/* <Lottie animationData={logoData} /> */}
      <div className="flex relative">
        <div className="flex-1" />
        <NavMenuItem
          index={0}
          textWidth={locale === 'ja-JP' ? 64 : 48}
          action={menuAction}
        >
          {strings.top}
        </NavMenuItem>
        <NavMenuItem
          index={1}
          textWidth={locale === 'zh-CN' ? 48 : locale === 'ja-JP' ? 48 : 120}
          action={menuAction}
        >
          {strings.company}
        </NavMenuItem>
        <NavMenuItem
          index={2}
          textWidth={locale === 'zh-CN' ? 48 : locale === 'ja-JP' ? 64 : 84}
          action={menuAction}
        >
          {strings.works}
        </NavMenuItem>
        <NavMenuItem
          index={3}
          textWidth={locale === 'ja-JP' ? 48 : 104}
          action={menuAction}
        >
          {strings.recruit}
        </NavMenuItem>
        <NavMenuItem
          index={4}
          textWidth={locale === 'ja-JP' ? 48 : 104}
          action={menuAction}
          isLast={true}
        >
          {strings.contact}
        </NavMenuItem>

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
  );
};
