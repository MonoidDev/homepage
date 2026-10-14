import { useId, useRef, useState } from 'react';

import { makeStrings } from '@monoid-dev/use-strings';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { usePostLogin } from '@/apis/users';
import { auth, safeAdminNext } from '@/utils/auth';
import { HTTPError } from '@/utils/invokeHttp';

const useStrings = makeStrings({
  'en-US': {
    title: 'Login',
    email: 'Email',
    password: 'Password',
    submit: 'LOGIN',
    pending: 'Signing in…',
    credentials: 'Email or password was not accepted. Please try again.',
    unavailable: 'Sign-in is unavailable. Please try again shortly.',
  },
  'ja-JP': {
    title: 'ログイン',
    email: 'メールアドレス',
    password: 'パスワード',
    submit: 'ログイン',
    pending: 'ログイン中…',
    credentials: 'メールアドレスまたはパスワードをご確認ください。',
    unavailable: '現在ログインできません。しばらくしてからお試しください。',
  },
  'zh-CN': {
    title: '登录',
    email: '电子邮箱',
    password: '密码',
    submit: '登录',
    pending: '登录中…',
    credentials: '邮箱或密码不正确，请重试。',
    unavailable: '暂时无法登录，请稍后重试。',
  },
});

export default function Login() {
  const postLogin = usePostLogin();
  const router = useRouter();
  const strings = useStrings();
  const id = useId();
  const errorRef = useRef<HTMLDivElement>(null);
  const inFlight = useRef(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm({
    defaultValues: { email: '', password: '' },
  });
  return (
    <main className="flex-1 min-h-0 overflow-auto">
      <form
        className="w-full max-w-[480px] mx-auto px-7 py-8 flex flex-col gap-3"
        onSubmit={handleSubmit(async (values) => {
          if (inFlight.current) return;
          inFlight.current = true;
          setError('');
          try {
            const response = await postLogin.mutateAsync(values);
            if (!response?.token) throw new Error('Missing token');
            auth.setToken(response.token);
            Cookies.set('token', response.token);
            await router.push(
              safeAdminNext(router.query.next, window.location.origin),
            );
          } catch (e) {
            setError(
              e instanceof HTTPError && [401, 403].includes(e.response.status)
                ? strings.credentials
                : strings.unavailable,
            );
            requestAnimationFrame(() => errorRef.current?.focus());
          } finally {
            inFlight.current = false;
          }
        })}
      >
        <h1 className="text-[36px] font-loose mb-4">{strings.title}</h1>
        {error && (
          <div
            ref={errorRef}
            role="alert"
            tabIndex={-1}
            className="border border-black p-3"
          >
            {error}
          </div>
        )}
        <label htmlFor={`${id}-email`}>{strings.email}</label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="username"
          required
          className="w-full p-3 border border-black"
          {...register('email', {
            required: true,
            setValueAs: (v: string) => v.trim(),
          })}
        />
        <label htmlFor={`${id}-password`}>{strings.password}</label>
        <input
          id={`${id}-password`}
          type="password"
          autoComplete="current-password"
          required
          className="w-full p-3 border border-black"
          {...register('password', { required: true })}
        />
        <button
          type="submit"
          disabled={postLogin.isLoading}
          className="self-start border border-black p-3 mt-2 disabled:opacity-60"
        >
          {postLogin.isLoading ? strings.pending : strings.submit}
        </button>
      </form>
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: {
      theme: 'white',
      title: 'Admin | 合同会社Monoid | G.K. Monoid | Monoid',
      screenHeight: true,
    },
  };
}
