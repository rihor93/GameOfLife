import React, { createContext, FC, useContext, useEffect, useMemo, useState } from 'react';

export type TokenProviderProps = {
  children: React.ReactNode;
};

export type Token = string;

export type TokenCallbacks = {
  login: (userName: string) => void;
  logout: () => void;
};

export type TokenContextType = [Token, TokenCallbacks];

const TokenContext = createContext<TokenContextType>({} as TokenContextType);

export const useTokenContext = (): TokenContextType => useContext(TokenContext);

export const TokenProvider: FC<TokenProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token && token.length > 0) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const callbacks = useMemo(
    () => ({ login: (userName: string) => setToken(userName), logout: () => setToken('') }),
    []
  );

  return <TokenContext.Provider value={[token, callbacks]}>{children}</TokenContext.Provider>;
};
