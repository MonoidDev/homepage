import { ReactNode, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import { GoBackTriangleTitle } from './GoBackTriangleTitle';
import styles from './index.module.css';
import { MobileFileInput } from './MobileFileInput';
import {
  educationPlaceholder,
  isDesigner,
  isProgrammer,
  RecruitForm,
  useRecruitForm,
} from './recruitForm';
import { ScrollInput } from './ScrollInput';
import { SkillInput } from './SkillInput';
import { TextInput } from './TextInput';

export interface MobileApplyFormProps {
  name: string;
  onSubmit: (values: RecruitForm) => Promise<void>;
}

export const MobileApplyForm: React.VFC<MobileApplyFormProps> = (props) => {
  const { name, onSubmit } = props;

  const programmer = isProgrammer(name as string);
  const designer = isDesigner(name as string);

  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);

  const router = useRouter();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollContainerRef.current?.scroll(0, 0);
  }, [step]);

  const { control, reset, handleSubmit, formState, registry } =
    useRecruitForm();

  const validateOrJump = async (): Promise<RecruitForm> => {
    let result: RecruitForm | undefined;
    await handleSubmit(
      (v) => {
        result = v;
      },
      (errors) => {
        if (errors.name || errors.email || errors.website || errors.github_id) {
          setStep(1);
        } else if (
          errors.education_experience ||
          errors.technology_skills ||
          errors.work_experience
        ) {
          setStep(2);
        } else if (errors.resume_urls) {
          setStep(3);
        } else if (errors.cover_letter) {
          setStep(4);
        }
        throw new Error('Invalid form');
      },
    )();

    return result!;
  };

  const renderTitle = (title: string) => (
    <h3 className="font-loose font-bold text-[25px]">{title}</h3>
  );

  const renderStepper = () => (
    <div className="h-[5px] flex gap-x-[5px]">
      {new Array(4).fill(1).map((_, i) => (
        <div
          key={i}
          className={clsx('flex-1 bg-black', i >= maxStep && 'bg-opacity-30')}
          onClick={() => {
            if (i < maxStep) setStep(i + 1);
          }}
        />
      ))}
    </div>
  );

  const renderNext = () => {
    return (
      <div className="bg-white h-[100px] shrink-0 flex justify-center items-center">
        <button
          className={styles.nextMobiltTitle}
          onClick={async () => {
            if (step <= 3) {
              await validateOrJump();

              setStep(step + 1);
              if (step >= maxStep) {
                setMaxStep(step + 1);
              }

              reset(undefined, { keepValues: true });
            } else if (confirm('Are you sure with your submission?')) {
              await validateOrJump();
              handleSubmit(onSubmit)();
            }
          }}
        >
          {step <= 3 ? 'NEXT' : 'SUBMIT'}
        </button>
      </div>
    );
  };

  const renderStep1 = () => (
    <>
      {renderTitle('Contact Details')}
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

      {renderTitle('Language Skills')}
      <ScrollInput label="English" name="language_english" control={control} />
      <ScrollInput label="Chinese" name="language_chinese" control={control} />
      <ScrollInput
        label="Japanese"
        name="language_japanese"
        control={control}
      />
    </>
  );

  const renderStep2 = () => (
    <>
      {renderTitle('Experiences')}
      <TextInput
        label="Education"
        multiline
        placeholder={educationPlaceholder}
        error={formState.errors.education_experience}
        {...registry.education_experience()}
      />
      {programmer && (
        <SkillInput
          label="Technology Skills"
          control={control}
          error={formState.errors.technology_skills as any}
          {...registry.technology_skills()}
        />
      )}

      <TextInput
        label="Work Experience"
        multiline
        placeholder={educationPlaceholder}
        error={formState.errors.work_experience}
        {...registry.work_experience()}
      />
    </>
  );

  const renderStep3 = () => (
    <>
      {renderTitle('Resume')}
      <MobileFileInput name="resume_urls" control={control} />
    </>
  );

  const renderStep4 = () => (
    <>
      {renderTitle('Cover letter (optional)')}
      <TextInput
        multiline
        error={formState.errors.cover_letter}
        {...{
          rows: 15,
        }}
        {...registry.cover_letter()}
      />
    </>
  );

  const stepContainer = (selfStep: number, renderer: () => ReactNode) => {
    if (selfStep > maxStep) return null;

    return (
      <div
        className={clsx(
          'flex flex-col gap-y-[1rem]',
          selfStep !== step && 'hidden',
        )}
      >
        {renderer()}
      </div>
    );
  };

  return (
    <div className=">sm:hidden flex-1 shrink min-h-0 flex flex-col">
      <div className="fixed top-0 left-0 flex flex-col">
        <GoBackTriangleTitle
          onClick={() => {
            if (step === 1) {
              if (confirm('Do you want to discard your form?')) {
                router.push(`/recruit/${name}`);
              }
            } else {
              setStep(step - 1);
            }
          }}
        >
          {step === 1 ? 'EXIT' : 'BACK'}
        </GoBackTriangleTitle>
      </div>

      <div
        ref={scrollContainerRef}
        className={clsx(
          'flex-1 shrink min-h-0 overflow-auto',
          'flex flex-col p-[2rem] bg-black bg-opacity-[0.15] rounded-t-[2rem]',
        )}
      >
        {stepContainer(1, renderStep1)}
        {stepContainer(2, renderStep2)}
        {stepContainer(3, renderStep3)}
        {stepContainer(4, renderStep4)}
      </div>

      {renderStepper()}
      {renderNext()}
    </div>
  );
};
