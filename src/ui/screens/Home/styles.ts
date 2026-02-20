import { StyleSheet } from 'react-native';

import BorderRadius from '@/ui/styles/BorderRadius';
import Colors from '@/ui/styles/Colors';
import { ms } from '@/ui/styles/FontsScale';
import Shadows from '@/ui/styles/Shadows';
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
    fontWeight: '700',
    color: Colors.bank.textPrimary,
    fontSize: ms(22),
    fontFamily: 'Inter-Bold',
  },

  avatar: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bank.accent,
    borderRadius: BorderRadius.pill,
  },

  // ── Search Section ────────────────────────────────────────────────────────
  searchSection: {
    paddingBottom: Spacings.sm + 2,
    gap: Spacings.sm + 2,
  },

  searchBar: {
    paddingHorizontal: Spacings.spacex2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacings.sm,
    width: '100%',
    height: 48,
    backgroundColor: Colors.bank.bgSearchBar,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.bank.bgSearchBarBorder,
  },

  searchInput: {
    flex: 1,
    color: Colors.bank.textPrimary,
    fontSize: ms(15),
    fontFamily: 'Inter-Regular',
  },

  resultsBadge: {
    paddingHorizontal: Spacings.sm + 4,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    height: 28,
    backgroundColor: Colors.bank.accent,
    borderRadius: 14,
  },

  resultsBadgeEmpty: {
    backgroundColor: Colors.bank.badgeEmpty,
  },

  resultsBadgeText: {
    fontWeight: '500',
    color: Colors.bank.textPrimary,
    fontSize: ms(12),
    fontFamily: 'Inter-Medium',
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
    fontWeight: '500',
    color: Colors.bank.textPrimary,
    fontSize: ms(18),
    fontFamily: 'Inter-Medium',
  },

  emptySubtitle: {
    color: Colors.bank.textSecondary,
    fontSize: ms(14),
    fontFamily: 'Inter-Regular',
  },

  // ── Add Button ────────────────────────────────────────────────────────────
  buttonContainer: {
    paddingTop: Spacings.sm + 2,
    paddingHorizontal: Spacings.md,
    paddingBottom: Spacings.spacex2 + 4,
    backgroundColor: Colors.bank.bgPrimary,
  },

  addButtonWrapper: {
    width: '100%',
    borderRadius: 26,
    ...Shadows.bankButton,
  },

  addButton: {
    paddingHorizontal: Spacings.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacings.xs,
    width: '100%',
    height: 52,
    borderRadius: 26,
  },

  addButtonText: {
    fontWeight: '600',
    color: Colors.bank.textPrimary,
    fontSize: ms(16),
    fontFamily: 'Inter-SemiBold',
  },
});
