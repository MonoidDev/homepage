import { useRouter } from 'next/router';

import { usePostFile } from '@/apis/files';
import { usePostRecruits } from '@/apis/recruit';
import { MutationAlert } from '@/components/MutationAlert';
import { DesktopApplyForm } from '@/components/recruit/DesktopApplyForm';
import { MobileApplyForm } from '@/components/recruit/MobileApplyForm';
import { RecruitForm } from '@/components/recruit/recruitForm';
import { allJobNames } from '@/data/recruit';

export default function Apply() {
  const {
    query: { name },
    push,
  } = useRouter();

  const postRecruits = usePostRecruits();

  const postFiles = usePostFile();

  const onSubmit = async (values: RecruitForm) => {
    const resume_urls: string[] = [];

    for (const { file } of values.resume_urls) {
      const { url } = await postFiles.mutateAsync(file!);
      resume_urls.push(new URL(url).href); // Encode URL
    }

    await postRecruits.mutateAsync({
      recruit_type: name as string,
      name: values.name,
      email: values.email,
      github_id: values.github_id,
      website: values.website,
      language_english: Math.round(values.language_english * 100),
      language_chinese: Math.round(values.language_chinese * 100),
      language_japanese: Math.round(values.language_japanese * 100),
      technology_skills: values.technology_skills.map((item) => item.value),
      resume_urls,
      education_experience: values.education_experience,
      work_experience: values.work_experience,
      cover_letter: values.cover_letter,
    });

    push('/recruit/success');
  };

  return (
    <>
      <MutationAlert mutation={postRecruits} />
      <MutationAlert mutation={postFiles} />
      <DesktopApplyForm name={name as string} onSubmit={onSubmit} />
      <MobileApplyForm name={name as string} onSubmit={onSubmit} />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: ['en-US', 'ja-JP', 'zh-CN']
      .map((locale) =>
        allJobNames.map((name) => ({ params: { name }, locale })),
      )
      .flat(),
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'white',
      title: 'Application | 合同会社Monoid | G.K. Monoid | Monoid',
      screenHeight: true,
      hideLogo: 'mobile',
    },
  };
}
