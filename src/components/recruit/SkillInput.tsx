import React, { useEffect, useId, useRef, useState } from 'react';

import { Control, FieldError, useController } from 'react-hook-form';

import { useCandidateStrings } from './recruitForm';
import { getSkillResults } from '@/data/recruit';

export interface SkillItem {
  value: string;
  isEditing: boolean;
}
export interface SkillInputProps {
  label: string;
  name: string;
  control: Control<any>;
  error?: FieldError;
}

export const SkillInput = React.forwardRef<HTMLInputElement, SkillInputProps>(
  ({ label, name, error, control }, _ref) => {
    const { field } = useController<{ [K in string]: SkillItem[] }>({
      name,
      control,
    });
    const strings = useCandidateStrings();
    const id = useId();
    const [editing, setEditing] = useState<number | null>(null);
    const [draft, setDraft] = useState('');
    const input = useRef<HTMLInputElement>(null);
    const addButton = useRef<HTMLButtonElement | null>(null);
    const returnFocus = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
      if (editing !== null) input.current?.focus();
    }, [editing]);
    const close = () => {
      setEditing(null);
      (returnFocus.current ?? addButton.current)?.focus();
    };
    const save = (text: string) => {
      const value = text.trim();
      if (!value || editing === null) return;
      const next = [...field.value];
      next[editing] = { value, isEditing: false };
      field.onChange(next);
      close();
    };
    return (
      <div className="font-loose">
        <span
          id={`${id}-label`}
          className="block text-[23px] sm:text-[18px] font-bold mb-3"
        >
          {label}
        </span>
        <div
          role="group"
          aria-labelledby={`${id}-label`}
          aria-describedby={error ? `${id}-error` : undefined}
          className="p-4 bg-white rounded border border-black border-opacity-30 min-h-[100px]"
        >
          <div className="flex flex-wrap gap-3">
            {field.value.map((skill, index) => (
              <div
                key={index}
                className="flex min-w-0 max-w-full items-center bg-[#DFDFDF] rounded-full"
              >
                <button
                  type="button"
                  className="min-w-0 break-words [overflow-wrap:anywhere] px-4 py-2 font-bold"
                  aria-label={`${strings.editSkill}: ${skill.value}`}
                  onClick={(ev) => {
                    returnFocus.current = ev.currentTarget;
                    setDraft(skill.value);
                    setEditing(index);
                  }}
                >
                  {skill.value}
                </button>
                <button
                  type="button"
                  className="shrink-0 px-3 py-2 rounded-full"
                  aria-label={`${strings.remove} ${skill.value}`}
                  onClick={() => {
                    field.onChange(field.value.filter((_, i) => i !== index));
                    setEditing(null);
                    addButton.current?.focus();
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              ref={(el) => {
                addButton.current = el;
                field.ref(el);
              }}
              type="button"
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : undefined}
              className="rounded-full bg-[#DFDFDF] px-4 py-2 font-bold"
              onClick={(ev) => {
                returnFocus.current = ev.currentTarget;
                setDraft('');
                setEditing(field.value.length);
              }}
            >
              + {strings.addSkill}
            </button>
          </div>
          {editing !== null && (
            <div
              className="border-t border-black mt-4 pt-4"
              onKeyDown={(ev) => {
                if (ev.key === 'Escape') {
                  ev.preventDefault();
                  ev.stopPropagation();
                  close();
                }
              }}
            >
              <label htmlFor={id} className="sr-only">
                {strings.editSkill}
              </label>
              <input
                id={id}
                ref={input}
                value={draft}
                maxLength={60}
                placeholder={strings.skillPlaceholder}
                className="border border-black rounded px-3 py-3 w-full"
                onChange={(ev) => setDraft(ev.target.value)}
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter') {
                    ev.preventDefault();
                    save(draft);
                  }
                }}
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {getSkillResults(draft)
                  .slice(0, 5)
                  .map((option) => (
                    <button
                      key={option.skill}
                      type="button"
                      className="rounded-full bg-[#DFDFDF] px-3 py-2"
                      onClick={() => save(option.skill)}
                    >
                      {option.skill}
                    </button>
                  ))}
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  disabled={!draft.trim()}
                  className="rounded-full bg-black text-white px-5 py-2 disabled:opacity-40"
                  onClick={() => save(draft)}
                >
                  {strings.save}
                </button>
                <button
                  type="button"
                  className="rounded-full border border-black px-5 py-2"
                  onClick={close}
                >
                  {strings.cancel}
                </button>
              </div>
            </div>
          )}
        </div>
        {error?.message && (
          <p id={`${id}-error`} role="alert" className="text-[14px] mt-2">
            {error.message}
          </p>
        )}
      </div>
    );
  },
);
