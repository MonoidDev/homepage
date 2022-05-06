import clsx from 'clsx';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Contact, getContacts } from '@/apis/contact';
import { Paginated } from '@/apis/utils';
import { AdminContainer } from '@/components/Layout/AdminContainer';
import { PaginationControl } from '@/components/PaginationControl';
import styles from '@/pages/admin/index.module.css';
import { withAuth } from '@/utils/withAuth';

interface ContactIndexProps {
  data: Paginated<'contacts', Contact>;
  limit: number;
  offset: number;
}

export default function ContactIndex(props: ContactIndexProps) {
  const { data, limit, offset } = props;
  const router = useRouter();

  return (
    <AdminContainer>
      <div className="px-[4rem] sm:px-[1rem] py-[2rem] sm:py-0">
        <h2 className="text-[36px] font-loose mb-[1rem]">Contacts</h2>
        <table className={clsx('w-full', styles.table)}>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Company</th>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Budget</th>
              <th>Delivery</th>
              <th>Message</th>
              <th />
            </tr>
            {data.contacts.map((item) => (
              <tr key={item.id}>
                <td>{dayjs(item.created_at).format('YYYY-MM-DD HH:mm')}</td>
                <td>{item.company}</td>
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
                <td>{item.project_type.join('/')}</td>
                <td>{item.budget}</td>
                <td>{item.delivery}</td>
                <td className="whitespace-pre overflow-hidden text-ellipsis max-w-[100px]">
                  {item.message}
                </td>
                <td className="text-lime-700 underline">
                  <Link href={`/admin/contact/${item.id}`}>
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
            router.push(`/admin/contact?offset=${offset}`)
          }
        />
      </div>
    </AdminContainer>
  );
}

export const getServerSideProps: GetServerSideProps<ContactIndexProps> =
  withAuth(async (context) => {
    const limit = Number(context.query?.limit ?? 10);
    const offset = Number(context.query?.offset ?? 0);

    const data = await getContacts({
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
  });
