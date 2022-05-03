import { makeStrings } from '@monoid-dev/use-strings';
import clsx from 'clsx';
import { useController, Control } from 'react-hook-form';

import { useLocale } from '@/utils/useLocale';

const useStrings = makeStrings({
  'en-US': {
    projectType: 'Project Type',
    projectOptions: [
      { value: 'IT Consulting', label: 'IT Consulting' },
      { value: 'System', label: 'System' },
      { value: 'Application', label: 'Application' },
      { value: 'Website', label: 'Website' },
      { value: 'Other', label: 'Other' },
    ],
  },
  'ja-JP': {
    projectType: 'お問い合わせの種別',
    projectOptions: [
      { value: 'IT Consulting', label: 'ITコンサルティング' },
      { value: 'System', label: 'システム開発' },
      { value: 'Application', label: 'アプリ開発' },
      { value: 'Website', label: 'ウェブ制作' },
      { value: 'Other', label: 'その他' },
    ],
  },
  'zh-CN': {
    projectType: '项目类型',
    projectOptions: [
      { value: 'IT Consulting', label: 'IT咨询' },
      { value: 'System', label: '系统开发' },
      { value: 'Application', label: 'App开发' },
      { value: 'Website', label: '网页开发' },
      { value: 'Other', label: '其他' },
    ],
  },
});

export const ContactProjectTypeInput: React.VFC<{ control: Control<any> }> = (
  props,
) => {
  const { control } = props;

  const strings = useStrings();
  const locale = useLocale();

  const controller = useController({
    name: 'project_type',
    control,
    rules: { required: true },
  });

  const error = controller.fieldState.error;

  const value = controller.field.value;

  return (
    <div
      className={clsx(
        'h-[95px] sm:h-[90px] rounded-[40px] sm:rounded-[26px] px-8 sm:px-5 py-3 border-2 border-black col-span-2 font-loose',
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

      <div className="flex gap-x-2 overflow-scroll pb-[10px]">
        {strings.projectOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={clsx(
              'text-[25px] sm:text-[16px] pt-[4px] pb-[2px] px-3 sm:px-2 rounded-[20px] leading-[1.2] whitespace-pre',
              locale === 'ja-JP' && 'font-bold',
              !error && value.includes(option.value) && 'bg-black text-white',
            )}
            onClick={() => {
              controller.field.onChange(
                value.includes(option.value)
                  ? value.filter((v: string) => v !== option.value)
                  : [...value, option.value],
              );
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
