import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useTheme } from '../hooks/useTheme';

interface SimpleBottomSheetProps {
  children?: React.ReactNode;
  isVisible?: boolean;
  onClose?: () => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Snap positions for the bottom sheet
const SNAP_POINTS = {
  HALF: SCREEN_HEIGHT * 0.5,
  FULL: SCREEN_HEIGHT * 0.8,
  CLOSED: SCREEN_HEIGHT,
};

const SimpleBottomSheet: React.FC<SimpleBottomSheetProps> = ({
  children,
  isVisible = false,
  onClose
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const gestureTranslateY = useRef(new Animated.Value(0)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const [currentSnapPoint, setCurrentSnapPoint] = useState(SNAP_POINTS.HALF);
  const lastGestureY = useRef(0);
  const startPositionY = useRef(0);

  useEffect(() => {
    if (isVisible) {
      setCurrentSnapPoint(SNAP_POINTS.HALF);
      gestureTranslateY.setValue(0);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT - SNAP_POINTS.HALF,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      setCurrentSnapPoint(SNAP_POINTS.CLOSED);
      gestureTranslateY.setValue(0);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, translateY, backdropOpacity]);

  const handleBackdropPress = () => {
    onClose?.();
  };

  const snapToPoint = (point: number) => {
    setCurrentSnapPoint(point);
    gestureTranslateY.setValue(0);
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT - point,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Determines the closest snap point based on velocity and position
  const getClosestSnapPoint = (currentY: number, velocityY: number) => {
    const currentPosition = SCREEN_HEIGHT - currentY;

    if (velocityY > 1000) return SNAP_POINTS.CLOSED;
    if (velocityY < -1000) return SNAP_POINTS.FULL;

    const distances = [
      { point: SNAP_POINTS.HALF, distance: Math.abs(currentPosition - SNAP_POINTS.HALF) },
      { point: SNAP_POINTS.FULL, distance: Math.abs(currentPosition - SNAP_POINTS.FULL) },
    ];

    if (currentPosition < SNAP_POINTS.HALF * 0.5) {
      return SNAP_POINTS.CLOSED;
    }

    distances.sort((a, b) => a.distance - b.distance);
    return distances[0].point;
  };

  // Handles pan gesture events with boundary clamping
  const onGestureEvent = (event: any) => {
    const { translationY } = event.nativeEvent;
    lastGestureY.current = translationY;

    const currentBasePosition = SCREEN_HEIGHT - currentSnapPoint;
    const intendedPosition = currentBasePosition + translationY;

    const minPosition = SCREEN_HEIGHT - SNAP_POINTS.FULL;
    const maxPosition = SCREEN_HEIGHT;

    const clampedPosition = Math.max(minPosition, Math.min(maxPosition, intendedPosition));
    const clampedTranslation = clampedPosition - currentBasePosition;

    gestureTranslateY.setValue(clampedTranslation);
  };

  // Handles gesture state changes (begin/end) for snapping behavior
  const onHandlerStateChange = (event: any) => {
    const { state, translationY, velocityY } = event.nativeEvent;

    if (state === State.BEGAN) {
      startPositionY.current = SCREEN_HEIGHT - currentSnapPoint;
    } else if (state === State.END) {
      const currentBasePosition = SCREEN_HEIGHT - currentSnapPoint;
      const intendedPosition = currentBasePosition + translationY;

      const minPosition = SCREEN_HEIGHT - SNAP_POINTS.FULL;
      const maxPosition = SCREEN_HEIGHT;

      const finalY = Math.max(minPosition, Math.min(maxPosition, intendedPosition));
      const targetSnapPoint = getClosestSnapPoint(finalY, velocityY);

      gestureTranslateY.setValue(0);

      if (targetSnapPoint === SNAP_POINTS.CLOSED) {
        onClose?.();
      } else {
        snapToPoint(targetSnapPoint);
      }
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <Animated.View
            style={[
              styles.backdrop,
              { opacity: backdropOpacity }
            ]}
          />
        </TouchableWithoutFeedback>

        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View
            style={[
              styles.bottomSheet,
              {
                transform: [
                  { translateY: Animated.add(translateY, gestureTranslateY) }
                ],
              },
            ]}
          >
            <View style={styles.handle} />

            <View style={styles.contentContainer}>
              {children || (
                <View style={styles.defaultContent}>
                  <Text style={styles.title}>Bottom Sheet 🎉</Text>
                  <Text style={styles.description}>
                    This is a custom bottom sheet implementation.
                    Try dragging it up and down!
                  </Text>
                  <Button
                    title="Close"
                    onPress={onClose}
                  />
                </View>
              )}
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Modal>
  );
};

SimpleBottomSheet.displayName = 'SimpleBottomSheet';

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  bottomSheet: {
    height: SNAP_POINTS.FULL,
    backgroundColor: colors.background || '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 16,
  },
  handle: {
    width: 48,
    height: 5,
    backgroundColor: colors.grey,
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 16,
    opacity: 0.6,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  defaultContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Playfair_700Bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
});

export default SimpleBottomSheet;
