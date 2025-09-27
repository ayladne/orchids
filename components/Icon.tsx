import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  style?: object;
  color?: string;
}

export default function Icon({ name, size = 40, style, color }: IconProps) {
  const { colors } = useTheme();
  const defaultColor = color || colors.text;
  return (
    <View style={[styles.iconContainer, style]}>
      <Ionicons name={name} size={size} color={defaultColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
