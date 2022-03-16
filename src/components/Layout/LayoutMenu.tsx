import Logo from '@/assets/Logo.svg';
import { useSiteStrings } from '@/data/site';

export const LayoutMenu: React.VFC = (_props) => {
  const strings = useSiteStrings();

  return (
    <div className="p-12 flex gap-x-4">
      <Logo />

      {strings.top}
    </div>
  );
};
