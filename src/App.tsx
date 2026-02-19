import 'react-native-reanimated';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

import { Navigation } from './ui/navigation/RootNavigation';

SplashScreen.preventAutoHideAsync();

export function App() {
  const [loaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
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
