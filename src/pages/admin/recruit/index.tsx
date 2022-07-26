import clsx from 'clsx';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { getRecruits, Recruit } from '@/apis/recruit';
import { Paginated } from '@/apis/utils';
import { AdminContainer } from '@/components/Layout/AdminContainer';
import { PaginationControl } from '@/components/PaginationControl';
import styles from '@/pages/admin/index.module.css';
import { withAuth } from '@/utils/withAuth';

interface RecruitProps {
  data: Paginated<'recruits', Recruit>;
  limit: number;
  offset: number;
}

export default function RecruitIndex(props: RecruitProps) {
  const { data, limit, offset } = props;
  const router = useRouter();

  return (
    <AdminContainer>
      <div className="px-[4rem] sm:px-[1rem] py-[2rem] sm:py-0">
        <table className={clsx('w-full', styles.table)}>
          <tbody>
            <caption className="text-[36px] font-loose mb-[1rem]">
              Job Applications
            </caption>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Type</th>
              <th scope="col" />
            </tr>
            {data.recruits.map((item) => (
              <tr key={item.id}>
                <td>{dayjs(item.created_at).format('YYYY-MM-DD HH:mm')}</td>
                <td>{item.name}</td>
                <td>
                  <a
                    className="text-lime-700 underline"
                    href={`mailto:${item.email}`}
                    target="_blank"
                  >
                    {item.email}
                  </a>
                </td>
                <td>{item.recruit_type}</td>
                <td className="text-lime-700 underline">
                  <Link href={`/admin/recruit/${item.id}`}>
                    <a>Detail</a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-[1rem]" />
        <PaginationControl
          result={data}
          limit={limit}
          offset={offset}
          onChangeOffset={(offset) =>
            router.push(`/admin/recruit?offset=${offset}`)
          }
        />
      </div>
    </AdminContainer>
  );
}

export const getServerSideProps: GetServerSideProps<RecruitProps> = withAuth(
  async (context) => {
    const limit = Number(context.query?.limit ?? 10);
    const offset = Number(context.query?.offset ?? 0);

    const data = await getRecruits({
      limit,
      offset,
    });

    return {
      props: {
        data,
        limit,
        offset,
        theme: 'white',
        title: 'Admin | 合同会社Monoid | G.K. Monoid | Monoid',
        screenHeight: true,
      },
    };
  },
);
