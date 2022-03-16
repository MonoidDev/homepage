import { LayoutMenu } from './LayoutMenu';

export interface LayoutProps {
  meta: React.ReactNode;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { meta } = props;

  return (
    <div className="w-full antialiased text-black">
      {meta}
      <LayoutMenu />
    </div>
  );
};
