
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';

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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chip: {
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  selectedChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  },
  selectedChipText: {
    color: 'white',
  },
});

export default FilterChips;
