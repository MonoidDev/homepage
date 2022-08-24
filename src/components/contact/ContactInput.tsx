import clsx from 'clsx';
import { FieldError, UseFormRegister } from 'react-hook-form';

export interface ContactInputProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  className?: string;
}

export const ContactInput: React.VFC<ContactInputProps> = (props) => {
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
        'font-loose h-[60px] sm:h-[52px] rounded-[40px] sm:rounded-[26px] px-8 sm:px-5 py-[6px] sm:py-[2px] border-2 border-black overflow-hidden',
        error && 'bg-black text-white',
        !error && 'bg-white text-black',
        className,
      )}
    >
      <label
        htmlFor={name}
        className={clsx(
          'text-[18px] sm:text-[16px] leading-[0.8] font-bold sm:font-normal',
        )}
      >
        {label} <span>*</span>
      </label>
      <input
        type={type}
        className="outline-none bg-transparent text-[18px] sm:text-[16px] w-full"
        {...register(name, { required })}
      />
    </div>
  );
};
