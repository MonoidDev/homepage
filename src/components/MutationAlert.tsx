import { useEffect } from 'react';

import LoadingCircleSvg from '@/assets/images/LoadingCircle.svg';

export interface BaseMutation {
  error?: any;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export interface MutationAlertProps {
  mutation: BaseMutation;
}

export interface MutationAlertProps {}

export const MutationAlert = (props: MutationAlertProps) => {
  const { mutation } = props;

  const { isLoading, error } = mutation;

  useEffect(() => {
    if (error) {
      alert(String(error));
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="z-40 fixed left-0 right-0 top-0 bottom-0 bg-white bg-opacity-90 flex items-center justify-center">
        <LoadingCircleSvg className="animate-spin" />
      </div>
    );
  }

  return null;
};
