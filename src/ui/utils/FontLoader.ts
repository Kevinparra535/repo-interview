// FontLoader.ts

import * as Font from 'expo-font';

const fonts = {
  'Inter-Regular': require('@/ui/assets/fonts/Inter/Inter_24pt-Regular.ttf'),
  'Inter-Medium': require('@/ui/assets/fonts/Inter/Inter_24pt-Medium.ttf'),
  'Inter-SemiBold': require('@/ui/assets/fonts/Inter/Inter_24pt-SemiBold.ttf'),
  'Inter-Bold': require('@/ui/assets/fonts/Inter/Inter_24pt-Bold.ttf'),
  'PlayfairDisplay-Regular': require('@/ui/assets/fonts/Playfair_Display/PlayfairDisplay-Regular.ttf'),
  'PlayfairDisplay-Medium': require('@/ui/assets/fonts/Playfair_Display/PlayfairDisplay-Medium.ttf'),
  'PlayfairDisplay-SemiBold': require('@/ui/assets/fonts/Playfair_Display/PlayfairDisplay-SemiBold.ttf'),
  'PlayfairDisplay-Bold': require('@/ui/assets/fonts/Playfair_Display/PlayfairDisplay-Bold.ttf'),
};

async function loadFonts() {
  try {
    await Font.loadAsync(fonts);
    return true;
  } catch (error) {
    console.error('Error loading fonts:', error);
    return false;
  }
}

export default loadFonts;
