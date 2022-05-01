import { useRef } from 'react';

import clsx from 'clsx';
import { Control, FieldError, useController } from 'react-hook-form';

import { FileItem } from '@/apis/files';
import CloudUploadSvg from '@/assets/images/CloudUpload.svg';
import DeleteBlack from '@/assets/images/DeleteBlack.svg';
import PdfSvg from '@/assets/images/Pdf.svg';

interface MobileFileInputItemProps {
  item: FileItem;
  onDelete?: () => void;
}

const MobileFileInputItem: React.VFC<MobileFileInputItemProps> = (props) => {
  const { item, onDelete } = props;

  return (
    <div
      className={clsx(
        'h-[100px] px-[20px] flex items-center gap-x-[20px] text-[22px] font-loose bg-white',
        'border border-black rounded-[5px]',
      )}
    >
      <PdfSvg
        width={50}
        height={70}
        viewBox="18 0 45 84"
        className="shrink-0"
      />
      <div className="whitespace-pre overflow-hidden text-ellipsis">
        {item.file?.name}
      </div>
      <div className="flex-1" />
      <button onClick={onDelete}>
        <DeleteBlack />
      </button>
    </div>
  );
};

export interface MobileFileInputProps {
  label?: string;
  error?: FieldError;
  name: string;
  control: Control<any>;
}

export const MobileFileInput: React.VFC<MobileFileInputProps> = (props) => {
  const { name, control } = props;

  const controller = useController<{ [K in string]: FileItem[] }>({
    name,
    control,
  });

  const uploadRef = useRef<HTMLInputElement>(null);

  const renderUploadButton = () => (
    <>
      <button
        className={clsx(
          'w-[216px] h-[60px] flex items-center justify-center gap-x-[1rem] mb-[1rem]',
          'bg-white border border-black rounded-[5px] font-loose font-bold',
        )}
        onClick={() => uploadRef.current?.click()}
      >
        <CloudUploadSvg height={40} width={58} viewBox="0 0 112 77" />
        <div className="text-[30px] pt-[4px]">Upload</div>
      </button>
      <input
        type="file"
        accept="application/pdf"
        className="hidden"
        ref={uploadRef}
        onChange={async (e) => {
          // Safari doesn't work with select-files
          const files = e.target.files ?? [];
          if (files[0]) {
            controller.field.onChange([
              ...controller.field.value,
              { file: files[0] },
            ]);
          }
        }}
      />
    </>
  );

  const renderFileItems = () => (
    <div className="flex flex-col gap-y-[20px]">
      {controller.field.value.map((file, i) => (
        <MobileFileInputItem
          key={i}
          item={file}
          onDelete={() =>
            controller.field.onChange(
              controller.field.value.filter((_, j) => j !== i),
            )
          }
        />
      ))}
    </div>
  );

  return (
    <div>
      {renderUploadButton()}
      {renderFileItems()}
    </div>
  );
};
