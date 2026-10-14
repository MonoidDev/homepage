export interface PageParams {
  limit: number;
  offset: number;
}

export type Paginated<N extends string, T> = {
  count: number;
} & {
  [K in N]: T[];
};

export const safeHttpUrl = (value: string | undefined): string | undefined => {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) &&
      !url.username &&
      !url.password
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
};

// Add other download origins only after verifying the file service configuration.
export const safeDownloadUrl = (value: string): string | undefined => {
  const href = safeHttpUrl(value);
  if (!href) return undefined;
  const configured = [
    process.env.NEXT_PUBLIC_SERVER,
    ...(process.env.NEXT_PUBLIC_DOWNLOAD_ORIGINS ?? '').split(','),
  ];
  const origins = configured.flatMap((origin) => {
    try {
      return origin ? [new URL(origin.trim()).origin] : [];
    } catch {
      return [];
    }
  });
  return origins.includes(new URL(href).origin) ? href : undefined;
};
