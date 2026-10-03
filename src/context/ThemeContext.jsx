import { createContext, useState, useEffect } from "react";

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export const ThemeContext = createContext();

/**
 * ThemeProvider component that provides theme-related data and actions
 * to the rest of the application via the ThemeContext.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the theme context.
 * @returns {JSX.Element} The context provider wrapping the child components.
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => ({
    mode: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? THEMES.DARK
      : THEMES.LIGHT,
  }));

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    //const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const htmlElement = document.documentElement;
    //console.log("Theme mode useEffect:", theme.mode, htmlElement.classList);
    htmlElement.classList.toggle("dark", theme.mode === "dark");
    htmlElement.classList.toggle("light", theme.mode === "light");
  }, [theme.mode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        updateTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
