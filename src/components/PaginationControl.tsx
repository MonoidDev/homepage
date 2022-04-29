import { Paginated } from '@/apis/utils';

export const PaginationControl = <N extends string, T>(props: {
  result?: Paginated<N, T>;
  offset: number;
  limit?: number;
  onChangeOffset: (v: number) => void;
}) => {
  const { result, offset, limit = 10, onChangeOffset } = props;

  const page = Math.floor(offset / limit) + 1;

  return (
    <div className="flex font-loose text-md gap-x-[0.5rem]">
      <span>Page {page}</span>
      <button
        disabled={page <= 1}
        onClick={() => onChangeOffset(offset - limit)}
      >
        {'<'}
      </button>
      <button
        disabled={offset + limit >= (result?.count ?? 0)}
        onClick={() => onChangeOffset(offset + limit)}
      >
        {'>'}
      </button>
    </div>
  );
};
