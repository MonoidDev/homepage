import { auth } from './auth';

export const invokeHttp = async <R, Q extends {} = any, B = any>(
  method: 'get' | 'post' | 'patch' | 'put' | 'delete',
  path: string,
  query?: Q,
  data?: B,
): Promise<R> => {
  const search = query ? '?' + new URLSearchParams(query).toString() : '';
  const body = data ? JSON.stringify(data) : undefined;

  let token: string | undefined | null;

  if (typeof window !== 'undefined') {
    token = auth.getToken();
  } else {
    const { nodeAuthStorage } = require('./withAuth');
    token = nodeAuthStorage.getStore();
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}${path}${search}`,
    {
      method: method.toLocaleUpperCase('en-US'),
      headers: {
        'content-type': 'application/json',
        ...(token && {
          authorization: `Token ${token}`,
        }),
      },
      body,
    },
  );

  if (response.ok) {
    return await response.json();
  } else {
    const message = await response.text();
    throw new HTTPError(message, response);
  }
};

export class HTTPError {
  public constructor(
    public messsge: string,
    public response: Response,
  ) {}

  public toString() {
    return `${this.response.status}: ${this.messsge}`;
  }
}
