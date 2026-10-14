import { useEffect, useState } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';

import LoadingCircleSvg from '@/assets/images/LoadingCircle.svg';

export interface BaseMutation {
  error?: any;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}
export interface MutationAlertProps {
  mutation: BaseMutation;
  hideError?: boolean;
}

const useStrings = makeStrings({
  'en-US': {
    sending: 'Sending…',
    error:
      'We couldn’t send your information. Your entries are still here. Please try again.',
    dismiss: 'Dismiss error',
  },
  'ja-JP': {
    sending: '送信中…',
    error:
      '送信できませんでした。入力内容は保持されています。もう一度お試しください。',
    dismiss: 'エラーを閉じる',
  },
  'zh-CN': {
    sending: '正在发送…',
    error: '发送失败。您填写的内容已保留，请重试。',
    dismiss: '关闭错误提示',
  },
});

export const MutationAlert = ({
  mutation,
  hideError = false,
}: MutationAlertProps) => {
  const strings = useStrings();
  const [dismissed, setDismissed] = useState(false);
  const { isLoading, isError, error } = mutation;
  useEffect(() => {
    setDismissed(false);
  }, [error, isLoading, isError]);
  if (isLoading)
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex shrink-0 items-center justify-center gap-3 border-b border-current bg-white p-4 font-loose text-black"
      >
        <LoadingCircleSvg
          aria-hidden="true"
          className="h-6 w-6 motion-safe:animate-spin"
        />
        {strings.sending}
      </div>
    );
  if (!hideError && (isError || error) && !dismissed)
    return (
      <div
        role="alert"
        className="flex shrink-0 items-center justify-between gap-4 border border-current bg-white p-4 font-loose text-black"
      >
        <p>{strings.error}</p>
        <button
          type="button"
          aria-label={strings.dismiss}
          className="min-h-[44px] min-w-[44px] text-2xl"
          onClick={() => setDismissed(true)}
        >
          ×
        </button>
      </div>
    );
  return null;
};
