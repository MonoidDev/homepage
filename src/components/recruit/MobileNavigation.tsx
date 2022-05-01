import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';
import { useRouter } from 'next/router';

const useStrings = makeStrings({
  'en-US': {
    access: 'ACCESS',
    contact: 'CONTACT',
  },
});

export const MobileNavigation: React.VFC = () => {
  const strings = useStrings();

  const router = useRouter();

  const renderTitle = (title: string, url: string) => (
    <span
      onClick={() => router.push(url)}
      className={clsx(
        url === router.pathname && 'text-[44px] text-white font-bold',
        url !== router.pathname &&
          'text-[32px] [-webkit-text-stroke:1px_white] [-webkit-text-fill-color:black]',
      )}
    >
      {title}
    </span>
  );

  return (
    <div
      className={clsx(
        '>sm:hidden h-[75px] bg-black flex items-center justify-between font-loose',
        'pt-[0.5rem] px-[1rem]',
      )}
    >
      {renderTitle(strings.access, '/contact')}
      {renderTitle(strings.contact, '/contact/form')}
    </div>
  );
};
