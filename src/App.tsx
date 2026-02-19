import 'react-native-reanimated';
import 'reflect-metadata';

import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { Appearance } from 'react-native';

import { Navigation } from '@/ui/navigation/RootNavigation';
import loadFonts from '@/ui/utils/FontLoader';

SplashScreen.preventAutoHideAsync();

export function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function initializeFonts() {
    const fontsAreLoaded = await loadFonts();
    setFontsLoaded(fontsAreLoaded);
  }

  useEffect(() => {
    initializeFonts();
    Appearance.setColorScheme('dark');
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Navigation
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    />
  );
}
