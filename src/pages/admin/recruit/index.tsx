import clsx from 'clsx';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './index.module.css';
import { getRecruits, Recruit } from '@/apis/recruit';
import { Paginated } from '@/apis/utils';
import { PaginationControl } from '@/components/PaginationControl';

interface RecruitProps {
  data: Paginated<'recruits', Recruit>;
  limit: number;
  offset: number;
}

export default function RecruitIndex(props: RecruitProps) {
  const { data, limit, offset } = props;
  const router = useRouter();

  return (
    <div className="px-[4rem] py-[2rem]">
      <h2 className="text-[36px] font-loose mb-[1rem]">Job Applications</h2>
      <table className={clsx('w-full', styles.table)}>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th />
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
  );
}

export const getServerSideProps: GetServerSideProps<RecruitProps> = async (
  context,
) => {
  const limit = Number(context.query?.limit ?? 10);
  const offset = Number(context.query?.offset ?? 0);

  const data = await getRecruits({
    limit,
    offset,
  });

  return {
    props: { data, limit, offset },
  };
};
