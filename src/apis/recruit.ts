import { useMutation } from 'react-query';

import { invokeHttp } from '@/utils/invokeHttp';

export interface NewRecruit {
  recruit_type: string;
  name: string;
  email: string;
  github_id?: string;
  website?: string;
  language_english: number;
  language_chinese: number;
  language_japanese: number;
  technology_skills: string[];
  education_experience: string;
  work_experience: string;
  cover_letter: string;
  resume_urls: string[];
}

export interface Recruit extends NewRecruit {
  id: string;
}

export const postRecruits = async (body: NewRecruit) => {
  return await invokeHttp<{ recruit: Recruit }, {}, NewRecruit>(
    'post',
    '/recruits',
    undefined,
    body,
  );
};

export const usePostRecruits = () => useMutation(postRecruits);
