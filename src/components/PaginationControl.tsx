import { makeStrings } from '@monoid-dev/use-strings';

import { Paginated } from '@/apis/utils';

const useStrings = makeStrings({
  'en-US': {
    previous: 'Previous page',
    next: 'Next page',
    page: 'Page',
    items: 'items',
  },
  'ja-JP': {
    previous: '前のページ',
    next: '次のページ',
    page: 'ページ',
    items: '件',
  },
  'zh-CN': { previous: '上一页', next: '下一页', page: '页码', items: '项' },
});
export const PaginationControl = <N extends string, T>(props: {
  result?: Paginated<N, T>;
  offset: number;
  limit?: number;
  onChangeOffset: (v: number) => void;
}) => {
  const { result, offset, limit = 10, onChangeOffset } = props;
  const strings = useStrings();
  const safeLimit = Math.max(1, limit);
  const page = Math.floor(offset / safeLimit) + 1;
  return (
    <div className="flex items-center font-loose gap-x-2">
      <span aria-live="polite">
        {strings.page} {page}, {result?.count ?? 0} {strings.items}
      </span>
      <button
        type="button"
        aria-label={strings.previous}
        className="min-h-[44px] min-w-[44px] disabled:opacity-40"
        disabled={page <= 1}
        onClick={() => onChangeOffset(Math.max(0, offset - safeLimit))}
      >
        {'<'}
      </button>
      <button
        type="button"
        aria-label={strings.next}
        className="min-h-[44px] min-w-[44px] disabled:opacity-40"
        disabled={offset + safeLimit >= (result?.count ?? 0)}
        onClick={() => onChangeOffset(offset + safeLimit)}
      >
        {'>'}
      </button>
    </div>
  );
};
