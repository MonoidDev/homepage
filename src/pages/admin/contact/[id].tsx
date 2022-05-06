import React from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Contact, getContactById } from '@/apis/contact';
import { AdminContainer } from '@/components/Layout/AdminContainer';
import styles from '@/pages/admin/index.module.css';
import { withAuth } from '@/utils/withAuth';

interface ContactIdProps {
  data: Contact;
}

export default function ContactId(props: ContactIdProps) {
  const { data } = props;

  dayjs.extend(relativeTime);

  const renderTitle = (title: string) => (
    <h3 className="text-[24px] mb-[1rem] font-bold">{title}</h3>
  );

  const renderInfo = (label: string, value?: React.ReactNode) => (
    <>
      <div className="font-bold">{label}</div>
      <div>{value || '-'}</div>
    </>
  );

  const renderMultilineInfo = (label: string, value: string) => (
    <div className="mb-[0.5rem] col-span-2">
      <div className="font-bold">{label}</div>
      <div className="whitespace-pre-wrap">{value || '-'}</div>
    </div>
  );

  return (
    <AdminContainer>
      <div className="px-[4rem] py-[2rem] font-loose">
        <h2 className="text-[36px] font-loose">{data.company}</h2>

        <div className="text-gray-500">
          {dayjs(data.created_at).format('YYYY/MM/DD HH:mm')}
          {', '}
          <span className="text-gray-600">
            {dayjs(data.created_at).fromNow()}
          </span>
        </div>
        <div className="h-[1rem]" />
        {renderTitle('Details')}

        <div className={styles.recruit}>
          {renderInfo('Name', data.name)}

          {renderInfo(
            'Email',
            <a href={`mailto:${data.email}`} target="_blank">
              {data.email}
            </a>,
          )}

          {renderInfo('Project Type', data.project_type.join(', '))}

          {renderInfo('Budget', data.budget)}
          {renderInfo('Delivery', data.delivery)}
          {renderInfo('Language', data.locale)}
          {renderMultilineInfo('Message', data.message)}
        </div>
      </div>
    </AdminContainer>
  );
}

export const getServerSideProps = withAuth<ContactIdProps>(async (context) => {
  const id = Number(context.params?.id);

  const { contact } = await getContactById(id);

  return {
    props: {
      data: contact,
      theme: 'white',
      title: 'Admin | 合同会社Monoid | G.K. Monoid | Monoid',
      screenHeight: true,
    },
  };
});
