import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

interface ThemeToggleProps {
  onToggle?: (isDark: boolean) => void;
  size?: number;
  style?: object;
}

export default function ThemeToggle({ onToggle, size = 28, style }: ThemeToggleProps) {
  const { colors, isDark, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleToggle = () => {
    const newIsDark = toggleTheme();
    onToggle?.(newIsDark);
  };

  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={handleToggle}
      activeOpacity={0.7}
    >
      <Ionicons 
        name={isDark ? "sunny" : "moon"} 
        size={size} 
        color={colors.primary} 
      />
    </TouchableOpacity>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: colors.card,
    borderColor: colors.grey,
    shadowColor: colors.shadowLight,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});