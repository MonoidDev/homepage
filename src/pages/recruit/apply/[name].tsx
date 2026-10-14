import { useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { usePostFile } from '@/apis/files';
import { usePostRecruits } from '@/apis/recruit';
import { MutationAlert } from '@/components/MutationAlert';
import { DesktopApplyForm } from '@/components/recruit/DesktopApplyForm';
import { MobileApplyForm } from '@/components/recruit/MobileApplyForm';
import {
  RecruitForm,
  useCandidateStrings,
} from '@/components/recruit/recruitForm';
import { allJobNames } from '@/data/recruit';

export default function Apply() {
  const {
    query: { name },
    push,
  } = useRouter();

  const strings = useCandidateStrings();
  const locked = useRef(false);
  const uploaded = useRef(new WeakMap<File, string>());
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const postRecruits = usePostRecruits();

  const postFiles = usePostFile();

  const onSubmit = async (values: RecruitForm) => {
    if (locked.current) return;
    locked.current = true;
    setSubmitting(true);
    setSubmissionError('');
    postRecruits.reset();
    postFiles.reset();
    try {
      const resume_urls: string[] = [];

      for (const item of values.resume_urls) {
        let url =
          item.url ?? (item.file ? uploaded.current.get(item.file) : undefined);
        if (!url && item.file) {
          url = (await postFiles.mutateAsync(item.file)).url;
          uploaded.current.set(item.file, url);
        }
        if (!url) throw new Error('Missing attachment');
        resume_urls.push(url);
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
        technology_skills: values.technology_skills
          .map((item) => item.value.trim())
          .filter(Boolean),
        resume_urls,
        education_experience: values.education_experience,
        work_experience: values.work_experience,
        cover_letter: values.cover_letter,
      });

      await push('/recruit/success');
    } catch {
      setSubmissionError(strings.failed);
    } finally {
      locked.current = false;
      setSubmitting(false);
    }
  };

  return (
    <>
      <MutationAlert mutation={postRecruits} hideError />
      <MutationAlert mutation={postFiles} hideError />
      <DesktopApplyForm
        name={name as string}
        onSubmit={onSubmit}
        submitting={submitting}
        submissionError={submissionError}
      />
      <MobileApplyForm
        name={name as string}
        onSubmit={onSubmit}
        submitting={submitting}
        submissionError={submissionError}
      />
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
