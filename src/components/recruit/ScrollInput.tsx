import React, { useId } from 'react';

import { Control, useController } from 'react-hook-form';

import { useCandidateStrings } from './recruitForm';

export interface ScrollInputProps {
  label: string;
  name: string;
  control: Control<any>;
}

export const ScrollInput: React.VFC<ScrollInputProps> = ({
  label,
  name,
  control,
}) => {
  const { field } = useController({ name, control });
  const strings = useCandidateStrings();
  const id = useId();
  const value = Math.round((Number(field.value) || 0) * 4);
  const update = (level: number) =>
    field.onChange(Math.max(0, Math.min(4, level)) / 4);
  const setFromPointer = (ev: React.PointerEvent<HTMLDivElement>) => {
    const { left, width } = ev.currentTarget.getBoundingClientRect();
    if (width) update(Math.round(((ev.clientX - left) / width) * 4));
  };
  return (
    <div className="font-loose">
      <div className="flex justify-between gap-3 mb-5 sm:mb-3">
        <span id={id} className="text-[23px] sm:text-[18px] font-bold">
          {label}
        </span>
        <span className="text-[16px]">{strings.levels[value]}</span>
      </div>
      <div
        role="slider"
        tabIndex={0}
        aria-labelledby={id}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-valuenow={value}
        aria-valuetext={strings.levels[value]}
        ref={field.ref}
        onBlur={field.onBlur}
        className="relative bg-white h-[30px] sm:h-[20px] rounded-full mx-[10%] cursor-pointer touch-pan-y"
        onPointerDown={(ev) => {
          ev.currentTarget.focus();
          ev.currentTarget.setPointerCapture(ev.pointerId);
          setFromPointer(ev);
        }}
        onPointerMove={(ev) => {
          if (ev.currentTarget.hasPointerCapture(ev.pointerId))
            setFromPointer(ev);
        }}
        onPointerUp={(ev) => {
          if (ev.currentTarget.hasPointerCapture(ev.pointerId))
            ev.currentTarget.releasePointerCapture(ev.pointerId);
        }}
        onKeyDown={(ev) => {
          const next = {
            ArrowRight: value + 1,
            ArrowUp: value + 1,
            ArrowLeft: value - 1,
            ArrowDown: value - 1,
            Home: 0,
            End: 4,
          }[ev.key];
          if (next !== undefined) {
            ev.preventDefault();
            update(next);
          }
        }}
      >
        <span
          aria-hidden="true"
          className="absolute w-[44px] h-[44px] sm:w-[30px] sm:h-[30px] top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black pointer-events-none"
          style={{ left: `${value * 25}%` }}
        />
      </div>
      <div
        className="grid grid-cols-5 text-center text-[12px] sm:text-[10px] leading-tight mt-4"
        aria-hidden="true"
      >
        {strings.levels.map((level) => (
          <span key={level} className="min-w-0 px-0.5 [overflow-wrap:anywhere]">
            {level}
          </span>
        ))}
      </div>
    </div>
  );
};
