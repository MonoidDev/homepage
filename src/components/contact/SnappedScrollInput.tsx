import { useRef } from 'react';

import clsx from 'clsx';
import { Control, useController } from 'react-hook-form';

export const SnappedScrollInput: React.VFC<{
  name: string;
  label: string;
  control: Control<any>;
  unit: number;
  mapValueToLabel?: (v: number) => string;
}> = (props) => {
  const { name, label, control, unit, mapValueToLabel } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const controller = useController({
    name,
    control,
    rules: { validate: (v) => v > 0 },
  });

  const { error } = controller.fieldState;

  const { value } = controller.field;

  const onStart = (
    ev: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
  ) => {
    const { left: selfLeft } = (
      ev.target as HTMLDivElement
    ).getBoundingClientRect();

    const clientX = 'touches' in ev ? ev.touches[0]!.clientX : ev.clientX;

    const startOffset = clientX - selfLeft;

    function onMove(ev: TouchEvent | MouseEvent) {
      const clientX = 'touches' in ev ? ev.touches[0]!.clientX : ev.clientX;

      const { left, right } = containerRef.current!.getBoundingClientRect();

      const width = right - left;

      const offset = Math.max(0, Math.min(clientX - startOffset - left, width));

      const percent = offset / width;

      const units = Math.floor(percent / unit);

      controller.field.onChange(units * unit);
    }

    function onEnd() {
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('mouseup', onEnd);
    }

    window.addEventListener('touchmove', onMove);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchend', onEnd);
    window.addEventListener('mouseup', onEnd);
  };

  return (
    <div
      className={clsx(
        'font-loose h-[50px] sm:h-[40px] rounded-[25px] sm:rounded-[20px] border-2 border-black pl-8 sm:pl-5',
        'flex items-center',
        error && 'bg-black text-white',
        !error && 'bg-white text-black',
      )}
    >
      <label className="text-[22px] sm:text-[16px] leading-[0.8] font-bold sm:font-normal pt-[2px] w-[140px] sm:w-[90px] shrink-0 select-none whitespace-pre">
        {mapValueToLabel ? mapValueToLabel(value) : label}
      </label>
      <div
        ref={containerRef}
        className="flex-1 relative mr-[52px] sm:mr-[40px]"
      >
        <div
          className={clsx(
            'absolute top-[-28px] sm:top-[-22.5px] w-[56px] h-[56px] sm:w-[45px] sm:h-[45px] rounded-full border-[5px] border-black bg-white',
            'cursor-pointer',
            !error && '!bg-black',
          )}
          style={{ left: `calc(${value * 100}%)` }}
          onTouchStart={onStart}
          onMouseDown={onStart}
        />
      </div>
    </div>
  );
};
