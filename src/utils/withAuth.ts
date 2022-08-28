import { AsyncLocalStorage } from 'async_hooks';

import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { HTTPError } from './invokeHttp';

export const nodeAuthStorage = new AsyncLocalStorage<string | undefined>();

export const withAuth = <T extends {}>(get: GetServerSideProps<T>) => {
  return async (context: GetServerSidePropsContext) => {
    return await nodeAuthStorage.run(context.req.cookies.token, async () => {
      try {
        return await get(context);
      } catch (e) {
        if (e instanceof HTTPError) {
          if (e.response.status === 403) {
            return {
              redirect: {
                statusCode: 301 as const,
                destination: `/admin/login?next=${context.resolvedUrl}`,
              },
            };
          }
          throw e;
        }
        throw e;
      }
    });
  };
};
