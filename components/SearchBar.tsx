
import React, { useMemo } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import Icon from './Icon';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChangeText, 
  placeholder = "Rechercher une orchidée..." 
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  
  return (
    <View style={styles.container}>
      <Icon name="search-outline" size={20} color={colors.textLight} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
      />
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginVertical: 12,
    shadowColor: colors.shadowLight,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: colors.greyLight,
    elevation: 4,
  },
  icon: {
    marginRight: 16,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 0.2,
  },
});

export default SearchBar;
