import { StyleSheet } from 'react-native';

import BorderRadius from '@/ui/styles/BorderRadius';
import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';
import { ms } from '@/ui/styles/FontsScale';
import Spacings from '@/ui/styles/Spacings';

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
    paddingTop: Spacings.spacex4 + Spacings.xs, // 44
    paddingHorizontal: Spacings.spacex2,
    paddingBottom: Spacings.md / 2,
    height: 96,
  },

  backButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.base.bgCard,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navTitle: {
    ...Fonts.inputsBold,
    color: Colors.base.textPrimary,
  },

  navSpacer: {
    width: 40,
    height: 40,
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
    gap: Spacings.spacex2,
    padding: Spacings.spacex2,
    backgroundColor: Colors.base.bgCard,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.base.bgSearchBar,
  },

  sectionTitle: {
    ...Fonts.links,
    fontSize: ms(11),
    color: Colors.base.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacings.xs,
  },

  separator: {
    height: 1,
    backgroundColor: Colors.base.separator,
    marginVertical: Spacings.xs,
  },

  // ── Submit error banner ──────────────────────────────────────────────────

  errorBanner: {
    marginHorizontal: Spacings.spacex2,
    marginBottom: Spacings.sm,
    paddingVertical: Spacings.sm,
    paddingHorizontal: Spacings.md,
    backgroundColor: Colors.alerts.error + '22',
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
    gap: Spacings.sm,
    paddingVertical: Spacings.sm + Spacings.xs,
    paddingHorizontal: Spacings.spacex2,
    paddingBottom: Spacings.spacex3,
    borderTopWidth: 1,
    borderTopColor: Colors.base.separator,
  },

  actionBtn: {
    flex: 1,
    width: undefined,
  },
});

export default styles;
