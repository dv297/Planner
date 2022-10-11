import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { MuiThemeProvider } from '@material-ui/core';
import { useTheme } from 'next-themes';

import { getTheme } from '@src/lib/createTheme';

interface ThemeSwitcherProps {
  children: ReactNode;
}

interface ThemeSwitcherContextType {
  theme: undefined | string;
  toggleTheme: () => void;
}

const ThemeSwitcherContext = createContext<ThemeSwitcherContextType>({
  theme: undefined,
  toggleTheme: () => {},
});

const ThemeSwitcherProvider = (props: ThemeSwitcherProps) => {
  const { children } = props;
  const { setTheme, resolvedTheme: theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  const toggleTheme = useCallback(() => {
    if (theme !== 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [theme, setTheme]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeSwitcherContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeSwitcherContext.Provider>
  );
};

const ThemeSwitcher = () => {
  const themeContext = useContext(ThemeSwitcherContext);
  const { theme, toggleTheme } = themeContext;

  const icon = theme === 'dark' ? <MoonIcon /> : <SunIcon />;

  return (
    <button
      onClick={toggleTheme}
      title="Toggle theme"
      className="h-full w-full"
    >
      {icon}
    </button>
  );
};

const MuiWrapper = (props: ThemeSwitcherProps) => {
  const { resolvedTheme } = useTheme();
  return (
    <MuiThemeProvider theme={getTheme(resolvedTheme)}>
      {props.children}
    </MuiThemeProvider>
  );
};

export default ThemeSwitcherProvider;
export { ThemeSwitcher, MuiWrapper };
