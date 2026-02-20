import { StyleSheet } from 'react-native';

import BorderRadius from '@/ui/styles/BorderRadius';
import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';
import { ms } from '@/ui/styles/FontsScale';
import Shadows from '@/ui/styles/Shadows';
import Spacings from '@/ui/styles/Spacings';
import { hexToRgba } from '@/ui/utils/colorUtils';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.base.bgPrimary,
  },

  flex: {
    flex: 1,
  },

  logoGlowContainer: {
    width: 88,
    height: 88,
    borderRadius: 20,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacings.sm,
    ...Shadows.logoGlow,
  },

  logoCard: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...Shadows.bankCard,
  },

  logoImage: {
    width: 72,
    height: 72,
    borderRadius: Spacings.spacex2,
    aspectRatio: 1,
    resizeMode: 'contain',
    backgroundColor: Colors.claro,
  },

  nameSection: {
    width: '100%',
    paddingLeft: Spacings.spacex2,
    alignItems: 'flex-start',
    gap: Spacings.sm,
  },

  productName: {
    ...Fonts.header3,
    fontSize: ms(22),
    color: Colors.base.textPrimary,
    textAlign: 'center',
  },

  idBadge: {
    height: 28,
    borderRadius: 14,
    backgroundColor: hexToRgba('#2D7EF8', 0.125), // #2D7EF820
    borderWidth: 1,
    borderColor: hexToRgba('#2D7EF8', 0.314), // #2D7EF850
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    gap: 6,
  },

  idBadgeText: {
    ...Fonts.links,
    fontSize: ms(12),
    fontFamily: 'Inter-SemiBold',
    color: Colors.base.accent,
  },

  infoWrapper: {
    paddingTop: 12,
    paddingHorizontal: Spacings.lg,
    paddingBottom: 0,
    width: '100%',
  },

  infoCard: {
    width: '100%',
    backgroundColor: hexToRgba('#FFFFFF', 0.039), // #FFFFFF0A
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: hexToRgba('#FFFFFF', 0.094), // #FFFFFF18
    overflow: 'hidden',
    ...Shadows.bankCard,
  },

  logoValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacings.sm,
  },

  logoThumb: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoUrlText: {
    ...Fonts.links,
    fontSize: ms(13),
    fontFamily: 'Inter-Medium',
    color: Colors.base.accent,
    maxWidth: 140,
  },

  scrollContent: {
    paddingBottom: Spacings.xl,
  },

  actionButtons: {
    width: '100%',
    paddingHorizontal: Spacings.lg,
    paddingBottom: 32,
    paddingTop: 0,
    gap: 12,
  },

  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacings.md,
    gap: Spacings.sm,
  },

  errorText: {
    ...Fonts.bodyText,
    color: Colors.alerts.error,
    textAlign: 'center',
  },

  errorBanner: {
    marginHorizontal: Spacings.lg,
    marginBottom: Spacings.sm,
    padding: Spacings.sm,
    backgroundColor: hexToRgba('#E53935', 0.15),
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: hexToRgba('#E53935', 0.3),
  },

  errorBannerText: {
    ...Fonts.smallBodyText,
    color: '#FF5252',
    textAlign: 'center',
  },
});

export default styles;
