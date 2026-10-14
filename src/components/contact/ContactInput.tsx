import { useId } from 'react';

import clsx from 'clsx';
import { FieldError, UseFormRegister } from 'react-hook-form';

import { useContactStrings } from './contactUtils';

export interface ContactInputProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  className?: string;
}

export const ContactInput: React.FC<ContactInputProps> = ({
  label,
  name,
  type = 'text',
  register,
  error,
  required = true,
  className,
}) => {
  const id = useId();
  const strings = useContactStrings();
  const isEmail = name === 'email';
  return (
    <div className={className}>
      <div
        className={clsx(
          'font-loose rounded-[40px] sm:rounded-[26px] px-8 sm:px-5 py-[6px] border-2 border-black',
          error ? 'bg-black text-white' : 'bg-white text-black',
        )}
      >
        <label htmlFor={id} className="text-[18px] sm:text-[16px] font-bold">
          {label} {required && <span aria-hidden="true">*</span>}
        </label>
        <input
          id={id}
          type={isEmail ? 'email' : type}
          autoComplete={
            isEmail ? 'email' : name === 'company' ? 'organization' : 'name'
          }
          inputMode={isEmail ? 'email' : undefined}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="bg-transparent text-[18px] sm:text-[16px] w-full min-w-0"
          {...register(name, {
            setValueAs: (v: string) => v.trim(),
            required: required ? strings.required : false,
            ...(isEmail && {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: strings.invalidEmail,
              },
            }),
          })}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm px-4 mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};
