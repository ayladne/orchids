
import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  StatusBar,
  FlatList,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, commonStyles } from '../styles/commonStyles';
import { orchidsData } from '../data/orchids';
import OrchidCard from '../components/OrchidCard';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import SimpleBottomSheet from '../components/BottomSheet';
import Icon from '../components/Icon';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';

const filters = ['Tous', 'Facile', 'Modéré', 'Difficile', 'En fleur'];

export default function MainScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    PlayfairDisplay_700Bold,
  });

  const filteredOrchids = useMemo(() => {
    let filtered = orchidsData;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(orchid =>
        orchid.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        orchid.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        orchid.origin.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by care level
    if (selectedFilter !== 'Tous') {
      if (selectedFilter === 'En fleur') {
        filtered = filtered.filter(orchid => orchid.bloomingSeason === 'Toute l\'année');
      } else {
        filtered = filtered.filter(orchid => orchid.careLevel === selectedFilter);
      }
    }

    return filtered;
  }, [searchQuery, selectedFilter]);

  const featuredOrchids = orchidsData.filter(orchid => orchid.isFeatured);

  const handleOrchidPress = (orchidId: string) => {
    console.log('Navigating to orchid:', orchidId);
    router.push(`/orchid/${orchidId}`);
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Orchidées</Text>
            <Text style={styles.subtitle}>Encyclopédie botanique</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => setIsBottomSheetVisible(true)}
          >
            <Icon name="menu-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Rechercher une orchidée..."
        />

        {/* Filter Chips */}
        <FilterChips 
          filters={filters}
          selectedFilter={selectedFilter}
          onFilterSelect={setSelectedFilter}
        />

        {/* Featured Section */}
        {searchQuery === '' && selectedFilter === 'Tous' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Orchidées vedettes</Text>
            <FlatList
              data={featuredOrchids}
              renderItem={({ item }) => (
                <OrchidCard
                  orchid={item}
                  onPress={() => handleOrchidPress(item.id)}
                  featured={true}
                  horizontal={true}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
            />
          </View>
        )}

        {/* All Orchids Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {searchQuery || selectedFilter !== 'Tous' 
              ? `Résultats (${filteredOrchids.length})`
              : 'Toutes les orchidées'
            }
          </Text>
          
          {filteredOrchids.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="flower-outline" size={48} color={colors.textLight} />
              <Text style={styles.emptyStateText}>
                Aucune orchidée trouvée
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Essayez de modifier vos critères de recherche
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredOrchids}
              renderItem={({ item }) => (
                <OrchidCard
                  orchid={item}
                  onPress={() => handleOrchidPress(item.id)}
                  featured={false}
                  horizontal={true}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
            />
          )}
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Sheet for Menu */}
      <SimpleBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>À propos</Text>
          <Text style={styles.bottomSheetText}>
            Cette encyclopédie d'orchidées vous permet de découvrir et d'apprendre 
            sur différentes espèces d'orchidées, leurs caractéristiques et leurs 
            besoins de culture.
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{orchidsData.length}</Text>
              <Text style={styles.statLabel}>Espèces</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{featuredOrchids.length}</Text>
              <Text style={styles.statLabel}>Vedettes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Niveaux</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setIsBottomSheetVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Inter_400Regular',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'PlayfairDisplay_700Bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    fontFamily: 'Inter_400Regular',
  },
  menuButton: {
    padding: 8,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
    marginHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: colors.text,
    fontFamily: 'Inter_500Medium',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textLight,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
  bottomSheetContent: {
    padding: 20,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'PlayfairDisplay_700Bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  bottomSheetText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Inter_400Regular',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: 'Inter_600SemiBold',
  },
  statLabel: {
    fontSize: 14,
    color: colors.textLight,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  closeButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  cardSeparator: {
    width: 12,
  },
});
