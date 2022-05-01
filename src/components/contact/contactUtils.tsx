import { makeStrings } from '@monoid-dev/use-strings';
import { useForm } from 'react-hook-form';

export const useContactStrings = makeStrings({
  'en-US': {
    contactTitle: 'CONTACT SHEET',
    firstName: 'First Name',
    lastName: 'Last Name',
    emailAddress: 'Email Address',
    messageBoard: (
      <>
        MESSAGE
        <br />
        BOARD
      </>
    ),
  },
});

export const useContactForm = () => {
  return useForm({
    mode: 'onChange',
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      project_type: '',
      budget: 0,
      delivery: 0,
      message: '',
    },
  });
};
