import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import { StyleProp, ViewStyle } from 'react-native';

import Colors from '@/ui/styles/Colors';

// ---------------------------------------------------------------------------
// Built-in presets matching the Pencil design tokens
// ---------------------------------------------------------------------------
export type GradientPreset = 'header' | 'accent' | 'detailHero';

const GRADIENT_PRESETS: Record<
  GradientPreset,
  Pick<LinearGradientProps, 'colors' | 'start' | 'end'>
> = {
  /** Dark-navy → deep-blue — used for nav/header backgrounds */
  header: {
    colors: [Colors.base.bgPrimary, Colors.base.bgGradientEnd],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  /** Light-accent → dark-accent — used for primary action buttons */
  accent: {
    colors: [Colors.base.accentGradientStart, Colors.base.accentGradientEnd],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  /** Navy → deep-blue — used for Product Detail hero header (#0A1628 → #1A3A70) */
  detailHero: {
    colors: [Colors.base.bgPrimary, '#1A3A70'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
type Props = {
  /** Use a built-in preset. Ignored when `colors` is provided. */
  preset?: GradientPreset;
  /**
   * Custom gradient stops. Overrides any preset.
   * Must have at least two colors (LinearGradient requirement).
   */
  colors?: [string, string, ...string[]];
  /** Gradient direction shorthand. Defaults to `'vertical'`. */
  direction?: 'vertical' | 'horizontal';
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const DIRECTION_VECTORS = {
  vertical: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
  horizontal: { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } },
} as const;

/**
 * Reusable LinearGradient wrapper with design-system presets.
 *
 * @example
 * // Header background
 * <GradientView preset="header" style={styles.header}>…</GradientView>
 *
 * // Primary action button fill
 * <GradientView preset="accent" style={styles.button}>…</GradientView>
 *
 * // Custom icon container gradient
 * <GradientView colors={['#9B59B6', '#2D7EF8']} style={styles.icon}>…</GradientView>
 */
const GradientView = ({ preset, colors, direction = 'vertical', style, children }: Props) => {
  const vectors = DIRECTION_VECTORS[direction];

  const gradientProps: Pick<LinearGradientProps, 'colors' | 'start' | 'end'> = colors
    ? { colors, start: vectors.start, end: vectors.end }
    : GRADIENT_PRESETS[preset ?? 'header'];

  return (
    <LinearGradient {...gradientProps} style={style}>
      {children}
    </LinearGradient>
  );
};

export default GradientView;
