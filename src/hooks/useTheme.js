import {useContext} from "react";
import {ThemeContext} from "../context/ThemeContext";

/**
 * Custom hook to access the theme context.
 * @returns {{theme: object, updateTheme: (newTheme: object) => void}} The current theme and a function to update it.
 * @example const { theme, updateTheme } = useTheme();
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}