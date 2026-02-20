import { StyleSheet } from 'react-native';

import BorderRadius from '@/ui/styles/BorderRadius';
import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';
import Shadows from '@/ui/styles/Shadows';
import Spacings from '@/ui/styles/Spacings';
import { hexToRgba } from '@/ui/utils/colorUtils';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.base.bgPrimary,
  },

  // ── Nav bar ──────────────────────────────────────────────────────────────

  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacings.spacex4 + Spacings.xs,
    paddingHorizontal: Spacings.spacex2,
    paddingBottom: Spacings.md / 2,
    height: 96,
  },

  backButton: {
    width: Spacings.xl,
    height: Spacings.xl,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.base.bgCard,
    borderRadius: BorderRadius.lg,
  },

  navTitle: {
    ...Fonts.inputsBold,
    color: Colors.base.textPrimary,
  },

  navSpacer: {
    width: Spacings.xl,
    height: Spacings.xl,
  },

  // ── Form scroll ──────────────────────────────────────────────────────────

  flex: {
    flex: 1,
  },

  scrollContent: {
    padding: Spacings.spacex2,
    paddingBottom: Spacings.md,
  },

  formCard: {
    gap: 16,
    padding: Spacings.spacex2,
    backgroundColor: Colors.base.bgCard,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.base.bgSearchBarBorder,
    ...Shadows.formCard,
  },

  // ── Submit error banner ──────────────────────────────────────────────────

  errorBanner: {
    marginHorizontal: Spacings.spacex2,
    marginBottom: Spacings.sm,
    paddingVertical: Spacings.sm,
    paddingHorizontal: Spacings.md,
    backgroundColor: hexToRgba(Colors.alerts.error, 0.13),
    borderRadius: BorderRadius.xs,
    borderWidth: 1,
    borderColor: Colors.alerts.error,
  },

  errorBannerText: {
    ...Fonts.smallBodyText,
    color: Colors.alerts.error,
  },

  // ── Action row ───────────────────────────────────────────────────────────

  actionRow: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 32,
    backgroundColor: Colors.base.actionRowBg,
    borderTopWidth: 1,
    borderTopColor: Colors.base.cardBorder,
  },

  actionBtn: {
    flex: 1,
    height: 52,
    width: undefined,
  },

  // ── Loading / Error states ───────────────────────────────────────────────

  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacings.spacex2,
  },

  errorStateText: {
    ...Fonts.bodyText,
    color: Colors.base.textSecondary,
    textAlign: 'center',
  },
});

export default styles;
