import { AsyncLocalStorage } from 'async_hooks';

import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { HTTPError, RequestError } from './invokeHttp';

export const nodeAuthStorage = new AsyncLocalStorage<string | undefined>();

export const withAuth = <T extends {}>(get: GetServerSideProps<T>) => {
  return async (context: GetServerSidePropsContext) => {
    const login = () => ({
      redirect: {
        permanent: false as const,
        destination: `/admin/login/?next=${encodeURIComponent(context.resolvedUrl)}`,
      },
    });
    if (!context.req.cookies.token) return login();
    return await nodeAuthStorage.run(context.req.cookies.token, async () => {
      try {
        return await get(context);
      } catch (e) {
        if (e instanceof HTTPError) {
          if (e.response.status === 401) return login();
          if (e.response.status === 404) return { notFound: true as const };
          // An authenticated denial must not send the user through a login loop.
          if (e.response.status === 403) {
            return {
              redirect: {
                permanent: false as const,
                destination: '/admin/?error=forbidden',
              },
            };
          }
          if (e.response.status >= 500)
            return {
              redirect: {
                permanent: false as const,
                destination: '/admin/?error=unavailable',
              },
            };
          throw e;
        }
        if (e instanceof RequestError)
          return {
            redirect: {
              permanent: false as const,
              destination: '/admin/?error=unavailable',
            },
          };
        throw e;
      }
    });
  };
};
