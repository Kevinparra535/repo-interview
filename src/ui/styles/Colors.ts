import { hexToRgba } from '@/ui/utils/colorUtils';

// ---------------------------------------------------------------------------
// Raw hex primitives — single source of truth for each unique hue
// ---------------------------------------------------------------------------
const WHITE = '#FFFFFF';
const DARK_NAVY = '#0A1628';
const DEEP_BLUE = '#1A2F5E';
const ACCENT_BLUE = '#2D7EF8';          // Primary accent — also gradient start
const ACCENT_BLUE_DARK = '#1A5FCC';    // Gradient end (Pencil DS: #1A5FCC)
const INPUT_BG = '#1C2E4A';           // Input / surface background
const ERROR_RED = '#FF5252';           // Error colour (Pencil DS)
const SUCCESS_GREEN = '#00C853';       // Success colour (Pencil DS)

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
  accentGradientStart: ACCENT_BLUE,       // #2D7EF8 — Pencil DS gradient start
  accentGradientEnd: ACCENT_BLUE_DARK,    // #1A5FCC — Pencil DS gradient end
  accentDim: hexToRgba(ACCENT_BLUE, 0.12),
  accentDimBorder: hexToRgba(ACCENT_BLUE, 0.31),

  // Input fields
  inputBg: INPUT_BG,
  inputBorder: hexToRgba(WHITE, 0.1),           // #FFFFFF1A — Pencil DS default border
  inputErrorBorder: ERROR_RED,                  // #FF5252
  inputSuccessBorder: SUCCESS_GREEN,            // #00C853

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

  // Danger / destructive (Pencil DS: Delete Confirmation Modal)
  dangerPrimary: '#E53935',
  dangerDark: '#B71C1C',
  dangerDim: hexToRgba('#E53935', 0.08),
  dangerDimBorder: hexToRgba('#E53935', 0.13),
  dangerGlow: hexToRgba('#E53935', 0.19),

  // Modal
  modalBackdrop: hexToRgba('#000000', 0.7),
  modalCardBg: hexToRgba('#0D1B33', 0.8),
  modalCardBorder: hexToRgba(WHITE, 0.09),
  dividerLight: hexToRgba(WHITE, 0.08),

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
    error: ERROR_RED,        // #FF5252 — aligned with Pencil DS
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
