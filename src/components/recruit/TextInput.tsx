import React from 'react';

import clsx from 'clsx';
import { FieldError } from 'react-hook-form';

export interface TextInputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: FieldError;
  multiline?: boolean;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { label, error, multiline, ...rest } = props;

    return (
      <div className="flex flex-col">
        <div className="flex">
          {label && (
            <label
              htmlFor={rest.name}
              className="text-[23px] sm:text-[18px] font-loose font-bold leading-tight flex mb-[1rem] sm:mb-[0.5rem]"
            >
              <div className="w-[3px] bg-black opacity-40 ml-[0.25rem] mr-[0.75rem] mb-[0.25rem]" />
              {label}
            </label>
          )}
          {error?.message && (
            <span className="sm:hidden text-red-600 ml-[1rem]">
              *{error.message}
            </span>
          )}
        </div>

        {!multiline && (
          <input
            ref={ref}
            className={clsx(
              'text-[20px] sm:text-[18px] leading-[16px] px-[1rem] pt-[16px] sm:pt-[13px] pb-[12px] sm:pb-[10px]',
              'outline-none rounded-[4px] border font-loose border-black border-opacity-30',
            )}
            {...rest}
          />
        )}

        {multiline && (
          <textarea
            ref={ref}
            rows={5}
            className="text-[20px] sm:text-[18px] px-[1rem] pt-[1.125rem] pb-[1rem] outline-none rounded-[4px] border font-loose leading-none border-black border-opacity-30"
            {...(rest as any)}
          />
        )}

        {error?.message && (
          <span className=">sm:hidden text-red-600 text-[10px]">
            *{error.message}
          </span>
        )}
      </div>
    );
  },
);
