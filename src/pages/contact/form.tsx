import { useEffect } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';

import {
  mapContactBudgetToLabel,
  mapContactDeliveryToLabel,
  usePostContacts,
} from '@/apis/contact';
import { ContactInput } from '@/components/contact/ContactInput';
import { ContactMessageInput } from '@/components/contact/ContactMessageInput';
import { ContactProjectTypeInput } from '@/components/contact/ContactProjectTypeInput';
import { useContactForm } from '@/components/contact/contactUtils';
import { useContactStrings } from '@/components/contact/contactUtils';
import { SnappedScrollInput } from '@/components/contact/SnappedScrollInput';
import { MutationAlert } from '@/components/MutationAlert';
import { MobileNavigation } from '@/components/recruit/MobileNavigation';

const useStrings = makeStrings({
  'en-US': {
    title: (
      <>
        INFORMATION
        <br />
        SHEET
      </>
    ),
    success: 'Thank you for your message!',
  },
});

export default function Form() {
  const strings = useStrings();

  const postContacts = usePostContacts();
  const contactStrings = useContactStrings();

  const {
    register,
    control,
    trigger,
    handleSubmit,
    reset,
    formState: { errors },
  } = useContactForm();

  useEffect(() => {
    trigger();
  }, []);

  return (
    <>
      <MobileNavigation />
      <MutationAlert mutation={postContacts} />
      <form
        className={clsx(
          'flex-1 flex flex-col sm:px-[28px] sm:py-[28px] overflow-auto',
        )}
        onSubmit={handleSubmit(async (values) => {
          await postContacts.mutateAsync(values);
          reset();
          alert(strings.success);
        })}
      >
        <h2 className="font-loose font-bold text-[40px] leading-none mb-[1rem]">
          {strings.title}
        </h2>

        <div
          className={clsx('grid grid-cols-2 gap-x-4 gap-y-4')}
          style={{ gridAutoRows: 'min-content' }}
        >
          <ContactInput
            label={contactStrings.firstName}
            name="first_name"
            register={register}
            error={errors.first_name}
            required
          />

          <ContactInput
            label={contactStrings.lastName}
            name="last_name"
            register={register}
            error={errors.last_name}
            required
          />

          <ContactInput
            label={contactStrings.emailAddress}
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
              label={contactStrings.budget}
              control={control}
              unit={1 / 15}
              mapValueToLabel={(v) =>
                mapContactBudgetToLabel(v, contactStrings.budget)
              }
            />
          </div>

          <div className="col-span-2">
            <SnappedScrollInput
              name="delivery"
              label={contactStrings.delivery}
              control={control}
              unit={1 / 9}
              mapValueToLabel={(v) =>
                mapContactDeliveryToLabel(v, contactStrings.delivery)
              }
            />
          </div>
          <div className="col-span-2">
            <ContactMessageInput
              error={errors.message}
              rows={7}
              {...register('message', { required: true })}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'white',
      hideLogo: false,
      title: 'Contact | 合同会社Monoid | G.K. Monoid | Monoid',
    },
  };
}
