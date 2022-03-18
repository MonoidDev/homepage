import clsx from 'clsx';

import { LayoutMenu } from './LayoutMenu';
import { Theme, ThemeProvider } from '@/styles/theme';

export interface LayoutProps {
  meta: React.ReactNode;
  children: React.ReactNode;
  theme: Theme;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { meta, children, theme } = props;

  return (
    <ThemeProvider value={{ theme }}>
      <div
        className={clsx(
          'flex flex-col w-full antialiased min-h-screen',
          theme,
          theme === 'black' && 'bg-black text-white',
          theme === 'white' && 'bg-white text-black',
        )}
      >
        {meta}
        <LayoutMenu />
        {children}
      </div>
    </ThemeProvider>
  );
};
