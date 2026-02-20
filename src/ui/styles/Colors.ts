import { hexToRgba } from '@/ui/utils/colorUtils';

// ---------------------------------------------------------------------------
// Raw hex primitives — single source of truth for each unique hue
// ---------------------------------------------------------------------------
const WHITE = '#FFFFFF';
const DARK_NAVY = '#0A1628';
const DEEP_BLUE = '#1A2F5E';
const ACCENT_BLUE = '#2D7EF8';
const ACCENT_BLUE_LIGHT = '#3D8EF8';
const ACCENT_BLUE_DARK = '#1A6FE8';

// ---------------------------------------------------------------------------
// Base palette — composed using hexToRgba; no raw rgba() strings
// ---------------------------------------------------------------------------
const base = {
  // Backgrounds
  bgPrimary: DARK_NAVY,
  bgGradientEnd: DEEP_BLUE,
  bgCard: hexToRgba(WHITE, 0.03),
  bgSearchBar: hexToRgba(WHITE, 0.07),
  bgSearchBarBorder: hexToRgba(WHITE, 0.09),
  bgInfoCard: hexToRgba(WHITE, 0.04),

  // Accent
  accent: ACCENT_BLUE,
  accentGradientStart: ACCENT_BLUE_LIGHT,
  accentGradientEnd: ACCENT_BLUE_DARK,
  accentDim: hexToRgba(ACCENT_BLUE, 0.12),
  accentDimBorder: hexToRgba(ACCENT_BLUE, 0.31),

  // Borders / separators
  cardBorder: hexToRgba(WHITE, 0.1),
  separator: hexToRgba(WHITE, 0.05),

  // Text
  textPrimary: WHITE,
  textSecondary: hexToRgba(WHITE, 0.6),
  textMuted: hexToRgba(WHITE, 0.31),

  // Icons
  iconMuted: hexToRgba(WHITE, 0.38),

  // Badges
  badgeEmpty: hexToRgba(WHITE, 0.08),

  // Product icon accent colors
  iconSavings: ACCENT_BLUE,
  iconCredit: '#9B59B6',
  iconLoan: '#27AE60',
  iconInsurance: '#E8A030',
  iconDefault: ACCENT_BLUE,
};

const Colors = {
  base,
  /** @alias base — kept for backward compatibility */
  bank: base,

  // Backwards-compatible semantic namespace (used by Fonts.ts & useThemeColor.ts)
  semantic: {
    text: {
      primaryDark: '#1C1C1E',
      primaryLight: WHITE,
    },
    background: {
      light: '#F5F5F5',
      primary: DARK_NAVY,
    },
  },

  // Backwards-compatible aliases (existing code references these)
  brand: {
    primary: base.accent,
    secondary: base.bgPrimary,
    premium: base.accentGradientEnd,
  },

  variants: {
    disabled: '#A0A0A0',
    disabledBackground: '#F0F0F0',
  },

  // Keep existing alert colors (not part of brand system)
  alerts: {
    check: '#4eaf0d',
    error: '#E74446',
    warning: '#FF8740',
    softNegative: '#E57373',
  },

  bg: {
    claro: base.bgPrimary,
    oscuro: base.bgGradientEnd,
  },

  claro: base.bgPrimary,
  oscuro: base.bgGradientEnd,
} as const;

export default Colors;
