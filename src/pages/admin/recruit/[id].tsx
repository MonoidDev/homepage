import React from 'react';

import styles from './index.module.css';
import { getRecruitById, Recruit } from '@/apis/recruit';
import { AdminContainer } from '@/components/Layout/AdminContainer';
import { withAuth } from '@/utils/withAuth';

interface RecruitIdProps {
  data: Recruit;
}

export default function RecruitId(props: RecruitIdProps) {
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
        <h2 className="text-[36px] font-loose mb-[1rem]">{data.name}</h2>

        {renderTitle('Contact Details')}

        <div className={styles.recruit}>
          {renderInfo('Type', data.recruit_type)}
          {renderInfo(
            'Email',
            <a href={`mailto:${data.email}`} target="_blank">
              {data.email}
            </a>,
          )}
          {renderInfo(
            'Github ID',
            <a href={`https://github.com/${data.github_id}`} target="_blank">
              {data.github_id}
            </a>,
          )}
        </div>

        {renderTitle('Language Skills')}

        <div className={styles.recruit}>
          {renderInfo('English', data.language_english)}
          {renderInfo('Chinese', data.language_chinese)}
          {renderInfo('Japanese', data.language_japanese)}
        </div>

        {renderTitle('Experiences')}
        {renderMultilineInfo('Education', data.education_experience)}
        {renderMultilineInfo(
          'Technology Skills',
          data.technology_skills.join(' / '),
        )}
        {renderMultilineInfo('Work Exprience', data.work_experience)}
        <div className="h-[2rem]" />

        {renderTitle('Resume etc.')}
        <div className="flex flex-col">
          {data.resume_urls.map((resume, i) => (
            <a className="text-green-500" key={i} href={resume} target="_blank">
              {resume}
            </a>
          ))}
          {data.resume_urls.length === 0 && (
            <span className="text-gray-600">Not uploaded. </span>
          )}
        </div>
        <div className="h-[2rem]" />

        {renderTitle('Cover Letter')}
        <div className="whitespace-pre-wrap">{data.cover_letter || '-'}</div>
      </div>
    </AdminContainer>
  );
}

export const getServerSideProps = withAuth<RecruitIdProps>(async (context) => {
  const id = Number(context.params?.id);

  const { recruit } = await getRecruitById(id);

  return {
    props: {
      data: recruit,
      theme: 'white',
      title: 'Admin | 合同会社Monoid | G.K. Monoid | Monoid',
      screenHeight: true,
    },
  };
});
