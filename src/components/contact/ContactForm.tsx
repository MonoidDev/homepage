import React, { useEffect } from 'react';

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
import ContactClose from '@/assets/images/ContactClose.svg';
import { useAriaLabelStrings } from '@/data/ariaLabel';
import { useLocale } from '@/utils/useLocale';

export interface ContactFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = React.memo((props) => {
  const { open, onClose, onSuccess, className } = props;

  const strings = useContactStrings();
  const ariaLabelStrings = useAriaLabelStrings();
  const postContacts = usePostContacts();

  const locale = useLocale();

  const {
    register,
    handleSubmit,
    trigger,
    control,
    reset,
    formState: { errors },
  } = useContactForm();

  useEffect(() => {
    trigger();
  }, [open]);

  const renderLeftForm = () => {
    return (
      <div
        className={clsx('grid grid-cols-2 gap-x-4 gap-y-4')}
        style={{ gridAutoRows: 'min-content' }}
      >
        <ContactInput
          label={strings.company}
          name="company"
          register={register}
          error={errors.company}
          required
        />

        <ContactInput
          label={strings.name}
          name="name"
          register={register}
          error={errors.name}
          required
        />

        <ContactInput
          label={strings.emailAddress}
          name="email"
          register={register}
          error={errors.email}
          className="col-span-2"
          required
        />

        <ContactProjectTypeInput control={control} />

        <div className="col-span-2">
          <SnappedScrollInput
            name="budget"
            label={strings.budget}
            control={control as any}
            unit={1 / 15}
            mapValueToLabel={(v) => mapContactBudgetToLabel(v, strings.budget)}
          />
        </div>

        <div className="col-span-2">
          <SnappedScrollInput
            name="delivery"
            label={strings.delivery}
            control={control as any}
            unit={1 / 9}
            mapValueToLabel={(v) =>
              mapContactDeliveryToLabel(v, strings.delivery)
            }
          />
        </div>
      </div>
    );
  };

  const renderRightForm = () => {
    return (
      <ContactMessageInput
        error={errors.message}
        {...register('message', { required: true })}
      />
    );
  };

  return (
    <form
      className={clsx(
        'w-[1000px] h-[600px] bg-white px-[80px] pt-[45px] pb-[70px] flex flex-col relative rounded-[10px] border border-black',
        className,
      )}
      onSubmit={handleSubmit(async (values) => {
        onSuccess();
        await postContacts.mutateAsync({
          company: values.company,
          name: values.name,
          email: values.email,
          project_type: values.project_type,
          budget: mapContactBudgetToLabel(values.budget, '-'),
          delivery: mapContactDeliveryToLabel(values.delivery, '-'),
          message: values.message,
          locale,
        });
        reset();
      })}
      // onClick={onSuccess}
    >
      <button aria-label={ariaLabelStrings.close} onClick={() => onClose()}>
        <ContactClose className="absolute right-[30px] top-[30px]" />
      </button>

      <h2 className="text-[40px] font-bold">{strings.contactTitle}</h2>

      <div className="flex-1 grid grid-cols-2 gap-x-8">
        {renderLeftForm()}
        {renderRightForm()}
      </div>
    </form>
  );
});
