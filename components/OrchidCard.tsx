
import React, { useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { useTheme } from '../hooks/useTheme';
import { Orchid } from '../data/orchids';
import Icon from './Icon';

interface OrchidCardProps {
  orchid: Orchid;
  onPress: () => void;
  featured?: boolean;
  horizontal?: boolean;
}

const OrchidCard: React.FC<OrchidCardProps> = ({ orchid, onPress, featured = false, horizontal = false }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const getCareColor = (level: string) => {
    switch (level) {
      case 'Facile': return colors.success;
      case 'Modéré': return '#FF9800';
      case 'Difficile': return '#F44336';
      default: return colors.textLight;
    }
  };

  const getColorHex = (colorName: string): string => {
    const colorMap: { [key: string]: string } = {
      'Blanc': '#FFFFFF',
      'Rose': colors.accent,
      'Violet': colors.primary,
      'Jaune': '#FBBF24',
      'Orange': '#FB923C',
      'Rouge': colors.error,
      'Bleu': '#3B82F6',
      'Vert': colors.success,
      'Brun': '#92400E',
    };
    return colorMap[colorName] || colors.grey;
  };

  return (
    <TouchableOpacity 
      style={[
        horizontal ? styles.horizontalCard : styles.card, 
        featured && (horizontal ? styles.horizontalFeaturedCard : styles.featuredCard)
      ]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: orchid.image }} 
        style={[
          horizontal ? styles.horizontalImage : styles.image,
          featured && (horizontal ? styles.horizontalFeaturedImage : styles.featuredImage)
        ]}
        resizeMode="cover"
      />
      
      <View style={horizontal ? styles.horizontalContent : styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.name, featured && styles.featuredName]}>
              {orchid.name}
            </Text>
            <Text style={styles.scientificName}>
              {orchid.scientificName}
            </Text>
          </View>
          
          <View style={[styles.careLevel, { backgroundColor: getCareColor(orchid.careLevel) }]}>
            <Text style={styles.careLevelText}>{orchid.careLevel}</Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={featured ? 3 : 2}>
          {orchid.description}
        </Text>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Icon name="location-outline" size={16} color={colors.textLight} />
            <Text style={styles.detailText}>{orchid.origin}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Icon name="flower-outline" size={16} color={colors.textLight} />
            <Text style={styles.detailText}>{orchid.bloomingSeason}</Text>
          </View>
        </View>

        <View style={styles.colorPalette}>
          {orchid.colors.slice(0, 4).map((color, index) => (
            <View 
              key={index} 
              style={[
                styles.colorDot, 
                { backgroundColor: getColorHex(color) }
              ]} 
            />
          ))}
          {orchid.colors.length > 4 && (
            <Text style={styles.moreColors}>+{orchid.colors.length - 4}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    marginVertical: 8,
    marginHorizontal: 16,
    boxShadow: `0px 8px 24px ${colors.shadowLight}`,
    borderWidth: 1,
    borderColor: colors.greyLight,
    elevation: 6,
    overflow: 'hidden',
  },
  featuredCard: {
    marginVertical: 16,
    boxShadow: `0px 16px 40px ${colors.shadow}`,
    borderColor: colors.primaryLight,
    borderWidth: 2,
    elevation: 12,
  },
  image: {
    width: '100%',
    height: 180,
  },
  featuredImage: {
    height: 220,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  featuredName: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
  },
  scientificName: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.textLight,
    fontFamily: 'Inter_400Regular',
    marginBottom: 2,
  },
  careLevel: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  careLevelText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Inter_600SemiBold',
  },
  description: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
    fontFamily: 'Inter_400Regular',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 4,
    fontFamily: 'Inter_400Regular',
  },
  colorPalette: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 6,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  moreColors: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 4,
    fontFamily: 'Inter_400Regular',
  },
  // Styles pour le mode horizontal
  horizontalCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    marginVertical: 8,
    marginHorizontal: 0,
    boxShadow: `0px 4px 12px ${colors.shadow}`,
    elevation: 4,
    overflow: 'hidden',
    width: 280,
    height: 320,
  },
  horizontalFeaturedCard: {
    marginVertical: 12,
    boxShadow: `0px 8px 24px ${colors.shadow}`,
    elevation: 8,
    width: 300,
    height: 360,
  },
  horizontalImage: {
    width: '100%',
    height: 160,
  },
  horizontalFeaturedImage: {
    height: 180,
  },
  horizontalContent: {
    padding: 12,
    flex: 1,
  },
});

export default OrchidCard;
