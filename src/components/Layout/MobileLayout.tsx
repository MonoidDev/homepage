import { useState } from 'react';

import clsx from 'clsx';

import { MenuTick } from './MenuTick';
import { MobileLayoutMenu } from './MobileLayoutMenu';
import LogoSvg from '@/assets/images/Logo.svg';
import LogoWhiteSvg from '@/assets/images/LogoWhite.svg';
import { Theme, ThemeProvider } from '@/styles/theme';
import { useChain } from '@/utils/animation';

export interface MobileLayoutProps {
  loadingDone: boolean;
  hideLogo: boolean;
  meta: React.ReactNode;
  theme: Theme;
}

export const MobileLayout: React.FC<MobileLayoutProps> = (props) => {
  const { loadingDone, hideLogo, theme, children } = props;

  const [menuOpen, setMenuOpen] = useState(false);
  const tickOpacity = useChain([
    {
      from: 1,
      to: 0,
      interpolate: (f) => Math.sin(((f / 15) * Math.PI) / 2),
    },
  ]);

  return (
    <ThemeProvider
      value={{ loadingDone, theme, navbarHeight: 110, screen: 'mobile' }}
    >
      <div
        className={clsx(
          '>sm:hidden fill-available flex flex-col overflow-hidden relative z-0',
          theme,
          theme === 'black' && 'bg-black text-white',
          theme === 'white' && 'bg-white text-black',
        )}
      >
        <div className="h-[110px] flex items-center justify-between px-[28px] shrink-0">
          {!hideLogo && (
            <>
              {theme === 'white' && <LogoSvg height={62} />}
              {theme === 'black' && <LogoWhiteSvg height={62} />}
            </>
          )}

          {!menuOpen && (
            <button
              onClick={async () => {
                await tickOpacity.play();
                setMenuOpen(true);
              }}
            >
              <MenuTick
                className={clsx(
                  'white:text-black black:text-white',
                  !tickOpacity.isPlaying && 'animate-pulse',
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
