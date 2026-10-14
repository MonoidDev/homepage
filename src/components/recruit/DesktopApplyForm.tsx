import { useId } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import styles from './index.module.css';
import {
  isDesigner,
  isProgrammer,
  RecruitForm,
  requiresTechSkills,
  useCandidateStrings,
  useRecruitForm,
} from './recruitForm';
import LeftTriangleSvg from '@/assets/images/LeftTriangle.svg';
import RightTriangleOutlineSvg from '@/assets/images/RightTriangleOutline.svg';
import { FileInput } from '@/components/recruit/FileInput';
import { ScrollInput } from '@/components/recruit/ScrollInput';
import { SkillInput } from '@/components/recruit/SkillInput';
import { TextInput } from '@/components/recruit/TextInput';

export interface DesktopApplyFormProps {
  name: string;
  submitting?: boolean;
  submissionError?: string;
  onSubmit: (values: RecruitForm) => Promise<void>;
}

export const DesktopApplyForm: React.VFC<DesktopApplyFormProps> = (props) => {
  const { name, onSubmit, submitting, submissionError } = props;
  const strings = useCandidateStrings();
  const formId = useId();

  const programmer = isProgrammer(name as string);
  const designer = isDesigner(name as string);

  const { control, handleSubmit, formState, registry } = useRecruitForm();

  const renderHeader = () => (
    <div className="flex gap-x-[20px] mb-[1rem] font-loose">
      <Link href={`/recruit/${name}`} aria-label={strings.back}>
        <LeftTriangleSvg className="cursor-pointer" />
      </Link>
      <h1 className="text-[52px] md:text-[36px] font-bold leading-none mt-[5px]">
        {strings.application}
      </h1>

      <div className="flex-1" />

      <button
        type="submit"
        form={formId}
        disabled={submitting || formState.isSubmitting}
        className={styles.headerAction}
      >
        <span className={styles.nextTitle}>
          {submitting ? strings.submitting : strings.submit}
        </span>
        <RightTriangleOutlineSvg
          aria-hidden="true"
          className="w-[55px] h-[55px]"
        />
      </button>
    </div>
  );

  const renderContactDetails = () => {
    return (
      <div>
        <h2 className={clsx(styles.formSectionTitle, 'mb-[2rem]')}>
          {strings.contact}
        </h2>
        <div className="flex flex-col gap-y-[1.5rem]">
          <TextInput
            label={`${strings.name} *`}
            placeholder="Joy Monoid"
            error={formState.errors.name}
            {...registry.name()}
          />
          <TextInput
            label={`${strings.email} *`}
            type="email"
            placeholder="joy@monoidtech.com"
            error={formState.errors.email}
            {...registry.email()}
          />
          {programmer && (
            <TextInput
              label={`${strings.github} *`}
              placeholder="joymonoid"
              error={formState.errors.github_id}
              {...registry.github_id()}
            />
          )}
          {designer && (
            <TextInput
              label={`${strings.website} *`}
              placeholder="https://monoid.co.jp"
              error={formState.errors.website}
              {...registry.website()}
            />
          )}
        </div>
      </div>
    );
  };

  const renderLanguageSkills = () => {
    return (
      <div>
        <h2 className={clsx(styles.formSectionTitle, 'mb-[2rem]')}>
          {strings.languages}
        </h2>
        <div className="flex flex-col gap-y-[1.5rem]">
          <div className="flex flex-col gap-y-[30px]">
            <ScrollInput
              label={strings.english}
              name="language_english"
              control={control as any}
            />
            <ScrollInput
              label={strings.chinese}
              name="language_chinese"
              control={control as any}
            />
            <ScrollInput
              label={strings.japanese}
              name="language_japanese"
              control={control as any}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderExperiences = () => {
    return (
      <div className="flex flex-col mt-[4rem]">
        <h2 className={clsx(styles.formSectionTitle, 'mb-[2rem]')}>
          {strings.experiences}
        </h2>
        <div className="flex flex-col gap-y-[30px]">
          <TextInput
            label={`${strings.education} *`}
            multiline
            placeholder={strings.educationExample}
            error={formState.errors.education_experience}
            {...registry.education_experience()}
          />
          {requiresTechSkills(name) && (
            <SkillInput
              label={`${strings.skills} *`}
              control={control as any}
              error={formState.errors.technology_skills as any}
              {...registry.technology_skills()}
            />
          )}

          <TextInput
            label={`${strings.work} *`}
            multiline
            placeholder={strings.workExample}
            error={formState.errors.work_experience}
            {...registry.work_experience()}
          />

          <div>
            <h2 className={clsx(styles.formSectionTitle, 'mb-[1rem]')}>
              {strings.resume} ({strings.optional})
            </h2>
            <FileInput name="resume_urls" control={control as any} />
          </div>

          <div>
            <TextInput
              label={`${strings.cover} (${strings.optional})`}
              multiline
              error={formState.errors.cover_letter}
              {...registry.cover_letter()}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => (
    <div
      role="region"
      aria-label={strings.application}
      tabIndex={0}
      className="shrink min-h-0 overflow-y-auto pb-[4rem] px-1"
    >
      <form
        id={formId}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-busy={submitting}
        className="bg-black bg-opacity-20 px-[50px] md:px-[28px] py-[44px] rounded-[45px]"
      >
        <p className="font-loose text-[15px] mb-8">{strings.requirements}</p>
        <fieldset
          disabled={submitting || formState.isSubmitting}
          className="min-w-0"
        >
          <div className="flex">
            <div className="flex-[2_2_0%] min-w-0">
              {renderContactDetails()}
            </div>
            <div className="w-[1px] bg-[#B3B3B3] mx-[35px] md:mx-[22px]" />
            <div className="flex-[3_3_0%] min-w-0">
              {renderLanguageSkills()}
            </div>
          </div>
          {renderExperiences()}
        </fieldset>
        {submissionError && (
          <p role="alert" className="mt-6 font-loose">
            {submissionError}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting || formState.isSubmitting}
          className={clsx(styles.pill, 'mt-8')}
        >
          {submitting ? strings.submitting : strings.submit}
        </button>
      </form>
    </div>
  );

  return (
    <main className="sm:hidden flex-1 shrink flex min-h-0 flex-col pt-[28px] mx-[128px] md:mx-[48px] overflow-hidden">
      {renderHeader()}
      {renderContent()}
    </main>
  );
};
