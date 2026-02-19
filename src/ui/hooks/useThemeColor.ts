/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import Colors from '@/ui/styles/Colors';

import { useColorScheme } from './useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: 'text' | 'background',
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];
  const palette = {
    light: {
      text: Colors.semantic.text.primaryDark,
      background: Colors.semantic.background.light,
    },
    dark: {
      text: Colors.semantic.text.primaryLight,
      background: Colors.semantic.background.primary,
    },
  } as const;

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return palette[theme][colorName];
  }
}
