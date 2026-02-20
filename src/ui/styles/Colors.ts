import { hexToRgba } from '@/ui/utils/colorUtils';

const WHITE = '#FFFFFF';
const DARK_NAVY = '#0A1628';
const DEEP_BLUE = '#1A2F5E';
const NAV_GRADIENT_END = '#12244A';
const ACCENT_BLUE = '#2D7EF8';
const ACCENT_BLUE_DARK = '#1A5FCC';
const ACCENT_DEEP = '#0D3F99';
const ACCENT_LIGHT = '#5B9BF9';
const BG_SECONDARY = '#111F38';
const BG_TERTIARY = '#243550';
const DETAIL_GRADIENT_END = '#1A3A70';
const ACTION_ROW_BG = '#0D1F3D';
const INPUT_BG = '#1C2E4A';
const ERROR_RED = '#FF5252';
const DESTRUCTIVE_MID = '#C62828';
const SUCCESS_GREEN = '#00C853';
const SUCCESS_LIGHT = '#00E676';
const WARNING_PRIMARY = '#F59E0B';
const WARNING_LIGHT = '#FFB300';

const base = {
  bgPrimary: DARK_NAVY,
  bgSecondary: BG_SECONDARY,
  bgTertiary: BG_TERTIARY,
  bgGradientEnd: DEEP_BLUE,
  navGradientEnd: NAV_GRADIENT_END,
  detailGradientEnd: DETAIL_GRADIENT_END,
  actionRowBg: ACTION_ROW_BG,
  bgCard: hexToRgba(WHITE, 0.03),
  bgSearchBar: hexToRgba(WHITE, 0.07),
  bgSearchBarBorder: hexToRgba(WHITE, 0.09),
  bgInfoCard: hexToRgba(WHITE, 0.04),

  accent: ACCENT_BLUE,
  accentGradientStart: ACCENT_BLUE,
  accentGradientEnd: ACCENT_BLUE_DARK,
  accentDeep: ACCENT_DEEP,
  accentLight: ACCENT_LIGHT,
  accentDim: hexToRgba(ACCENT_BLUE, 0.12),
  accentDimBorder: hexToRgba(ACCENT_BLUE, 0.31),

  inputBg: INPUT_BG,
  inputBorder: hexToRgba(WHITE, 0.1),
  inputErrorBorder: ERROR_RED,
  inputSuccessBorder: SUCCESS_GREEN,

  cardBorder: hexToRgba(WHITE, 0.1),
  separator: hexToRgba(WHITE, 0.05),

  textPrimary: WHITE,
  textSecondary: hexToRgba(WHITE, 0.5),
  textMuted: hexToRgba(WHITE, 0.38),
  textPlaceholder: hexToRgba(WHITE, 0.31),
  textHint: hexToRgba(WHITE, 0.25),
  textDismiss: hexToRgba(WHITE, 0.19),

  iconMuted: hexToRgba(WHITE, 0.38),

  badgeEmpty: hexToRgba(WHITE, 0.08),

  dangerPrimary: '#E53935',
  dangerDark: '#B71C1C',
  destructiveMid: DESTRUCTIVE_MID,
  dangerDim: hexToRgba('#E53935', 0.08),
  dangerDimBorder: hexToRgba('#E53935', 0.13),
  dangerGlow: hexToRgba('#E53935', 0.19),

  successLight: SUCCESS_LIGHT,
  warningPrimary: WARNING_PRIMARY,
  warningLight: WARNING_LIGHT,

  modalBackdrop: hexToRgba('#000000', 0.7),
  modalCardBg: hexToRgba('#0D1B33', 0.8),
  modalCardBorder: hexToRgba(WHITE, 0.09),
  dividerLight: hexToRgba(WHITE, 0.08),

  neutralLight: '#ECEFF1',
  neutralMid: '#CFD8DC',
  neutralDark: '#90A4AE',

  iconSavings: ACCENT_BLUE,
  iconCredit: '#9B59B6',
  iconLoan: '#27AE60',
  iconInsurance: '#E8A030',
  iconDefault: ACCENT_BLUE,
};

const Colors = {
  base,

  bank: base,

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

  brand: {
    primary: base.accent,
    secondary: base.bgPrimary,
    premium: base.accentGradientEnd,
  },

  variants: {
    disabled: '#A0A0A0',
    disabledBackground: '#F0F0F0',
  },

  alerts: {
    check: '#4eaf0d',
    error: ERROR_RED,
    warning: WARNING_PRIMARY,
    softNegative: '#E57373',
  },

  bg: {
    claro: base.bgPrimary,
    oscuro: base.bgGradientEnd,
  },

  claro: base.neutralLight,
  oscuro: base.bgGradientEnd,
} as const;

export default Colors;
