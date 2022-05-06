import React, { useEffect } from 'react';

import clsx from 'clsx';

import { MutationAlert } from '../MutationAlert';
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
import { useLocale } from '@/utils/useLocale';

export interface ContactFormProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}

export const ContactForm: React.VFC<ContactFormProps> = React.memo((props) => {
  const { open, onClose, className } = props;

  const strings = useContactStrings();
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
            control={control}
            unit={1 / 15}
            mapValueToLabel={(v) => mapContactBudgetToLabel(v, strings.budget)}
          />
        </div>

        <div className="col-span-2">
          <SnappedScrollInput
            name="delivery"
            label={strings.delivery}
            control={control}
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
        'w-[1300px] h-[650px] bg-white px-[80px] pt-[45px] pb-[70px] flex flex-col relative rounded-[10px] border border-black',
        className,
      )}
      onSubmit={handleSubmit(async (values) => {
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
        alert('Thank you for your message!');
        onClose();
      })}
    >
      <button onClick={() => onClose()}>
        <ContactClose className="absolute right-[30px] top-[30px]" />
      </button>

      <MutationAlert mutation={postContacts} />

      <h2 className="text-[55px] font-bold">{strings.contactTitle}</h2>

      <div className="flex-1 grid grid-cols-2 gap-x-8">
        {renderLeftForm()}
        {renderRightForm()}
      </div>
    </form>
  );
});
