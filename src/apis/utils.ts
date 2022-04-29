export interface PageParams {
  limit: number;
  offset: number;
}

export type Paginated<N extends string, T> = {
  count: number;
} & {
  [K in N]: T[];
};
