
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Stack, useGlobalSearchParams } from 'expo-router';
import { SafeAreaProvider, useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { setupErrorLogging } from '../utils/errorLogger';
import * as Font from 'expo-font';

const STORAGE_KEY = 'emulate_device';

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const [emulate, setEmulate] = useState(false);
  const params = useGlobalSearchParams();

  useEffect(() => {
    if (params.emulate === 'true') {
      setEmulate(true);
    }
  }, [params.emulate]);

  useEffect(() => {
    setupErrorLogging();
    console.log('App initialized');
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#FAFAFA' },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="orchid/[id]" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
