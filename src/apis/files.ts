import { useMutation } from 'react-query';

export interface FileItem {
  file?: File;
  url?: string;
}

export interface UploadedFile {
  url: string;
}

export const postFile = async (file: File): Promise<UploadedFile> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/files`, {
    method: 'POST',
    body: formData,
  });

  return await response.json();
};

export const usePostFile = () => useMutation(postFile);
