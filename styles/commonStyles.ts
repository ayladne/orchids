
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Palette basée sur #FFDEE3 (rose poudré)
const lightTheme = {
  primary: '#E8A2B0',        // Rose poudré principal
  primaryLight: '#FFDEE3',   // La couleur demandée
  primaryDark: '#D088A0',    // Version plus foncée
  secondary: '#C5A3B8',      // Violet-rose secondaire
  accent: '#F4C2C2',         // Rose accent
  accentLight: '#FFEBEE',    // Rose très clair
  background: '#FFFFFF',
  backgroundAlt: '#FDFCFC',
  backgroundGradient: 'linear-gradient(135deg, #FFDEE3 0%, #FFE8F1 100%)',
  cardGradient: 'linear-gradient(135deg, #FFFFFF 0%, #FFDEE3 15%)',
  card: '#FFFFFF',
  surface: '#FEFEFE',
  text: '#2D1B29',
  textSecondary: '#6B4E6B',
  textLight: '#9B7B9B',
  textMuted: '#9CA3AF',
  border: '#F0E8F0',
  grey: '#E8E0E8',
  greyLight: '#F5F2F5',
  greyDark: '#B8A8B8',
  white: '#FFFFFF',
  black: '#000000',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  shadow: 'rgba(232, 162, 176, 0.15)',
  shadowLight: 'rgba(232, 162, 176, 0.08)',
  shadowStrong: 'rgba(232, 162, 176, 0.25)',
};

const darkTheme = {
  primary: '#D088A0',        // Rose poudré adapté pour le sombre
  primaryLight: '#E8A2B0',   // Plus clair que primary
  primaryDark: '#B86888',    // Plus foncé
  secondary: '#A8788A',      // Violet-rose secondaire sombre
  accent: '#C89898',         // Rose accent sombre
  accentLight: '#D8A8A8',    // Rose accent clair
  background: '#1A1215',     // Très sombre avec teinte rose
  backgroundAlt: '#211A1D',  // Légèrement plus clair
  backgroundGradient: 'linear-gradient(135deg, #211A1D 0%, #2A1F25 100%)',
  cardGradient: 'linear-gradient(135deg, #2A1F25 0%, #322A2F 15%)',
  card: '#2A1F25',
  surface: '#322A2F',
  text: '#F0E8F0',
  textSecondary: '#C8B8C8',
  textLight: '#A898A8',
  textMuted: '#78687B',
  border: '#483848',
  grey: '#584858',
  greyLight: '#403040',
  greyDark: '#785878',
  white: '#FFFFFF',
  black: '#000000',
  success: '#059669',
  warning: '#D97706',
  error: '#DC2626',
  shadow: 'rgba(0, 0, 0, 0.4)',
  shadowLight: 'rgba(0, 0, 0, 0.2)',
  shadowStrong: 'rgba(0, 0, 0, 0.6)',
};

// État global du thème
let isDarkMode = false;

// Fonction pour obtenir les couleurs actuelles
export const getColors = () => isDarkMode ? darkTheme : lightTheme;

// Fonction pour basculer le thème
export const toggleTheme = () => {
  isDarkMode = !isDarkMode;
  return isDarkMode;
};

// Fonction pour définir le thème
export const setTheme = (dark: boolean) => {
  isDarkMode = dark;
};

// Fonction pour savoir si on est en mode sombre
export const getIsDarkMode = () => isDarkMode;

// Export des couleurs actuelles (par défaut clair)
export const colors = getColors();

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'PlayfairDisplay_700Bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: colors.textLight,
    marginBottom: 24,
    fontFamily: 'Inter_400Regular',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'left',
    fontFamily: 'Inter_400Regular',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: `0px 8px 24px ${colors.shadowLight}`,
    borderWidth: 1,
    borderColor: colors.greyLight,
    elevation: 4,
  },
  orchidCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 0,
    marginVertical: 12,
    marginHorizontal: 16,
    boxShadow: `0px 12px 32px ${colors.shadow}`,
    borderWidth: 1,
    borderColor: colors.greyLight,
    elevation: 8,
    overflow: 'hidden',
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
});
