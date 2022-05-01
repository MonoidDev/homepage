import React from 'react';

import clsx from 'clsx';
import { FieldError } from 'react-hook-form';

import { useContactStrings } from './contactUtils';

export interface ContactMessageInputProps
  extends React.ComponentProps<'textarea'> {
  error?: FieldError;
}

export const ContactMessageInput = React.forwardRef<
  HTMLDivElement,
  ContactMessageInputProps
>((props, ref) => {
  const { error, ...rest } = props;

  const strings = useContactStrings();

  return (
    <div
      className={clsx(
        'bg-black text-white rounded-[40px] sm:rounded-[25px] p-[40px] sm:p-[24px] sm:pb-[16px] flex flex-col',
        !error && '!bg-white text-black border-[3px] border-black',
      )}
    >
      <h3 className="font-loose text-[38px] sm:text-[24px] font-bold leading-[1] mb-[1rem]">
        {strings.messageBoard}
      </h3>

      <textarea
        className={clsx(
          'note flex-1 bg-transparent outline-none resize-none text-[25px] sm:text-[16.5px]',
        )}
        style={
          {
            '--note-bg': error ? 'black' : 'white',
            '--note-line': error ? '#ccc' : 'black',
          } as any
        }
        ref={ref as any}
        {...rest}
      />

      <button
        className={clsx(
          'self-end w-[182px] sm:w-[122px] h-[48px] sm:h-[32px] rounded-[24px]',
          'sm:rounded-[12px] text-[30px] sm:text-[22px] sm:text-white',
          'font-loose font-bold pt-[2px] mt-[1rem] sm:mt-[0] bg-[#C4C4C4] sm:bg-black',
          error && 'opacity-0',
        )}
        disabled={!!error}
      >
        SEND
      </button>
    </div>
  );
});
