import { ReactNode, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import { GoBackTriangleTitle } from './GoBackTriangleTitle';
import styles from './index.module.css';
import { MobileFileInput } from './MobileFileInput';
import {
  isDesigner,
  isProgrammer,
  RecruitForm,
  requiresTechSkills,
  useCandidateStrings,
  useRecruitForm,
} from './recruitForm';
import { ScrollInput } from './ScrollInput';
import { SkillInput } from './SkillInput';
import { TextInput } from './TextInput';

export interface MobileApplyFormProps {
  name: string;
  submitting?: boolean;
  submissionError?: string;
  onSubmit: (values: RecruitForm) => Promise<void>;
}

export const MobileApplyForm: React.VFC<MobileApplyFormProps> = (props) => {
  const { name, onSubmit, submitting, submissionError } = props;
  const strings = useCandidateStrings();

  const programmer = isProgrammer(name as string);
  const designer = isDesigner(name as string);

  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);

  const router = useRouter();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previousStep = useRef(step);
  const focusingError = useRef(false);

  useEffect(() => {
    scrollContainerRef.current?.scroll(0, 0);
    if (previousStep.current !== step && !focusingError.current) {
      scrollContainerRef.current
        ?.querySelector(`[data-step="${step}"]`)
        ?.querySelector<HTMLElement>('h2, input, textarea, button')
        ?.focus({ preventScroll: true });
    }
    previousStep.current = step;
  }, [step]);

  const { control, trigger, setFocus, handleSubmit, formState, registry } =
    useRecruitForm();

  const next = async () => {
    const fields: (keyof RecruitForm)[] =
      step === 1
        ? [
            'name',
            'email',
            ...(programmer ? ['github_id' as const] : []),
            ...(designer ? ['website' as const] : []),
          ]
        : step === 2
          ? [
              'education_experience',
              'work_experience',
              ...(requiresTechSkills(name)
                ? ['technology_skills' as const]
                : []),
            ]
          : [];
    if (await trigger(fields, { shouldFocus: true })) {
      setStep(step + 1);
      setMaxStep(Math.max(maxStep, step + 1));
    }
  };
  const invalid = (errors: typeof formState.errors) => {
    const first = Object.keys(errors)[0] as keyof RecruitForm;
    const target = ['name', 'email', 'github_id', 'website'].includes(first)
      ? 1
      : [
            'education_experience',
            'technology_skills',
            'work_experience',
          ].includes(first)
        ? 2
        : first === 'resume_urls'
          ? 3
          : 4;
    focusingError.current = true;
    setStep(target);
    requestAnimationFrame(() => {
      setFocus(first);
      focusingError.current = false;
    });
  };

  const renderTitle = (title: string) => (
    <h2 tabIndex={-1} className="font-loose font-bold text-[25px]">
      {title}
    </h2>
  );

  const renderStepper = () => (
    <nav
      aria-label={strings.application}
      className="flex gap-x-[5px] bg-white px-4"
    >
      {new Array(4).fill(1).map((_, i) => (
        <button
          type="button"
          aria-label={`${strings.step} ${i + 1}`}
          aria-current={step === i + 1 ? 'step' : undefined}
          disabled={i >= maxStep || submitting}
          key={i}
          className={clsx(
            'flex-1 h-[30px] border-b-[5px] border-black text-[13px]',
            i >= maxStep && 'border-opacity-30',
          )}
          onClick={() => {
            if (i < maxStep) setStep(i + 1);
          }}
        >
          {i + 1}
        </button>
      ))}
    </nav>
  );

  const renderNext = () => (
    <div className="bg-white min-h-[85px] shrink-0 flex justify-center items-center">
      {step < 4 ? (
        <button
          key="next"
          type="button"
          className={styles.nextMobiltTitle}
          disabled={submitting}
          onClick={(event) => {
            event.preventDefault();
            void next();
          }}
        >
          {strings.next}
        </button>
      ) : (
        <button
          key="submit"
          type="submit"
          className={styles.nextMobiltTitle}
          disabled={submitting || formState.isSubmitting}
        >
          {submitting ? strings.submitting : strings.submit}
        </button>
      )}
    </div>
  );

  const renderStep1 = () => (
    <>
      {renderTitle(strings.contact)}
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

      {renderTitle(strings.languages)}
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
    </>
  );

  const renderStep2 = () => (
    <>
      {renderTitle(strings.experiences)}
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
    </>
  );

  const renderStep3 = () => (
    <>
      {renderTitle(strings.resume)}
      <MobileFileInput name="resume_urls" control={control as any} />
    </>
  );

  const renderStep4 = () => (
    <>
      <TextInput
        label={`${strings.cover} (${strings.optional})`}
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
    return (
      <div
        data-step={selfStep}
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
    <main className=">sm:hidden flex-1 shrink min-h-0 flex flex-col">
      <h1 className="sr-only">{strings.application}</h1>
      <div className="fixed top-0 left-0 z-20 flex flex-col">
        <GoBackTriangleTitle
          onClick={() => {
            if (step === 1) {
              if (confirm(strings.discard)) {
                router.push(`/recruit/${name}`);
              }
            } else {
              setStep(step - 1);
            }
          }}
        >
          {step === 1 ? strings.exit : strings.back}
        </GoBackTriangleTitle>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit(async (values) => {
          if (step < 4) {
            await next();
          } else {
            await onSubmit(values);
          }
        }, invalid)}
        aria-busy={submitting}
        className="flex flex-col flex-1 min-h-0"
      >
        <div
          role="region"
          aria-label={`${strings.step} ${step}`}
          tabIndex={0}
          ref={scrollContainerRef}
          className={clsx(
            'flex-1 shrink min-h-0 overflow-auto',
            'flex flex-col p-[2rem] bg-black bg-opacity-[0.15] rounded-t-[2rem]',
          )}
        >
          <p className="font-loose text-[13px] mb-4">{strings.requirements}</p>
          <fieldset
            disabled={submitting || formState.isSubmitting}
            className="min-w-0"
          >
            <legend className="sr-only">
              {strings.step} {step}
            </legend>
            {stepContainer(1, renderStep1)}
            {stepContainer(2, renderStep2)}
            {stepContainer(3, renderStep3)}
            {stepContainer(4, renderStep4)}
          </fieldset>
          {submissionError && (
            <p role="alert" className="font-loose mt-4">
              {submissionError}
            </p>
          )}
        </div>

        {renderStepper()}
        {renderNext()}
      </form>
    </main>
  );
};
