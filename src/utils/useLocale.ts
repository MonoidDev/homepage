import { useRouter } from 'next/router';

export type Locale = 'en-US' | 'ja-JP' | 'zh-CN';

export const useLocale = (): Locale => {
  const { locale = 'en-US' } = useRouter();

  return locale as Locale;
};
