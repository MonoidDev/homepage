import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { usePostLogin } from '@/apis/users';
import { MutationAlert } from '@/components/MutationAlert';
import { auth } from '@/utils/auth';
import { HTTPError } from '@/utils/invokeHttp';

export default function Login() {
  const postLogin = usePostLogin();

  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form
      className="px-[4rem] py-[2rem] flex flex-col gap-y-2"
      onSubmit={handleSubmit(async (values) => {
        try {
          const response = await postLogin.mutateAsync(values);
          auth.setToken(response.token);
          Cookies.set('token', response.token);
          router.push((router.query.next as string) ?? '/admin/recruit/');
        } catch (e) {
          if (e instanceof HTTPError) {
            alert('Your credentials are rejected. ');
          } else {
            alert(String(e));
          }
        }
      })}
    >
      <MutationAlert mutation={postLogin} />

      <h2 className="text-[36px] font-loose mb-[1rem]">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-[33%] p-[0.5rem] border border-black"
        {...register('email', { required: 'Requried' })}
      />
      <input
        type="password"
        className="w-[33%] p-[0.5rem] border border-black"
        {...register('password', { required: 'Required' })}
      />

      <button className="self-start border border-black p-[0.75rem]">
        LOGIN
      </button>
    </form>
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
