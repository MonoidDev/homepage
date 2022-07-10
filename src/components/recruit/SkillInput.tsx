import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';

import clsx from 'clsx';
import { Control, FieldError, useController } from 'react-hook-form';

import { GoBackTriangleTitle } from './GoBackTriangleTitle';
import Add from '@/assets/images/Add.svg';
import ClearSmall from '@/assets/images/ClearSmall.svg';
import { getSkillResults } from '@/data/recruit';
import { useScreen } from '@/utils/useScreen';

export interface SkillItem {
  value: string;
  isEditing: boolean;
}

interface MobileSkillItemInputHintResultProps {
  search: string;
  onClickItem: (item: SkillItem) => void;
}

const MobileSkillItemInputHintResult: React.VFC<MobileSkillItemInputHintResultProps> =
  React.memo((props) => {
    const { search, onClickItem } = props;

    const options = useDeferredValue(
      useMemo(() => getSkillResults(search).slice(0, 5), [search]),
    );

    return (
      <div className="flex flex-col text-[18px] font-normal">
        {options.map((o) => (
          <div
            key={o.skill}
            onClick={() =>
              onClickItem({
                value: o.skill,
                isEditing: false,
              })
            }
            className="h-[50px] px-[20px] pt-[4px] flex items-center border-b-black border-b border-opacity-20"
          >
            {o.skill}
          </div>
        ))}
      </div>
    );
  });

interface MobileSkillItemInputHintProps {
  initialItem: SkillItem;
  onClose: (v: SkillItem) => void;
}

const MobileSkillItemInputHint: React.VFC<MobileSkillItemInputHintProps> = (
  props,
) => {
  const { initialItem, onClose } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialItem.value);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="z-50 fixed top-0 bottom-0 left-0 right-0 bg-white">
      <GoBackTriangleTitle
        onClick={() =>
          onClose({
            value,
            isEditing: false,
          })
        }
      >
        TECH SKILLS
      </GoBackTriangleTitle>

      <div className="flex items-center border-t border-b border-black px-[20px] pt-[22px] pb-[18px]">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="flex-1 font-bold text-[18px] outline-none"
          placeholder="Skill (ex Python)"
        />
        <button onClick={() => setValue('')}>
          <ClearSmall />
        </button>
      </div>

      <MobileSkillItemInputHintResult search={value} onClickItem={onClose} />
    </div>
  );
};

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

  const screen = useScreen();

  const InputHint =
    screen === 'desktop' ? SkillItemInputHint : MobileSkillItemInputHint;

  return (
    <div
      className={clsx(
        'bg-[#DFDFDF] h-[42px] min-w-[42px] rounded-[21px] px-[16px]',
        'sm:h-[30px] min:w-[30px] sm:px-[10px] sm:text-[16px] sm:pt-[2px]',
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
        <InputHint
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

export const SkillInput: React.VFC<SkillInputProps> = React.forwardRef(
  (props, ref) => {
    const { label, name, error, control } = props;

    const controller = useController<{ [K in string]: SkillItem[] }>({
      name,
      control: control as any,
    });

    const { value } = controller.field;

    return (
      <div className="flex flex-col" ref={ref as any}>
        <div className="flex">
          {label && (
            <label
              htmlFor={name}
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

        <div
          className={clsx(
            'px-[1rem] pt-[1.125rem] pb-[1rem] outline-none rounded-[4px] border font-loose leading-none bg-white border-black border-opacity-30',
            'flex flex-wrap content-start gap-x-3 gap-y-[15px] min-h-[136px]',
            'sm:!gap-x-2 sm:!gap-y-3',
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
            className={clsx(
              'h-[42px] w-[42px] p-[7px] bg-[#DFDFDF] rounded-full flex justify-center items-center',
              'sm:h-[30px] sm:w-[30px] sm:p-[5px]',
            )}
            onClick={() =>
              controller.field.onChange([
                ...value,
                { value: '', isEditing: true },
              ])
            }
          >
            <Add height={25} width={24} />
          </button>
        </div>

        {error?.message && (
          <span className=">sm:hidden text-red-600 text-[10px]">
            *{error.message}
          </span>
        )}
      </div>
    );
  },
);
