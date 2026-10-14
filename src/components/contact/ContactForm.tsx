import React, { useEffect, useId, useRef, useState } from 'react';

import clsx from 'clsx';

import { ContactInput } from './ContactInput';
import { ContactMessageInput } from './ContactMessageInput';
import { ContactProjectTypeInput } from './ContactProjectTypeInput';
import { useContactForm, useContactStrings } from './contactUtils';
import { SnappedScrollInput } from './SnappedScrollInput';
import {
  mapContactBudgetToLabel,
  mapContactDeliveryToLabel,
  usePostContacts,
} from '@/apis/contact';
import { useLocale } from '@/utils/useLocale';

export interface ContactFormProps {
  open?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  className?: string;
  successVisual?: React.ReactNode;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onClose,
  onSuccess,
  className,
  successVisual,
}) => {
  const strings = useContactStrings();
  const locale = useLocale();
  const titleId = useId();
  const Heading = onClose ? 'h2' : 'h1';
  const mutation = usePostContacts();
  const inFlight = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'invalid' | 'failed' | 'success' | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useContactForm();
  useEffect(() => {
    if (status) statusRef.current?.focus();
  }, [status]);

  return (
    <form
      noValidate
      aria-labelledby={titleId}
      className={clsx(
        'bg-white text-black p-[48px] sm:p-0 font-loose relative',
        className,
      )}
      onSubmit={handleSubmit(
        async (values) => {
          if (inFlight.current) return;
          inFlight.current = true;
          setStatus(null);
          try {
            await mutation.mutateAsync({
              ...values,
              company: values.company.trim(),
              name: values.name.trim(),
              email: values.email.trim(),
              message: values.message.trim(),
              budget: mapContactBudgetToLabel(values.budget, '-'),
              delivery: mapContactDeliveryToLabel(values.delivery, '-'),
              locale,
            });
            reset();
            setStatus('success');
            onSuccess?.();
          } catch {
            setStatus('failed');
          } finally {
            inFlight.current = false;
          }
        },
        () => {
          setStatus('invalid');
          requestAnimationFrame(() => statusRef.current?.focus());
        },
      )}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label={strings.close}
          className="absolute top-3 right-5 text-[32px] leading-none p-2"
        >
          ×
        </button>
      )}
      <Heading
        id={titleId}
        className="text-[40px] sm:text-[28px] font-bold leading-tight mb-2 pr-6"
      >
        {strings.contactTitle}
      </Heading>
      <p className="mb-5 text-sm">{strings.requiredHint}</p>
      {status && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role={status === 'success' ? 'status' : 'alert'}
          className="border-2 border-black rounded-xl p-4 mb-5"
        >
          {status === 'success'
            ? strings.success
            : status === 'failed'
              ? strings.failed
              : strings.review}
          {status === 'success' && successVisual}
          {status === 'failed' && (
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="ml-3 underline font-bold"
            >
              {strings.retry}
            </button>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-6 items-stretch">
        <div className="grid grid-cols-2 gap-4 content-start">
          <ContactInput
            label={strings.company}
            name="company"
            register={register}
            error={errors.company}
          />
          <ContactInput
            label={strings.name}
            name="name"
            register={register}
            error={errors.name}
          />
          <ContactInput
            label={strings.emailAddress}
            name="email"
            register={register}
            error={errors.email}
            className="col-span-2"
          />
          <ContactProjectTypeInput control={control} />
          <div className="col-span-2">
            <SnappedScrollInput
              name="budget"
              label={strings.budget}
              control={control}
              max={10}
              mapValueToLabel={(v) =>
                mapContactBudgetToLabel(v, strings.selectValue, locale)
              }
            />
          </div>
          <div className="col-span-2">
            <SnappedScrollInput
              name="delivery"
              label={strings.delivery}
              control={control}
              max={6}
              mapValueToLabel={(v) =>
                mapContactDeliveryToLabel(v, strings.selectValue, locale)
              }
            />
          </div>
        </div>
        <ContactMessageInput
          error={errors.message}
          pending={mutation.isLoading}
          rows={7}
          {...register('message', {
            validate: (v) => !!v.trim() || strings.required,
          })}
        />
      </div>
    </form>
  );
};
