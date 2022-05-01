import React from 'react';

import {
  Contact,
  getContactById,
  mapContactBudgetToLabel,
  mapContactDeliveryToLabel,
} from '@/apis/contact';
import { AdminContainer } from '@/components/Layout/AdminContainer';
import styles from '@/pages/admin/index.module.css';
import { withAuth } from '@/utils/withAuth';

interface ContactIdProps {
  data: Contact;
}

export default function ContactId(props: ContactIdProps) {
  const { data } = props;

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
    <div className="mb-[0.5rem]">
      <div className="font-bold">{label}</div>
      <div className="whitespace-pre-wrap">{value || '-'}</div>
    </div>
  );

  return (
    <AdminContainer>
      <div className="px-[4rem] py-[2rem] font-loose">
        <h2 className="text-[36px] font-loose mb-[1rem]">
          {data.first_name} {data.last_name}
        </h2>

        {renderTitle('Details')}

        <div className={styles.recruit}>
          {renderInfo(
            'Email',
            <a href={`mailto:${data.email}`} target="_blank">
              {data.email}
            </a>,
          )}

          {renderInfo('Project Type', data.project_type)}

          {renderInfo('Budget', mapContactBudgetToLabel(data.budget))}
          {renderInfo('Delivery', mapContactDeliveryToLabel(data.delivery))}

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
