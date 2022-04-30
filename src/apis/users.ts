import { useMutation } from 'react-query';

import { invokeHttp } from '@/utils/invokeHttp';

export interface LoginUser {
  email: string;
  password: string;
}

export interface UserAuth {
  username: string;
  email: string;
  image: string;
  token: string;
}

export const postLogin = async (body: LoginUser) => {
  return await invokeHttp<UserAuth, {}, LoginUser>(
    'post',
    '/users/login',
    undefined,
    body,
  );
};

export const usePostLogin = () => useMutation(postLogin);
