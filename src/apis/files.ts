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

  if (!response.ok) throw new Error('File upload failed');
  const data: unknown = await response.json();
  if (
    !data ||
    typeof data !== 'object' ||
    !('url' in data) ||
    typeof data.url !== 'string'
  ) {
    throw new Error('Upload response did not include a file URL');
  }
  const url = new URL(data.url);
  if (!['https:', 'http:'].includes(url.protocol))
    throw new Error('Invalid upload URL');
  return { url: url.href };
};

export const usePostFile = () => useMutation(postFile);
