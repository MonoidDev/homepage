import { auth } from './auth';

export class HTTPError extends Error {
  public constructor(
    message: string,
    public response: Response,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'HTTPError';
  }
  public toString() {
    return `${this.response.status}: ${this.message}`;
  }
}

export class RequestError extends Error {
  public constructor(public kind: 'timeout' | 'network' | 'response') {
    super(
      kind === 'timeout'
        ? 'The request timed out.'
        : kind === 'network'
          ? 'The request could not reach the server.'
          : 'The server returned an invalid response.',
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'RequestError';
  }
}

export const invokeHttp = async <R, Q extends {} = any, B = any>(
  method: 'get' | 'post' | 'patch' | 'put' | 'delete',
  path: string,
  query?: Q,
  data?: B,
): Promise<R> => {
  const search = query ? '?' + new URLSearchParams(query).toString() : '';
  const body = data === undefined ? undefined : JSON.stringify(data);
  let token: string | undefined | null;
  if (typeof window !== 'undefined') {
    token = auth.getToken();
  } else {
    const { nodeAuthStorage } = require('./withAuth');
    token = nodeAuthStorage.getStore();
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}${path}${search}`,
      {
        method: method.toUpperCase(),
        headers: {
          'content-type': 'application/json',
          ...(token && { authorization: `Token ${token}` }),
        },
        body,
        signal: controller.signal,
      },
    );
    const text = await response.text();
    if (!response.ok) throw new HTTPError(text, response);
    if (!text.trim()) return undefined as R;
    try {
      return JSON.parse(text) as R;
    } catch {
      throw new RequestError('response');
    }
  } catch (error) {
    if (error instanceof HTTPError || error instanceof RequestError)
      throw error;
    throw new RequestError(controller.signal.aborted ? 'timeout' : 'network');
  } finally {
    clearTimeout(timeout);
  }
};
