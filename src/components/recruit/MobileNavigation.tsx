import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';
import Link from 'next/link';
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
    <Link
      href={url}
      aria-current={url === router.pathname ? 'page' : undefined}
      className={clsx(
        url === router.pathname && 'text-[44px] text-white font-bold',
        url !== router.pathname &&
          'text-[32px] [-webkit-text-stroke:1px_white] [-webkit-text-fill-color:black]',
      )}
    >
      {title}
    </Link>
  );

  return (
    <nav
      className={clsx(
        '>sm:hidden h-[75px] shrink-0 bg-black flex items-center justify-between font-loose',
        'pt-[0.5rem] px-[1rem]',
      )}
    >
      {renderTitle(strings.access, '/contact')}
      {renderTitle(strings.contact, '/contact/form')}
    </nav>
  );
};
