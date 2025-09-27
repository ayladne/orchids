
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#8B5A8C',      // Orchid purple
  secondary: '#D8A7D8',    // Light orchid
  accent: '#E91E63',       // Pink accent
  background: '#FAFAFA',   // Light background
  backgroundAlt: '#FFFFFF', // Pure white
  text: '#2E2E2E',         // Dark gray text
  textLight: '#757575',    // Light gray text
  grey: '#E0E0E0',         // Light grey
  card: '#FFFFFF',         // White cards
  success: '#4CAF50',      // Green
  shadow: 'rgba(0, 0, 0, 0.1)',
};

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
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: `0px 4px 12px ${colors.shadow}`,
    elevation: 4,
  },
  orchidCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 0,
    marginVertical: 12,
    marginHorizontal: 16,
    boxShadow: `0px 6px 20px ${colors.shadow}`,
    elevation: 6,
    overflow: 'hidden',
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
});
