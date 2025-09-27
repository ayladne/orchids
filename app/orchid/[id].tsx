
import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions 
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { orchidsData } from '../../data/orchids';
import Icon from '../../components/Icon';
import { useTheme } from '../../hooks/useTheme';

const { width } = Dimensions.get('window');

export default function OrchidDetailScreen() {
  const { id } = useLocalSearchParams();
  const orchid = orchidsData.find(o => o.id === id);
  const { colors, isDark } = useTheme();
  const styles = createStyles(colors, isDark);

  if (!orchid) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Orchidée non trouvée</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
      'Rose': '#E91E63',
      'Violet': '#9C27B0',
      'Jaune': '#FFC107',
      'Orange': '#FF9800',
      'Rouge': '#F44336',
      'Bleu': '#2196F3',
      'Vert': '#4CAF50',
      'Brun': '#795548',
    };
    return colorMap[colorName] || colors.grey;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButtonContainer}
          >
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Hero Image */}
        <Image 
          source={{ uri: orchid.image }} 
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Content */}
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.name}>{orchid.name}</Text>
            <Text style={styles.scientificName}>{orchid.scientificName}</Text>
            
            <View style={styles.badges}>
              <View style={[styles.careLevel, { backgroundColor: getCareColor(orchid.careLevel) }]}>
                <Text style={styles.careLevelText}>{orchid.careLevel}</Text>
              </View>
              <View style={styles.familyBadge}>
                <Text style={styles.familyText}>{orchid.family}</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{orchid.description}</Text>
          </View>

          {/* Colors */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Couleurs disponibles</Text>
            <View style={styles.colorPalette}>
              {orchid.colors.map((color, index) => (
                <View key={index} style={styles.colorItem}>
                  <View 
                    style={[
                      styles.colorDot, 
                      { backgroundColor: getColorHex(color) }
                    ]} 
                  />
                  <Text style={styles.colorName}>{color}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Care Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations de culture</Text>
            
            <View style={styles.careGrid}>
              <View style={styles.careItem}>
                <Icon name="sunny-outline" size={20} color={colors.primary} />
                <Text style={styles.careLabel}>Lumière</Text>
                <Text style={styles.careValue}>{orchid.lightRequirement}</Text>
              </View>
              
              <View style={styles.careItem}>
                <Icon name="water-outline" size={20} color={colors.primary} />
                <Text style={styles.careLabel}>Arrosage</Text>
                <Text style={styles.careValue}>{orchid.waterRequirement}</Text>
              </View>
              
              <View style={styles.careItem}>
                <Icon name="thermometer-outline" size={20} color={colors.primary} />
                <Text style={styles.careLabel}>Température</Text>
                <Text style={styles.careValue}>{orchid.temperature}</Text>
              </View>
              
              <View style={styles.careItem}>
                <Icon name="cloud-outline" size={20} color={colors.primary} />
                <Text style={styles.careLabel}>Humidité</Text>
                <Text style={styles.careValue}>{orchid.humidity}</Text>
              </View>
            </View>
          </View>

          {/* Additional Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations générales</Text>
            
            <View style={styles.infoRow}>
              <Icon name="location-outline" size={18} color={colors.textLight} />
              <Text style={styles.infoLabel}>Origine:</Text>
              <Text style={styles.infoValue}>{orchid.origin}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Icon name="flower-outline" size={18} color={colors.textLight} />
              <Text style={styles.infoLabel}>Floraison:</Text>
              <Text style={styles.infoValue}>{orchid.bloomingSeason}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Icon name="resize-outline" size={18} color={colors.textLight} />
              <Text style={styles.infoLabel}>Taille:</Text>
              <Text style={styles.infoValue}>{orchid.size}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 10,
  },
  backButtonContainer: {
    backgroundColor: isDark ? 'rgba(45, 45, 45, 0.95)' : 'rgba(255, 255, 255, 0.92)',
    borderRadius: 24,
    padding: 12,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
  },
  heroImage: {
    width: width,
    height: 300,
  },
  content: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  titleSection: {
    marginBottom: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'PlayfairDisplay_700Bold',
    marginBottom: 4,
  },
  scientificName: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.textLight,
    fontFamily: 'Inter_400Regular',
    marginBottom: 16,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  careLevel: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  careLevelText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Inter_600SemiBold',
  },
  familyBadge: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.grey,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  familyText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
    fontFamily: 'Inter_500Medium',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.grey,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  colorName: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Inter_400Regular',
  },
  careGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  careItem: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: (width - 60) / 2,
    borderWidth: 1,
    borderColor: colors.grey,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  careLabel: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: 'Inter_400Regular',
    marginTop: 8,
    marginBottom: 4,
  },
  careValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textLight,
    fontFamily: 'Inter_400Regular',
    marginLeft: 8,
    marginRight: 8,
    minWidth: 80,
  },
  infoValue: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Inter_400Regular',
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.text,
    fontFamily: 'Inter_400Regular',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  },
});
