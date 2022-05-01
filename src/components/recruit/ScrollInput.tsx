import React, { useRef } from 'react';

import { Control, useController } from 'react-hook-form';

export interface ScrollInputProps {
  label: string;
  name: string;
  control: Control<any>;
}

export const ScrollInput: React.VFC<ScrollInputProps> = (props) => {
  const { label, name, control } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const controller = useController<{ [K in string]: number }>({
    name,
    control,
  });

  const { value } = controller.field;

  const isDraggingRef = useRef<boolean>(false);
  const startOffsetRef = useRef<number>(0);

  const onStart =
    (offsetBase: number) =>
    (
      ev: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
    ) => {
      const { left: selfLeft } = (
        ev.target as HTMLDivElement
      ).getBoundingClientRect();

      const clientX = 'touches' in ev ? ev.touches[0]!.clientX : ev.clientX;

      startOffsetRef.current = clientX - selfLeft;
      isDraggingRef.current = true;

      function onMove(ev: TouchEvent | MouseEvent) {
        if (isDraggingRef.current) {
          const clientX = 'touches' in ev ? ev.touches[0]!.clientX : ev.clientX;

          const { left, right } = containerRef.current!.getBoundingClientRect();

          const width = right - left;

          const offset = Math.max(
            0,
            Math.min(
              clientX - startOffsetRef.current - left + offsetBase,
              width,
            ),
          );

          controller.field.onChange(offset / width);
        }
      }

      function onEnd() {
        isDraggingRef.current = false;
        window.addEventListener('touchmove', onMove);
        window.removeEventListener('mousemove', onMove);
        window.addEventListener('touchend', onEnd);
        window.removeEventListener('mouseup', onEnd);
      }

      window.addEventListener('touchmove', onMove);
      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchend', onEnd);
      window.addEventListener('mouseup', onEnd);
    };

  return (
    <div className="flex">
      <label className="text-[23px] sm:text-[18px] font-loose font-bold leading-tight flex mb-[1rem] w-[156px] sm:w-[110px]">
        {label}
      </label>

      <div
        ref={containerRef}
        className="flex flex-1 bg-white h-[30px] sm:h-[20px] rounded-[15px] sm:rounded-[10px] relative"
      >
        <div
          className="sm:hidden absolute h-[60px] w-[60px] top-[-15px] bg-black rounded-[30px]"
          style={{ left: `calc(${value * 100}% - 30px)` }}
          onTouchStart={onStart(15)}
          onMouseDown={onStart(15)}
        />

        <div
          className=">sm:hidden absolute h-[30px] w-[30px] top-[-5px] bg-black rounded-[15px]"
          style={{ left: `calc(${value * 100}% - 15px)` }}
          onTouchStart={onStart(7.5)}
          onMouseDown={onStart(7.5)}
        />
      </div>
    </div>
  );
};
