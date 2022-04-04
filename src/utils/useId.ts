import { useMemo } from 'react';

let i = 0;

export const useId = () => {
  return useMemo(() => {
    return String(i++);
  }, []);
};
