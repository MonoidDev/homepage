import React, { useContext } from 'react';

export type Theme = 'black' | 'white';

export interface ThemeContextValue {
  theme: Theme;
}

export const ThemeContext = React.createContext<ThemeContextValue>({
  theme: 'white',
});

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => useContext(ThemeContext);
