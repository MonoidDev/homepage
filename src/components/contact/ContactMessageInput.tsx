import React, { useId } from 'react';

import { FieldError } from 'react-hook-form';

import { useContactStrings } from './contactUtils';

export interface ContactMessageInputProps extends React.ComponentProps<'textarea'> {
  error?: FieldError;
  pending?: boolean;
}

export const ContactMessageInput = React.forwardRef<
  HTMLTextAreaElement,
  ContactMessageInputProps
>(({ error, pending, ...rest }, ref) => {
  const strings = useContactStrings();
  const id = useId();
  return (
    <div className="bg-white text-black border-2 border-black rounded-[40px] sm:rounded-[25px] p-[32px] sm:p-[24px] flex flex-col min-h-[320px]">
      <label
        htmlFor={id}
        className="font-loose text-[28px] sm:text-[24px] font-bold leading-tight mb-4"
      >
        {strings.messageBoard} <span aria-hidden="true">*</span>
      </label>
      <textarea
        {...rest}
        id={id}
        ref={ref}
        aria-required="true"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="note flex-1 bg-transparent resize-y text-[20px] sm:text-[16px] leading-[38px] sm:leading-[25px] min-h-[150px]"
        style={
          {
            '--note-bg': 'white',
            '--note-line': 'black',
          } as React.CSSProperties
        }
      />
      {error && (
        <p id={`${id}-error`} className="text-sm mt-2">
          {error.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="self-end min-w-[140px] px-5 py-2 rounded-full text-[22px] font-loose font-bold mt-4 bg-black text-white [--focus-ring-color:#000] disabled:opacity-60"
      >
        {pending ? strings.sending : strings.send}
      </button>
    </div>
  );
});
