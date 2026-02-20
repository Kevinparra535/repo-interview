import { StyleSheet } from 'react-native';

import BorderRadius from '@/ui/styles/BorderRadius';
import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';
import { ms } from '@/ui/styles/FontsScale';
import Spacings from '@/ui/styles/Spacings';

// ---------------------------------------------------------------------------
// Product icon config — index-cycled in the FlatList
// ---------------------------------------------------------------------------
type ProductConfig = {
  iconName: 'card-outline' | 'wallet-outline' | 'cash-outline' | 'shield-checkmark-outline';
  iconBgColor: string;
};

export const PRODUCT_CONFIGS: ProductConfig[] = [
  { iconName: 'card-outline', iconBgColor: Colors.bank.iconSavings },
  { iconName: 'wallet-outline', iconBgColor: Colors.bank.iconCredit },
  { iconName: 'cash-outline', iconBgColor: Colors.bank.iconLoan },
  { iconName: 'shield-checkmark-outline', iconBgColor: Colors.bank.iconInsurance },
];

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
export const styles = StyleSheet.create({
  // ── Root ──────────────────────────────────────────────────────────────────
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bank.bgPrimary,
  },

  // ── Header (LinearGradient) ────────────────────────────────────────────────
  header: {
    paddingTop: Spacings.xl + 8, // 48
    paddingHorizontal: Spacings.spacex2,
    paddingBottom: Spacings.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 120,
  },

  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacings.sm,
  },

  logoIconContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bank.accentGradientEnd,
    borderRadius: BorderRadius.xs,
  },

  logoText: {
    ...Fonts.header3,
    fontFamily: 'Inter-Bold',
    color: Colors.bank.textPrimary,
  },

  avatar: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bank.accent,
    borderRadius: BorderRadius.pill,
  },

  // ── List ──────────────────────────────────────────────────────────────────
  listContent: {
    paddingTop: Spacings.sm - 2,
    paddingBottom: Spacings.lg + 8,
    paddingHorizontal: Spacings.md,
    gap: Spacings.sm + 2,
    flexGrow: 1,
  },

  itemSeparator: {
    height: 0,
  },

  // ── Empty state ───────────────────────────────────────────────────────────
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0,
    paddingHorizontal: Spacings.xl,
    paddingTop: Spacings.xl,
  },

  emptyIconCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    height: 140,
    backgroundColor: Colors.bank.bgCard,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: Colors.bank.cardBorder,
  },

  emptyTextContainer: {
    paddingTop: Spacings.spacex2 + 4,
    alignItems: 'center',
    gap: Spacings.xs,
  },

  emptyTitle: {
    ...Fonts.header5,
    color: Colors.bank.textPrimary,
  },

  emptySubtitle: {
    ...Fonts.bodyText,
    fontSize: ms(14),
    color: Colors.bank.textSecondary,
  },

  // ── Add Button ────────────────────────────────────────────────────────────
  buttonContainer: {
    paddingTop: Spacings.sm + 2,
    paddingHorizontal: Spacings.md,
    paddingBottom: Spacings.spacex2 + 4,
    backgroundColor: Colors.bank.bgPrimary,
  },
});
