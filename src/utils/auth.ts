import React, { useEffect, useState } from 'react';

let token: string | null = null;

let subs: ((token: string | null) => void)[] = [];

export const auth = {
  setToken: (t: string | null) => {
    token = t;
    if (t) {
      globalThis.localStorage?.setItem('token', t);
    } else {
      globalThis.localStorage?.removeItem('token');
    }
    subs.forEach((cb) => cb(t));
  },
  subscribe: (cb: (token: string | null) => void) => {
    subs.push(cb);
    return () => {
      subs = subs.filter((s) => s !== cb);
    };
  },
  getToken: () => {
    if (token === null) {
      token = globalThis.localStorage?.getItem('token');
    }
    return token;
  },
};

export const AuthContext = React.createContext<string | null>(null);

export const useToken = () => {
  const [token, setToken] = useState(auth.getToken());

  useEffect(() => {
    return auth.subscribe(setToken);
  }, []);

  return token;
};

// Only normalized local admin routes can be used after signing in.
export const safeAdminNext = (next: unknown, origin: string): string => {
  if (
    typeof next !== 'string' ||
    !next ||
    /[\\\s]/.test(next) ||
    next.startsWith('//')
  )
    return '/admin/';
  try {
    const url = new URL(next, origin);
    if (url.origin !== origin || !/^https?:$/.test(url.protocol))
      return '/admin/';
    const decoded = decodeURIComponent(url.pathname);
    if (
      decoded !== url.pathname ||
      (url.pathname !== '/admin' && !url.pathname.startsWith('/admin/'))
    )
      return '/admin/';
    if (url.pathname === '/admin/login' || url.pathname === '/admin/login/')
      return '/admin/';
    return `${url.pathname === '/admin' ? '/admin/' : url.pathname}${url.search}${url.hash}`;
  } catch {
    return '/admin/';
  }
};
