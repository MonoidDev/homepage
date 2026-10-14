import React, { useId } from 'react';

import { FieldError } from 'react-hook-form';

export interface TextInputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: FieldError;
  multiline?: boolean;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, multiline, ...rest }, ref) => {
    const generatedId = useId();
    const id = rest.id ?? generatedId;
    const errorId = `${id}-error`;
    const fieldProps = {
      ...rest,
      id,
      'aria-invalid': !!error,
      'aria-required': label?.endsWith('*') || undefined,
      'aria-describedby': error ? errorId : rest['aria-describedby'],
      className:
        'text-[20px] sm:text-[18px] px-[1rem] py-[14px] rounded-[4px] border font-loose border-black border-opacity-30 w-full',
    };
    return (
      <div className="flex flex-col min-w-0">
        {label && (
          <label
            htmlFor={id}
            className="text-[23px] sm:text-[18px] font-loose font-bold leading-tight mb-[0.75rem]"
          >
            {label}
          </label>
        )}
        {multiline ? (
          <textarea ref={ref as any} rows={5} {...(fieldProps as any)} />
        ) : (
          <input ref={ref} {...fieldProps} />
        )}
        {error?.message && (
          <span
            id={errorId}
            role="alert"
            className="text-[14px] mt-2 font-loose"
          >
            {error.message}
          </span>
        )}
      </div>
    );
  },
);
