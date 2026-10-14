import { useEffect, useState, useRef, useId, useCallback } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import { MenuTick } from './MenuTick';
import { MobileLayoutMenu } from './MobileLayoutMenu';
import LogoSvg from '@/assets/images/Logo.svg';
import LogoWhiteSvg from '@/assets/images/LogoWhite.svg';
import { useAriaLabelStrings } from '@/data/ariaLabel';
import { Theme, ThemeProvider } from '@/styles/theme';

export interface MobileLayoutProps {
  loadingDone: boolean;
  hideLogo: boolean;
  meta: React.ReactNode;
  children: React.ReactNode;
  theme: Theme;
}

export const MobileLayout: React.FC<MobileLayoutProps> = (props) => {
  const { loadingDone, hideLogo, theme, children } = props;
  const ariaLabelStrings = useAriaLabelStrings();

  const [menuOpen, setMenuOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const background = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    requestAnimationFrame(() => trigger.current?.focus());
  }, []);
  useEffect(() => {
    background.current?.toggleAttribute('inert', menuOpen);
  }, [menuOpen]);

  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  return (
    <ThemeProvider
      value={{
        loadingDone,
        theme: currentTheme,
        navbarHeight: 110,
        screen: 'mobile',
        setTheme: setCurrentTheme,
      }}
    >
      <div
        ref={background}
        aria-hidden={menuOpen || undefined}
        className={clsx(
          '>sm:hidden fill-available flex flex-col overflow-hidden relative z-0',
          currentTheme,
          currentTheme === 'black' && 'bg-black text-white',
          currentTheme === 'white' && 'bg-white text-black',
        )}
        style={
          {
            '--navbarHeight': '110px',
          } as any
        }
      >
        <header className="h-[110px] flex items-center px-[28px] shrink-0 z-[10]">
          {!hideLogo && (
            <>
              <Link aria-label={ariaLabelStrings.home} href="/">
                {currentTheme === 'white' && <LogoSvg height={62} />}
                {currentTheme === 'black' && <LogoWhiteSvg height={62} />}
              </Link>
            </>
          )}

          <div className="flex-1" />

          <button
            type="button"
            ref={trigger}
            aria-label={ariaLabelStrings.menu}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            className="min-h-[44px] min-w-[44px]"
            onClick={() => setMenuOpen(true)}
          >
            <MenuTick
              aria-hidden="true"
              className="white:text-black black:text-white motion-safe:animate-pulse-lg"
            />
          </button>
        </header>

        {children}
      </div>
      {menuOpen && <MobileLayoutMenu id={menuId} onClose={closeMenu} />}
    </ThemeProvider>
  );
};
