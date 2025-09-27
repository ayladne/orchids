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
import { commonStyles } from '../styles/commonStyles';
import { useTheme } from '../hooks/useTheme';
import { orchidsData } from '../data/orchids';
import OrchidCard from '../components/OrchidCard';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import SimpleBottomSheet from '../components/BottomSheet';
import ThemeToggle from '../components/ThemeToggle';
import Icon from '../components/Icon';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';

const filters = ['Tous', 'Facile', 'Modéré', 'Difficile', 'En fleur'];

export default function MainScreen() {
  const { colors, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    PlayfairDisplay_700Bold,
  });

  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleThemeToggle = () => {
    toggleTheme();
    setRefreshKey(prev => prev + 1); // Force re-render
  };

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

    // Filter by selected filter
    if (selectedFilter && selectedFilter !== 'Tous') {
      if (selectedFilter === 'En fleur') {
        // Pour l'instant, on garde toutes les orchidées pour ce filtre
        // filtered = filtered.filter(orchid => orchid.isInBloom);
      } else {
        filtered = filtered.filter(orchid => 
          orchid.careLevel.toLowerCase().includes(selectedFilter.toLowerCase())
        );
      }
    }

    return filtered;
  }, [searchQuery, selectedFilter]);

  const featuredOrchids = useMemo(() => 
    orchidsData.filter(orchid => orchid.isFeatured).slice(0, 5), 
    []
  );

  const handleOrchidPress = (orchidId: string) => {
    router.push(`/orchid/${orchidId}`);
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]} key={refreshKey}>
      <StatusBar 
        barStyle={colors.text === '#F0E8F0' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerBackground} />
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
              <View style={styles.titleRow}>
                <View style={styles.iconContainer}>
                  <Icon name="flower" size={32} color={colors.primary} />
                </View>
                <View>
                  <Text style={styles.title}>Orchidées</Text>
                  <Text style={styles.subtitle}>Encyclopédie botanique</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.headerActions}>
              <ThemeToggle 
                onToggle={handleThemeToggle}
                size={24}
                style={styles.themeToggle}
              />
              <TouchableOpacity 
                style={styles.menuButton}
                onPress={() => setIsBottomSheetVisible(true)}
              >
                <Icon name="menu-outline" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
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
            {searchQuery ? `Résultats (${filteredOrchids.length})` : 'Toutes les orchidées'}
          </Text>
          {filteredOrchids.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Icon name="search-outline" size={48} color={colors.textLight} />
              <Text style={styles.emptyText}>Aucune orchidée trouvée</Text>
              <Text style={styles.emptySubtext}>
                Essayez de modifier vos critères de recherche
              </Text>
            </View>
          ) : (
            <View style={styles.orchidsGrid}>
              {filteredOrchids.map((orchid) => (
                <OrchidCard
                  key={orchid.id}
                  orchid={orchid}
                  onPress={() => handleOrchidPress(orchid.id)}
                  horizontal={false}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <SimpleBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Menu</Text>
          <TouchableOpacity style={styles.bottomSheetItem}>
            <Icon name="settings-outline" size={20} color={colors.primary} />
            <Text style={styles.bottomSheetItemText}>Paramètres</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomSheetItem}>
            <Icon name="heart-outline" size={20} color={colors.primary} />
            <Text style={styles.bottomSheetItemText}>Favoris</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomSheetItem}>
            <Icon name="information-circle-outline" size={20} color={colors.primary} />
            <Text style={styles.bottomSheetItemText}>À propos</Text>
          </TouchableOpacity>
        </View>
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
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
    height: 160,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 24,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.card,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: colors.shadowLight,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  titleContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeToggle: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.greyLight,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadowLight,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'Inter_700Bold',
    marginBottom: 16,
    marginHorizontal: 24,
    letterSpacing: -0.3,
  },
  horizontalList: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  cardSeparator: {
    width: 16,
  },
  orchidsGrid: {
    paddingHorizontal: 20,
    gap: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textLight,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  bottomSheetContent: {
    paddingTop: 16,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'PlayfairDisplay_700Bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  bottomSheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  bottomSheetItemText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'Inter_500Medium',
    marginLeft: 16,
  },
});