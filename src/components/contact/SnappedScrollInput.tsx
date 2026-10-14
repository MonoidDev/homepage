import { useId } from 'react';

import { Control, useController } from 'react-hook-form';

import styles from './contact.module.css';
import { useContactStrings } from './contactUtils';

export const SnappedScrollInput: React.FC<{
  name: string;
  label: string;
  control: Control<any>;
  max: number;
  mapValueToLabel: (v: number) => string;
}> = ({ name, label, control, max, mapValueToLabel }) => {
  const id = useId();
  const strings = useContactStrings();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { validate: (v) => v > 0 || strings.selectValue },
  });
  return (
    <div>
      <div className="font-loose rounded-full border-2 border-black px-5 py-2 flex items-center gap-3">
        <label
          htmlFor={id}
          className="text-[18px] sm:text-[16px] font-bold shrink-0"
        >
          {label} <span aria-hidden="true">*</span>
          <span className="block text-sm font-normal">
            {mapValueToLabel(field.value)}
          </span>
        </label>
        <input
          {...field}
          id={id}
          type="range"
          min={0}
          max={max}
          step={1}
          onChange={(e) => field.onChange(Number(e.target.value))}
          aria-label={label}
          aria-valuetext={mapValueToLabel(field.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={styles.range}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm px-4 mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};
