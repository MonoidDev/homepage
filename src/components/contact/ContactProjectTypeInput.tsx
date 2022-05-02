import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';
import { useController, Control } from 'react-hook-form';

const useStrings = makeStrings({
  'en-US': {
    projectType: 'Project Type',
    projectOptions: [
      { value: 'Web', label: 'Web' },
      { value: 'Application', label: 'Application' },
      { value: 'IoT', label: 'IoT' },
    ],
  },
});

export const ContactProjectTypeInput: React.VFC<{ control: Control<any> }> = (
  props,
) => {
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
        'h-[110px] sm:h-[90px] rounded-[40px] sm:rounded-[26px] px-8 sm:px-5 py-3 border-2 border-black col-span-2 font-loose',
        error && 'bg-black text-white',
        !error && 'bg-white text-black',
      )}
    >
      <label
        htmlFor="first_name"
        className="text-[22px] sm:text-[16px] leading-[0.8] font-bold sm:font-normal mb-4 block"
      >
        {strings.projectType} <span>*</span>
      </label>

      <div className="flex gap-x-2">
        {strings.projectOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={clsx(
              'text-[25px] sm:text-[16px] py-2 px-3 sm:px-2 rounded-[20px] leading-[1.2]',
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
            'ml-3 outline-none text-[25px] sm:text-[16px] leading-[1.2] sm:leading-none shrink min-w-0 border-b bg-transparent',
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
