import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { MenuTick } from './MenuTick';
import { MobileLayoutMenu } from './MobileLayoutMenu';
import LogoSvg from '@/assets/images/Logo.svg';
import LogoWhiteSvg from '@/assets/images/LogoWhite.svg';
import { useAriaLabelStrings } from '@/data/ariaLabel';
import { Theme, ThemeProvider } from '@/styles/theme';
import { useChain } from '@/utils/animation';

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
  const tickOpacity = useChain([
    {
      from: 1,
      to: 0,
      interpolate: (f) => Math.sin(((f / 15) * Math.PI) / 2),
    },
  ]);

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
        className={clsx(
          '>sm:hidden fill-available flex flex-col overflow-hidden relative z-0',
          currentTheme,
          currentTheme === 'black' && 'bg-black text-white',
          currentTheme === 'white' && 'bg-white text-black',
        )}
      >
        <div className="h-[110px] flex items-center px-[28px] shrink-0 z-[10]">
          {!hideLogo && (
            <>
              <a aria-label={ariaLabelStrings.home} href="/">
                {currentTheme === 'white' && <LogoSvg height={62} />}
                {currentTheme === 'black' && <LogoWhiteSvg height={62} />}
              </a>
            </>
          )}

          <div className="flex-1" />

          {!menuOpen && (
            <button
              aria-label={ariaLabelStrings.menu}
              onClick={async () => {
                await tickOpacity.play();
                setMenuOpen(true);
              }}
            >
              <MenuTick
                className={clsx(
                  'white:text-black black:text-white',
                  !tickOpacity.isPlaying && 'animate-pulse-lg',
                )}
                style={{ opacity: tickOpacity.currentValue }}
              />
            </button>
          )}
        </div>

        {children}
      </div>
      {menuOpen && (
        <MobileLayoutMenu
          onClose={async () => {
            setMenuOpen(false);
            await tickOpacity.reverse();
          }}
        />
      )}
    </ThemeProvider>
  );
};
