import { useEffect } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';
import { useRouter } from 'next/router';

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
import { useLocale } from '@/utils/useLocale';

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
  const locale = useLocale();
  const router = useRouter();

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
          alert(strings.success);
          router.push('/contact');
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
            label={contactStrings.company}
            name="company"
            register={register}
            error={errors.company}
            required
          />

          <ContactInput
            label={contactStrings.name}
            name="name"
            register={register}
            error={errors.name}
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
