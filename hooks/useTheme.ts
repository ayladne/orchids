import { useState, useEffect } from 'react';
import { getColors, getIsDarkMode, setTheme } from '../styles/commonStyles';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(getIsDarkMode());
  const [colors, setColors] = useState(getColors());

  const updateTheme = (darkMode: boolean) => {
    setTheme(darkMode);
    setIsDark(darkMode);
    setColors(getColors());
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    updateTheme(newIsDark);
    return newIsDark;
  };

  return {
    isDark,
    colors,
    toggleTheme,
    setTheme: updateTheme,
  };
};