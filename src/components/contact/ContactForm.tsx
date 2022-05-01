import { useEffect } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';
import {
  useForm,
  UseFormRegister,
  FieldError,
  useController,
  Control,
} from 'react-hook-form';

import { MutationAlert } from '../MutationAlert';
import { SnappedScrollInput } from './SnappedScrollInput';
import {
  mapContactBudgetToLabel,
  mapContactDeliveryToLabel,
  usePostContacts,
} from '@/apis/contact';
import ContactClose from '@/assets/images/ContactClose.svg';

const useStrings = makeStrings({
  'en-US': {
    contactTitle: 'CONTACT SHEET',
    firstName: 'First Name',
    lastName: 'Last Name',
    emailAddress: 'Email Address',
    projectType: 'Project Type',
    projectOptions: [
      { value: 'Web', label: 'Web' },
      { value: 'Application', label: 'Application' },
      { value: 'IoT', label: 'IoT' },
    ],
    messageBoard: (
      <>
        MESSAGE
        <br />
        BOARD
      </>
    ),
  },
});

interface InputProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  className?: string;
}

const Input: React.VFC<InputProps> = (props) => {
  const {
    label,
    name,
    type = 'text',
    register,
    error,
    required = true,
    className,
  } = props;

  return (
    <div
      className={clsx(
        'h-[80px] rounded-[40px] px-8 py-3 border-2 border-black',
        error && 'bg-black text-white',
        !error && 'bg-white text-black',
        className,
      )}
    >
      <label
        htmlFor="first_name"
        className={clsx('text-[22px] leading-[0.8] font-bold')}
      >
        {label} <span>*</span>
      </label>
      <input
        type={type}
        className="outline-none bg-transparent text-[25px] w-full"
        {...register(name, { required })}
      />
    </div>
  );
};

const ProjectTypeInput: React.VFC<{ control: Control<any> }> = (props) => {
  const { control } = props;

  const strings = useStrings();

  const controller = useController({
    name: 'project_type',
    control,
    rules: { required: true },
  });

  const error = controller.fieldState.error;

  const isProvidedType = strings.projectOptions
    .map((p) => p.value)
    .includes(controller.field.value);

  return (
    <div
      className={clsx(
        'h-[110px] rounded-[40px] px-8 py-3 border-2 border-black col-span-2',
        error && 'bg-black text-white',
        !error && 'bg-white text-black',
      )}
    >
      <label
        htmlFor="first_name"
        className="text-[22px] leading-[0.8] font-bold mb-4 block"
      >
        {strings.projectType} <span>*</span>
      </label>

      <div className="flex gap-x-2">
        {strings.projectOptions.map((option) => (
          <button
            key={option.value}
            className={clsx(
              'text-[25px] py-2 px-3 rounded-[20px] leading-[1.2]',
              !error &&
                controller.field.value === option.value &&
                'bg-black text-white',
            )}
            onClick={() => {
              controller.field.onChange(option.value);
            }}
          >
            {option.label}
          </button>
        ))}

        <input
          className={clsx(
            'ml-3 outline-none text-[25px] leading-[1.2] shrink min-w-0 border-b bg-transparent',
            error && 'border-white',
            !error && 'border-black',
          )}
          value={isProvidedType ? '' : controller.field.value}
          onChange={(e) => controller.field.onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export interface ContactFormProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}

export const ContactForm: React.VFC<ContactFormProps> = (props) => {
  const { open, onClose, className } = props;

  const strings = useStrings();
  const postContacts = usePostContacts();

  const {
    register,
    handleSubmit,
    trigger,
    control,
    reset,
    formState: { errors },
  } = useForm({
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

  useEffect(() => {
    trigger();
  }, [open]);

  const renderLeftForm = () => {
    return (
      <div
        className={clsx('grid grid-cols-2 gap-x-4 gap-y-4')}
        style={{ gridAutoRows: 'min-content' }}
      >
        <Input
          label={strings.firstName}
          name="first_name"
          register={register}
          error={errors.first_name}
          required
        />

        <Input
          label={strings.lastName}
          name="last_name"
          register={register}
          error={errors.last_name}
          required
        />

        <Input
          label={strings.emailAddress}
          name="email"
          register={register}
          error={errors.email}
          className="col-span-2"
          required
        />

        <ProjectTypeInput control={control} />

        <div className="col-span-2">
          <SnappedScrollInput
            name="budget"
            label="Budget"
            control={control}
            unit={1 / 15}
            mapValueToLabel={mapContactBudgetToLabel}
          />
        </div>

        <div className="col-span-2">
          <SnappedScrollInput
            name="delivery"
            label="Delivery"
            control={control}
            unit={1 / 9}
            mapValueToLabel={mapContactDeliveryToLabel}
          />
        </div>
      </div>
    );
  };

  const renderRightForm = () => {
    return (
      <div
        className={clsx(
          'bg-black text-white rounded-[40px] p-[40px] flex flex-col',
          !errors.message && '!bg-white text-black border-[3px] border-black',
        )}
      >
        <h3 className="font-loose text-[38px] font-bold leading-[1] mb-[1rem]">
          {strings.messageBoard}
        </h3>

        <textarea
          className={clsx(
            'note flex-1 bg-transparent outline-none resize-none text-[25px]',
          )}
          style={
            {
              '--note-bg': errors.message ? 'black' : 'white',
              '--note-line': errors.message ? '#ccc' : 'black',
            } as any
          }
          {...register('message', { required: true })}
        />

        <button
          className={clsx(
            'self-end w-[182px] h-[48px] rounded-[24px] text-[30px] font-loose font-bold pt-[2px] mt-[1rem] bg-[#C4C4C4]',
            errors.message && 'opacity-0',
          )}
          disabled={!!errors.message}
        >
          SEND
        </button>
      </div>
    );
  };

  return (
    <form
      className={clsx(
        'w-[1300px] h-[650px] bg-white px-[80px] pt-[45px] pb-[70px] flex flex-col relative rounded-[10px] border border-black',
        className,
      )}
      onSubmit={handleSubmit(async (values) => {
        await postContacts.mutateAsync(values);
        reset();
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
};
