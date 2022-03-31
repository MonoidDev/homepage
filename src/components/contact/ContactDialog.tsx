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

  //console.log(error, required);

  return (
    <div
      className={clsx(
        'h-[80px] rounded-[40px] px-8 py-3 bg-black text-white border-2 border-black',
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

  return (
    <div
      className={clsx(
        'h-[110px] rounded-[40px] px-8 py-3 bg-black text-white border-2 border-black col-span-2',
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
          value={controller.field.value}
          onChange={(e) => controller.field.onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export interface ContactDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ContactDialog: React.VFC<ContactDialogProps> = (props) => {
  const { open } = props;

  const strings = useStrings();

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      first_name: '',
      last_name: '',
      email_address: '',
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
        className="grid grid-cols-2 gap-x-4 gap-y-3 py-2"
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
          name="email_address"
          register={register}
          error={errors.email_address}
          className="col-span-2"
          required
        />

        <ProjectTypeInput control={control} />
      </div>
    );
  };

  const renderRightForm = () => {
    return (
      <div className="bg-black text-white rounded-[40px] p-[40px] flex flex-col">
        <h3 className="font-loose text-[38px] font-bold leading-[1] mb-[1rem]">
          {strings.messageBoard}
        </h3>

        <textarea className="note flex-1 bg-transparent outline-none resize-none text-[25px] text-white" />
      </div>
    );
  };

  return (
    <div
      className={clsx(
        'fixed left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center',
        'bg-black bg-opacity-60',
        'font-loose',
      )}
    >
      <form
        className="w-[1300px] h-[700px] bg-white px-[80px] py-[45px] flex flex-col"
        onSubmit={handleSubmit(() => {})}
      >
        <h2 className="text-[55px] font-bold">{strings.contactTitle}</h2>

        <div className="flex-1 grid grid-cols-2 gap-x-8">
          {renderLeftForm()}
          {renderRightForm()}
        </div>
      </form>
    </div>
  );
};
