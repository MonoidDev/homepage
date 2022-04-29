import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import styles from '../recruit.module.css';
import { usePostRecruits } from '@/apis/recruit';
import LeftTriangleSvg from '@/assets/images/LeftTriangle.svg';
import RightTriangleOutlineSvg from '@/assets/images/RightTriangleOutline.svg';
import { MutationAlert } from '@/components/MutationAlert';
import { FileInput, FileItem } from '@/components/recruit/FileInput';
import { ScrollInput } from '@/components/recruit/ScrollInput';
import { SkillInput, SkillItem } from '@/components/recruit/SkillInput';
import { TextInput } from '@/components/recruit/TextInput';
import { allJobNames } from '@/data/recruit';

const educationPlaceholder = `
2015.9 - 2019.6 Monoid University, Bachelor of XX
2019.9 - 2022.6 Monoid University, Master of YY
`.trim();

const workExperiencePlaceholder = `
2020.1 - 2021.4, XX Internship at Acme Inc.
`.trim();

export default function Apply() {
  const {
    query: { name },
    push,
  } = useRouter();

  const postRecruits = usePostRecruits();

  const isProgrammer = ['FRONTEND ENGINEER', 'BACKEND ENGINEER'].includes(
    name as string,
  );

  const isDesigner = ['UIUX DESIGNER', 'PRODUCT MANAGER'].includes(
    name as string,
  );

  const defaultValues = {
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

  const { control, register, handleSubmit, formState } = useForm({
    defaultValues,
  });

  const onSubmit = handleSubmit(async (values: typeof defaultValues) => {
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
      resume_urls: values.resume_urls.map((item) => item.url!),
      education_experience: values.education_experience,
      work_experience: values.work_experience,
      cover_letter: values.cover_letter,
    });

    alert('Thank you for your application!');
    push('/recruit');
  });

  const renderHeader = () => (
    <div className="flex gap-x-[40px] mb-[1rem] font-loose">
      <Link href={`/recruit/${name}`}>
        <a>
          <LeftTriangleSvg className="cursor-pointer" />
        </a>
      </Link>
      <span className="text-[80px] font-bold leading-none mt-[5px]">
        APPLICATION
      </span>

      <div className="flex-1" />

      <span className={styles.nextTitle} onClick={onSubmit}>
        SUBMIT
      </span>

      <RightTriangleOutlineSvg
        onClick={onSubmit}
        className="cursor-pointer mt-3"
      />
    </div>
  );

  const renderContactDetails = () => {
    return (
      <div>
        <h3 className={clsx(styles.formSectionTitle, 'mb-[2rem]')}>
          Contact Details
        </h3>
        <div className="flex flex-col gap-y-[1.5rem]">
          <TextInput
            label="Name"
            placeholder="Joy Monoid"
            error={formState.errors.name}
            {...register('name', { required: 'This field is required. ' })}
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="Joy@monoidtech.com"
            error={formState.errors.email}
            {...register('email', { required: 'This field is required. ' })}
          />
          {isProgrammer && (
            <TextInput
              label="Github ID"
              placeholder="joymonoid"
              error={formState.errors.github_id}
              {...register('github_id', {
                required: 'This field is required. ',
              })}
            />
          )}
          {isDesigner && (
            <TextInput
              label="Website"
              placeholder="https://monoid.co.jp"
              error={formState.errors.website}
              {...register('website', {
                required: 'This field is required. ',
              })}
            />
          )}
        </div>
      </div>
    );
  };

  const renderLanguageSkills = () => {
    return (
      <div>
        <h3 className={clsx(styles.formSectionTitle, 'mb-[2rem]')}>
          Language Skills
        </h3>
        <div className="flex flex-col gap-y-[1.5rem]">
          <div className="pl-[160px] flex justify-between text-[15px] font-loose font-bold opacity-40 mb-[1rem]">
            <div>Beginner</div>
            <div>Intermediate</div>
            <div>Advanced</div>
            <div>Native</div>
          </div>

          <div className="flex flex-col gap-y-[75px]">
            <ScrollInput
              label="English"
              name="language_english"
              control={control}
            />
            <ScrollInput
              label="Chinese"
              name="language_chinese"
              control={control}
            />
            <ScrollInput
              label="Japanese"
              name="language_japanese"
              control={control}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderExperiences = () => {
    return (
      <div className="flex flex-col mt-[4rem]">
        <h3 className={clsx(styles.formSectionTitle, 'mb-[2rem]')}>
          Experiences
        </h3>
        <div className="flex flex-col gap-y-[30px]">
          <TextInput
            label="Education"
            multiline
            placeholder={educationPlaceholder}
            error={formState.errors.education_experience}
            {...register('education_experience', {
              required: 'This field is required. ',
            })}
          />

          <SkillInput
            label="Technology Skills"
            control={control}
            error={formState.errors.technology_skills as any}
            {...register('technology_skills', {
              validate: (v) =>
                v.length === 0 ? 'Please input at least one skill. ' : true,
            })}
          />

          <TextInput
            label="Work Experience"
            multiline
            placeholder={workExperiencePlaceholder}
            error={formState.errors.work_experience}
            {...register('work_experience', {
              required: 'This field is required. ',
            })}
          />

          <div>
            <h3 className={clsx(styles.formSectionTitle, 'mb-[1rem]')}>
              Resume etc.
            </h3>
            <FileInput name="resume_urls" control={control} />
          </div>

          <div>
            <h3 className={clsx(styles.formSectionTitle, 'mb-[1rem]')}>
              Cover letter
            </h3>
            <TextInput multiline />
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => (
    <div className="shrink min-h-0 overflow-y-auto pb-[4rem]">
      <form className="bg-black bg-opacity-20 px-[50px] py-[66px] rounded-[45px]">
        <div className="flex">
          <div className="flex-[2_2_0%]">{renderContactDetails()}</div>
          <div className="w-[1px] bg-[#B3B3B3] mx-[50px]" />
          <div className="flex-[3_3_0%]">{renderLanguageSkills()}</div>
        </div>
        {renderExperiences()}
      </form>
    </div>
  );

  return (
    <div className="flex-1 shrink flex min-h-0 flex-col pt-[28px] mx-[128px] overflow-hidden">
      <MutationAlert mutation={postRecruits} />
      {renderHeader()}
      {renderContent()}
    </div>
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
    },
  };
}
