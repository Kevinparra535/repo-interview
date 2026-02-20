import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';
import { ms } from '@/ui/styles/FontsScale';
import Spacings from '@/ui/styles/Spacings';
import { hexToRgba } from '@/ui/utils/colorUtils';

type Props = {
  /** Left-side label — muted white */
  label: string;
  /** Right-side value — can be a string or custom ReactNode (e.g. a logo thumbnail row) */
  value: string | ReactNode;
  /** Whether to render a bottom 1px divider line (default: true) */
  showDivider?: boolean;
};

/**
 * Single label + value info row used in Product Detail info card.
 *
 * Pencil DS spec: padding [14, 20], space-between,
 * label: white 60% / 13 / normal, value: white / 14 / 600
 */
const InfoRow = ({ label, value, showDivider = true }: Props) => (
  <View>
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      {typeof value === 'string' ? (
        <Text style={styles.value} numberOfLines={2}>
          {value}
        </Text>
      ) : (
        value
      )}
    </View>
    {showDivider && <View style={styles.divider} />}
  </View>
);

export default InfoRow;

const styles = StyleSheet.create({
  row: {
    paddingVertical: 14,
    paddingHorizontal: Spacings.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  label: {
    ...Fonts.smallBodyText,
    fontSize: ms(13),
    color: hexToRgba('#FFFFFF', 0.6),
    flex: 1,
  },

  value: {
    ...Fonts.links,
    fontSize: ms(14),
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    maxWidth: '60%',
    textAlign: 'right',
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: hexToRgba('#FFFFFF', 0.05),
  },
});
