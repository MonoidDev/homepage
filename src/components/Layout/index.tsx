import clsx from 'clsx';

import { LayoutMenu } from './LayoutMenu';
import { Theme, ThemeProvider } from '@/styles/theme';

export interface LayoutProps {
  loadingDone: boolean;
  hideLogo: boolean;
  meta: React.ReactNode;
  children: React.ReactNode;
  theme: Theme;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { meta, children, theme, loadingDone, hideLogo } = props;

  return (
    <ThemeProvider value={{ loadingDone, theme, navbarHeight: 140 }}>
      <div
        className={clsx(
          'flex flex-col w-full antialiased min-h-screen',
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
