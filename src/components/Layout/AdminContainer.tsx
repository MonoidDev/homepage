import clsx from 'clsx';
import Cookies from 'js-cookie';
import Link from 'next/link';

import { auth } from '@/utils/auth';

export interface AdminContainerProps {
  children: React.ReactNode;
}

export const AdminContainer: React.FC<AdminContainerProps> = (props) => {
  const { children } = props;

  const renderNavigationButton = (label: string, href: string) => {
    return (
      <Link href={href}>
        <a
          className="ml-[1rem]"
          onClick={(e) => {
            if (href === '/admin/login') {
              if (confirm('Do you really want to log out?')) {
                Cookies.remove('token');
                auth.setToken(null);
              } else {
                e.preventDefault();
                e.stopPropagation();
              }
            }
          }}
        >
          {label}
        </a>
      </Link>
    );
  };

  return (
    <div
      className={clsx('flex flex-1 shrink min-h-0 gap-x-[2rem]', 'sm:flex-col')}
    >
      <div
        className={clsx(
          'flex flex-col w-[300px] ml-[2rem] my-[2rem] border-r border-black text-[20px]',
        )}
      >
        <h2 className="font-bold">Admin</h2>
        {renderNavigationButton('Recruit', '/admin/recruit')}
        {renderNavigationButton('Contact', '/admin/contact')}
        {renderNavigationButton(
          'Analytics',
          'https://plausible.monoid.co.jp/monoid.co.jp',
        )}
        {renderNavigationButton('Log out', '/admin/login')}
      </div>
      <div className="flex-1 flex-col overflow-auto">{children}</div>
    </div>
  );
};
