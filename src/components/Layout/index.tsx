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

  return (
    <ThemeProvider
      value={{ loadingDone, theme, navbarHeight: 140, screen: 'desktop' }}
    >
      <div
        className={clsx(
          'flex flex-col w-full antialiased min-h-screen sm:hidden',
          screenHeight && '!h-screen',
          theme,
          theme === 'black' && 'bg-black text-white',
          theme === 'white' && 'bg-white text-black',
        )}
      >
        {meta}
        <LayoutMenu loadingDone={loadingDone} hideLogo={hideLogo} />
        {children}
      </div>
    </ThemeProvider>
  );
};
