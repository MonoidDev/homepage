import clsx from 'clsx';
import Link from 'next/link';

import styles from './index.module.css';
import {
  educationPlaceholder,
  isDesigner,
  isProgrammer,
  RecruitForm,
  useRecruitForm,
  workExperiencePlaceholder,
} from './recruitForm';
import LeftTriangleSvg from '@/assets/images/LeftTriangle.svg';
import RightTriangleOutlineSvg from '@/assets/images/RightTriangleOutline.svg';
import { FileInput } from '@/components/recruit/FileInput';
import { ScrollInput } from '@/components/recruit/ScrollInput';
import { SkillInput } from '@/components/recruit/SkillInput';
import { TextInput } from '@/components/recruit/TextInput';

export interface DesktopApplyFormProps {
  name: string;
  onSubmit: (values: RecruitForm) => Promise<void>;
}

export const DesktopApplyForm: React.VFC<DesktopApplyFormProps> = (props) => {
  const { name, onSubmit } = props;

  const programmer = isProgrammer(name as string);
  const designer = isDesigner(name as string);

  const { control, handleSubmit, formState, registry } = useRecruitForm();

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

      <span className={styles.nextTitle} onClick={handleSubmit(onSubmit)}>
        SUBMIT
      </span>

      <RightTriangleOutlineSvg
        onClick={handleSubmit(onSubmit)}
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
            {...registry.name()}
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="joy@monoidtech.com"
            error={formState.errors.email}
            {...registry.email()}
          />
          {programmer && (
            <TextInput
              label="Github ID"
              placeholder="joymonoid"
              error={formState.errors.github_id}
              {...registry.github_id()}
            />
          )}
          {designer && (
            <TextInput
              label="Website"
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
            {...registry.education_experience()}
          />

          <SkillInput
            label="Technology Skills"
            control={control}
            error={formState.errors.technology_skills as any}
            {...registry.technology_skills()}
          />

          <TextInput
            label="Work Experience"
            multiline
            placeholder={workExperiencePlaceholder}
            error={formState.errors.work_experience}
            {...registry.work_experience()}
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
            <TextInput
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
    <div className="sm:hidden flex-1 shrink flex min-h-0 flex-col pt-[28px] mx-[128px] overflow-hidden">
      {renderHeader()}
      {renderContent()}
    </div>
  );
};
