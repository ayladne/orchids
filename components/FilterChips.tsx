
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface FilterChipsProps {
  filters: string[];
  selectedFilter: string;
  onFilterSelect: (filter: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ 
  filters, 
  selectedFilter, 
  onFilterSelect 
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.chip,
            selectedFilter === filter && styles.selectedChip
          ]}
          onPress={() => onFilterSelect(filter)}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.chipText,
            selectedFilter === filter && styles.selectedChipText
          ]}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  chip: {
    backgroundColor: colors.card,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 2,
    borderColor: colors.greyLight,
    shadowColor: colors.shadowLight,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.16,
    shadowRadius: 12,
  },
  chipText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.3,
  },
  selectedChipText: {
    color: 'white',
    fontWeight: '700',
  },
});

export default FilterChips;
