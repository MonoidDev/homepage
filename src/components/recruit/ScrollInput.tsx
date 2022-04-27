import { useRef } from 'react';

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

  return (
    <div className="flex">
      <label className="text-[23px] font-loose font-bold leading-tight flex mb-[1rem] w-[156px]">
        {label}
      </label>

      <div
        ref={containerRef}
        className="flex flex-1 bg-white h-[30px] rounded-[15px] relative"
      >
        <div
          className="absolute h-[60px] w-[60px] top-[-15px] bg-black rounded-[30px]"
          style={{ left: `calc(${value * 100}% - 30px)` }}
          onMouseDown={(ev) => {
            const { left: selfLeft } = (
              ev.target as HTMLDivElement
            ).getBoundingClientRect();

            startOffsetRef.current = ev.clientX - selfLeft;
            isDraggingRef.current = true;

            function onMouseMove(ev: MouseEvent) {
              if (isDraggingRef.current) {
                const { left, right } =
                  containerRef.current!.getBoundingClientRect();

                const width = right - left;

                const offset = Math.max(
                  0,
                  Math.min(
                    ev.clientX - startOffsetRef.current - left + 15,
                    width,
                  ),
                );

                controller.field.onChange(offset / width);
              }
            }

            function onMouseUp() {
              isDraggingRef.current = false;
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('mouseup', onMouseUp);
            }

            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
          }}
        />
      </div>
    </div>
  );
};
