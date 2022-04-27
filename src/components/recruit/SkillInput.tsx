import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';

import clsx from 'clsx';
import { Control, FieldError, useController } from 'react-hook-form';

import Add from '@/assets/images/Add.svg';
import { getSkillResults } from '@/data/recruit';

export interface SkillItem {
  value: string;
  isEditing: boolean;
}

interface SkillItemInputHint {
  initialItem: SkillItem;
  onClose: (v: SkillItem) => void;
}

const SkillItemInputHint: React.VFC<SkillItemInputHint> = (props) => {
  const { initialItem, onClose } = props;

  const containerRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialItem.value);
  const options = useDeferredValue(
    useMemo(() => getSkillResults(value), [value]),
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      const { left, right, top, bottom } =
        containerRef.current?.getBoundingClientRect()!;
      if (
        e.clientX < left ||
        e.clientX > right ||
        e.clientY < top ||
        e.clientY > bottom
      ) {
        onClose({
          value: value.trim(),
          isEditing: false,
        });
      }
    }

    window.addEventListener('mousedown', onMouseDown);

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, [value]);

  return (
    <div
      className={clsx(
        'absolute left-[21px] bottom-[21px]',
        'bg-white bg-opacity-80 border border-black',
        'h-[214px] w-[500px] p-[1rem] flex flex-col',
      )}
      ref={containerRef}
    >
      <input
        ref={inputRef}
        className="outline-none text-[24px] mt-[0.5rem] pb-[0.5rem] border-b border-black mb-[1rem]"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onClose({
              value: value.trim(),
              isEditing: false,
            });
          }
        }}
        maxLength={25}
      />
      <div className="flex flex-wrap gap-x-4 gap-y-3 shrink overflow-scroll">
        {options.slice(0, 5).map((choice) => (
          <div
            key={choice.skill}
            className={clsx(
              'bg-[#DFDFDF] h-[42px] min-w-[42px] rounded-[21px] px-[16px]',
              'cursor-pointer',
              'flex justify-center items-center',
              'text-[25px] font-bold',
            )}
            onClick={() => {
              onClose({
                value: choice.skill,
                isEditing: false,
              });
            }}
          >
            {choice.skill}
          </div>
        ))}
      </div>
    </div>
  );
};

interface SkillItemInputProps {
  value: SkillItem;
  onChange: (v: SkillItem) => void;
  onDelete: () => void;
}

const SkillItemInput: React.VFC<SkillItemInputProps> = (props) => {
  const { value, onChange, onDelete } = props;

  return (
    <div
      className={clsx(
        'bg-[#DFDFDF] h-[42px] min-w-[42px] rounded-[21px] px-[16px]',
        'flex justify-center items-center',
        'text-[25px] font-bold',
        'relative select-none cursor-pointer',
      )}
      onClick={() => {
        if (!value.isEditing) {
          onChange({
            ...value,
            isEditing: true,
          });
        }
      }}
    >
      {value.value}

      {value.isEditing && (
        <SkillItemInputHint
          initialItem={value}
          onClose={(item) => {
            if (item.value.length > 0) {
              onChange(item);
            } else {
              onDelete();
            }
          }}
        />
      )}
    </div>
  );
};

export interface SkillInputProps {
  label: string;
  name: string;
  control: Control<any>;
  error?: FieldError;
}

export const SkillInput: React.VFC<SkillInputProps> = (props) => {
  const { label, name, error, control } = props;

  const controller = useController<{ [K in string]: SkillItem[] }>({
    name,
    control,
  });

  const { value } = controller.field;

  return (
    <div className="flex flex-col">
      <div className="flex">
        <label
          htmlFor={name}
          className="text-[23px] font-loose font-bold leading-tight flex mb-[1rem]"
        >
          <div className="w-[3px] bg-black opacity-40 ml-[0.25rem] mr-[0.75rem] mb-[0.25rem]" />
          {label}
        </label>
        {error?.message && (
          <span className="text-red-600 ml-[1rem]">*{error.message}</span>
        )}
      </div>

      <div
        className={clsx(
          'px-[1rem] pt-[1.125rem] pb-[1rem] outline-none rounded-[4px] border font-loose leading-none bg-white border-black border-opacity-30',
          'flex flex-wrap gap-x-3 gap-y-[15px] min-h-[136px]',
        )}
      >
        {value.map((v, i) => (
          <SkillItemInput
            key={i}
            value={v}
            onChange={(v) => {
              controller.field.onChange(
                value.map(
                  (curItem, curI): SkillItem => (curI !== i ? curItem : v),
                ),
              );
            }}
            onDelete={() =>
              controller.field.onChange(value.filter((_, j) => i !== j))
            }
          />
        ))}

        <button
          type="button"
          className="h-[42px] w-[42px] bg-[#DFDFDF] rounded-full flex justify-center items-center"
          onClick={() =>
            controller.field.onChange([
              ...value,
              { value: '', isEditing: true },
            ])
          }
        >
          <Add />
        </button>
      </div>
    </div>
  );
};
