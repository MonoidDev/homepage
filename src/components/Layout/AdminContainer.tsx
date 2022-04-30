import Cookies from 'js-cookie';
import Link from 'next/link';

import { auth } from '@/utils/auth';

export const AdminContainer: React.FC = (props) => {
  const { children } = props;

  const renderNavigationButton = (label: string, href: string) => {
    return (
      <Link href={href}>
        <a
          className="ml-[1rem]"
          onClick={() => {
            if (href === '/admin/login') {
              Cookies.remove('token');
              auth.setToken(null);
            }
          }}
        >
          {label}
        </a>
      </Link>
    );
  };

  return (
    <div className="flex flex-1 shrink min-h-0 gap-x-[2rem]">
      <div className="flex flex-col w-[300px] ml-[2rem] my-[2rem] border-r border-black text-[20px]">
        <h2 className="font-bold">Admin</h2>
        {renderNavigationButton('Recruit', '/admin/recruit')}
        {renderNavigationButton('Log out', '/admin/login')}
      </div>
      <div className="flex-1 flex-col overflow-auto">{children}</div>
    </div>
  );
};
