import clsx from 'clsx';
import { Control, FieldError, useController } from 'react-hook-form';
import selectFiles from 'select-files';

import { FileItem } from '@/apis/files';
import CloseSvg from '@/assets/images/Close.svg';
import CloudUploadSvg from '@/assets/images/CloudUpload.svg';
import HamburgerSvg from '@/assets/images/Hamburger.svg';
import PdfSvg from '@/assets/images/Pdf.svg';

export interface FileInputItemProps {
  item: FileItem;
  onDelete?: () => void;
}

export const FileInputItem: React.VFC<FileInputItemProps> = (props) => {
  const { item, onDelete } = props;

  return (
    <div
      className={clsx(
        'bg-white h-[131.5px] w-[131.5px] p-[1rem] pb-[0px] rounded-[10px]',
        'flex flex-col items-center relative',
      )}
    >
      <PdfSvg />
      <div
        title={item.file?.name ?? 'File'}
        className="self-stretch font-bold leading-none mt-[0.25rem] overflow-hidden text-center whitespace-pre text-ellipsis"
      >
        {item.file?.name ?? 'File'}
      </div>

      <button className="absolute right-[-20px] top-[-20px]" onClick={onDelete}>
        <CloseSvg />
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

export const FileInput: React.VFC<FileInputProps> = (props) => {
  const { label, error, name, control } = props;

  const controller = useController<{ [K in string]: FileItem[] }>({
    name,
    control: control as any,
  });

  const { value } = controller.field;

  const onAddFiles = (files: File[]) => {
    if (files.some((f) => f.size >= 8 * 1024 * 1024)) {
      alert('Sorry, we cannot upload files bigger than 8Mb. ');
      return;
    }
    controller.field.onChange([...value, ...files.map((file) => ({ file }))]);
  };

  const renderUploadButton = () => (
    <div
      onClick={async () => {
        const fileList = await selectFiles({
          accept: 'application/pdf',
          multiple: true,
        });

        if (fileList) {
          onAddFiles([...fileList]);
        }
      }}
      className="flex cursor-pointer px-[60px] py-[20px] bg-white border-[#DFDFDF] border-[3px] border-dashed rounded-[10px] gap-x-[60px] items-center"
    >
      <CloudUploadSvg />
      <div>
        <div className="text-[25px] font-bold mb-[0.5rem] select-none">
          {'Drag & Drop a file'}
        </div>
        <div
          className={clsx(
            'rounded-[15px] px-[16px] py-[4px] border border-black',
            'text-[20px] font-bold flex items-center gap-x-2',
            'select-none',
          )}
        >
          import from
          <div className="flex-1" />
          <HamburgerSvg />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="flex flex-col font-loose"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        const files = [...ev.dataTransfer.files];

        if (files.some((f) => f.type !== 'application/pdf')) {
          alert('Only PDF files are allowed. ');
          return;
        }

        onAddFiles(files);
      }}
    >
      {label && (
        <div className="flex">
          <label className="text-[23px] font-loose font-bold leading-tight flex mb-[1rem]">
            <div className="w-[3px] bg-black opacity-40 ml-[0.25rem] mr-[0.75rem] mb-[0.25rem]" />
            {label}
          </label>
          {error?.message && <span>{error.message}</span>}
        </div>
      )}

      <div className="flex flex-wrap gap-x-8 gap-y-6">
        {renderUploadButton()}
        {value.map((item, i) => (
          <FileInputItem
            key={i}
            item={item}
            onDelete={() =>
              controller.field.onChange(value.filter((v, j) => j !== i))
            }
          />
        ))}
      </div>
    </div>
  );
};
