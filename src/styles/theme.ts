import React, { useContext } from 'react';

export type Theme = 'black' | 'white';

export interface ThemeContextValue {
  theme: Theme;
  navbarHeight: number;
  loadingDone: boolean;
}

export const ThemeContext = React.createContext<ThemeContextValue>({} as any);

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => useContext(ThemeContext);
