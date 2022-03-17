import { LayoutMenu } from './LayoutMenu';

export interface LayoutProps {
  meta: React.ReactNode;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { meta, children } = props;

  return (
    <div className="flex flex-col w-full antialiased text-black min-h-screen">
      {meta}
      <LayoutMenu />
      {children}
    </div>
  );
};
