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
