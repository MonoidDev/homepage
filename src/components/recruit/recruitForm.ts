import { useForm } from 'react-hook-form';

import type { SkillItem } from './SkillInput';
import { FileItem } from '@/apis/files';

export const recruitFormDefaultValues = {
  name: '',
  email: '',
  github_id: '',
  website: '',
  language_english: 0.9,
  language_chinese: 0.7,
  language_japanese: 0.5,
  technology_skills: [] as SkillItem[],
  resume_urls: [] as FileItem[],
  education_experience: '',
  work_experience: '',
  cover_letter: '',
};

export type RecruitForm = typeof recruitFormDefaultValues;

export const useRecruitForm = () => {
  const form = useForm({
    defaultValues: recruitFormDefaultValues,
    shouldUnregister: false,
  });

  const { register } = form;

  return {
    ...form,
    registry: {
      name: () => register('name', { required: 'This field is required. ' }),
      email: () => register('email', { required: 'This field is required. ' }),
      github_id: () =>
        register('github_id', {
          required: 'This field is required. ',
        }),
      website: () =>
        register('website', {
          required: 'This field is required. ',
        }),
      education_experience: () =>
        register('education_experience', {
          required: 'This field is required. ',
        }),
      work_experience: () =>
        register('work_experience', {
          required: 'This field is required. ',
        }),
      technology_skills: () =>
        register('technology_skills', {
          validate: (v) =>
            v.length === 0 ? 'Please input at least one skill. ' : true,
        }),
      cover_letter: () => register('cover_letter'),
    },
  };
};

export const educationPlaceholder = `
2015.9 - 2019.6 Monoid University, Bachelor of XX
2019.9 - 2022.6 Monoid University, Master of YY
`.trim();

export const workExperiencePlaceholder = `
2020.1 - 2021.4, XX Internship at Acme Inc.
`.trim();

export const isProgrammer = (name: string) =>
  ['FRONTENDENGINEER', 'BACKENDENGINEER'].includes(name);

export const isDesigner = (name: string) =>
  ['UIUXDESIGNER', 'PRODUCTMANAGER'].includes(name);
