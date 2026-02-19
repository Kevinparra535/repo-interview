const base = {
  blackCouture: '#0B0B0D',
  blackSoft: '#1A1A1D',

  goldSilk: '#D9A25F',
  goldLight: '#F1E2B6',
  goldDark: '#A6662E',

  pinkSignature: '#D92365',
  pinkLight: '#D92579',
  pinkDark: '#B8326E',

  ivoryHaute: '#F4EFE9',
  whitePure: '#FFFFFF',

  silverCouture: '#BFC3C7',
  silverDark: '#8E9499',
} as const;

const semantic = {
  background: {
    primary: base.pinkSignature,
    secondary: base.goldDark,
    light: base.ivoryHaute,
  },
  text: {
    primaryDark: base.blackCouture,
    primaryLight: base.ivoryHaute,
    secondary: base.silverCouture,
    secondaryDark: base.silverDark,
    secondaryAA: '#6B7075',
  },
  accent: {
    primary: base.pinkSignature,
    premium: base.goldSilk,
  },
  border: {
    subtle: base.silverCouture,
  },
  divider: {
    gold: base.goldSilk,
  },
  overlay: {
    white95: 'rgba(255,255,255,0.95)',
    white80: 'rgba(255,255,255,0.8)',
    white70: 'rgba(255,255,255,0.7)',
  },
  state: {
    disabled: {
      text: '#A0A0A0',
      background: '#F0F0F0',
    },
  },
} as const;

const Colors = {
  base,
  semantic,

  // Backwards-compatible aliases (existing code references these)
  brand: {
    primary: semantic.accent.primary,
    secondary: base.blackSoft,
    premium: semantic.accent.premium,
  },

  variants: {
    one: base.goldLight,
    two: base.silverDark,
    three: base.blackSoft,
    four: base.goldSilk,
    five: base.ivoryHaute,
    six: base.whitePure,
    seven: base.pinkLight,
    eight: base.silverCouture,
    nine: base.blackCouture,
    ten: base.pinkDark,
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
    claro: semantic.background.light,
    oscuro: semantic.background.primary,
  },

  claro: base.whitePure,
  oscuro: base.blackCouture,
} as const;

export default Colors;
