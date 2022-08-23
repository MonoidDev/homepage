import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { LayoutMenu } from './LayoutMenu';
import { Theme, ThemeProvider } from '@/styles/theme';

export interface LayoutProps {
  loadingDone: boolean;
  hideLogo: boolean | 'mobile';
  meta: React.ReactNode;
  theme: Theme;
  screenHeight: boolean;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { meta, children, theme, loadingDone, hideLogo, screenHeight } = props;

  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  return (
    <ThemeProvider
      value={{
        loadingDone,
        theme: currentTheme,
        navbarHeight: 121,
        screen: 'desktop',
        setTheme: setCurrentTheme,
      }}
    >
      <div
        className={clsx(
          'flex flex-col w-full antialiased h-screen sm:hidden',
          screenHeight && '!h-screen',
          currentTheme,
          currentTheme === 'black' && 'bg-black text-white',
          currentTheme === 'white' && 'bg-white text-black',
          'transition-colors duration-300',
        )}
      >
        {meta}
        <LayoutMenu loadingDone={loadingDone} hideLogo={hideLogo} />
        {children}
      </div>
    </ThemeProvider>
  );
};
