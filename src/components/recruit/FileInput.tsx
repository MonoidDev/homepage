import { useId, useRef, useState } from 'react';

import { Control, FieldError, useController } from 'react-hook-form';

import { useCandidateStrings } from './recruitForm';
import { FileItem } from '@/apis/files';
import CloudUploadSvg from '@/assets/images/CloudUpload.svg';
import PdfSvg from '@/assets/images/Pdf.svg';

export interface FileInputItemProps {
  item: FileItem;
  onDelete?: () => void;
}
export const FileInputItem = ({ item, onDelete }: FileInputItemProps) => {
  const strings = useCandidateStrings();
  return (
    <div className="bg-white p-4 rounded-[10px] flex items-center gap-3 min-w-0 max-w-full">
      <PdfSvg
        viewBox="0 0 83 84"
        width={38}
        height={50}
        aria-hidden="true"
        className="shrink-0"
      />
      <span className="truncate font-loose" title={item.file?.name}>
        {item.file?.name ?? 'PDF'}
      </span>
      <button
        type="button"
        onClick={onDelete}
        aria-label={`${strings.remove} ${item.file?.name ?? 'PDF'}`}
        className="border border-black rounded-full px-3 py-2 text-[14px] shrink-0"
      >
        {strings.remove}
      </button>
    </div>
  );
};
export interface FileInputProps {
  label?: string;
  error?: FieldError;
  name: string;
  control: Control<any>;
}
export const FileInput = ({ label, error, name, control }: FileInputProps) => {
  const { field } = useController<{ [K in string]: FileItem[] }>({
    name,
    control,
  });
  const strings = useCandidateStrings();
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const [fileError, setFileError] = useState('');
  const add = (files: File[]) => {
    if (
      files.some(
        (file) =>
          file.size > 8 * 1024 * 1024 ||
          !/\.pdf$/i.test(file.name) ||
          (file.type && file.type !== 'application/pdf'),
      )
    ) {
      setFileError(strings.fileError);
      return;
    }
    setFileError('');
    field.onChange([...field.value, ...files.map((file) => ({ file }))]);
  };
  return (
    <div
      className="font-loose"
      onDragOver={(ev) => ev.preventDefault()}
      onDrop={(ev) => {
        ev.preventDefault();
        add([...ev.dataTransfer.files]);
      }}
    >
      {label && <p className="font-bold mb-2">{label}</p>}
      <p id={`${id}-hint`} className="text-[15px] mb-4">
        {strings.uploadHint}
      </p>
      <button
        type="button"
        aria-describedby={`${id}-hint${fileError ? ` ${id}-error` : ''}`}
        onClick={() => input.current?.click()}
        className="flex items-center gap-5 bg-white border-2 border-dashed border-black rounded-[10px] px-6 py-5 mb-4 hover:bg-[#f1f1f1]"
      >
        <CloudUploadSvg
          viewBox="0 0 112 77"
          width={58}
          height={40}
          aria-hidden="true"
        />
        <span className="font-bold text-[23px] sm:text-[18px]">
          {strings.upload}
        </span>
      </button>
      <input
        ref={input}
        type="file"
        accept="application/pdf,.pdf"
        multiple
        className="hidden"
        aria-label={strings.upload}
        onChange={(ev) => {
          add([...(ev.target.files ?? [])]);
          ev.target.value = '';
        }}
      />
      {(fileError || error?.message) && (
        <p id={`${id}-error`} role="alert" className="mb-4 text-[15px]">
          {fileError || error?.message}
        </p>
      )}
      <div className="flex flex-wrap sm:flex-col gap-4">
        {field.value.map((item, i) => (
          <FileInputItem
            key={i}
            item={item}
            onDelete={() =>
              field.onChange(field.value.filter((_, index) => index !== i))
            }
          />
        ))}
      </div>
    </div>
  );
};
