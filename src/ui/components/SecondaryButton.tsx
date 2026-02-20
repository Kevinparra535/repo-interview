import type { LucideIcon } from 'lucide-react-native';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import BorderRadius from '@/ui/styles/BorderRadius';
import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';
import { ms } from '@/ui/styles/FontsScale';
import Spacings from '@/ui/styles/Spacings';

import { hexToRgba } from '@/ui/utils/colorUtils';

type Variant =
  /** Transparent bg + 1.5px accent-blue border. Use for secondary actions (Edit, View). */
  | 'outlined'
  /** No border, no fill, accent-blue text weight 500. Use for tertiary/ghost actions. */
  | 'ghost'
  /** Faint white bg + subtle white border + white text. Use for Cancel / Reset actions in modals. */
  | 'neutral';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  /** Optional leading Lucide icon component */
  icon?: LucideIcon;
  loading?: boolean;
  disabled?: boolean;
  /** Override wrapper style (flex, margin, height, etc.) */
  style?: StyleProp<ViewStyle>;
  /** Override border radius (defaults to BorderRadius.pill for outlined, BorderRadius.sm for ghost) */
  borderRadius?: number;
};

const SecondaryButton = ({
  label,
  onPress,
  variant = 'outlined',
  icon: Icon,
  loading = false,
  disabled = false,
  style,
  borderRadius: borderRadiusProp,
}: Props) => {
  const isGhost = variant === 'ghost';
  const isNeutral = variant === 'neutral';
  const radius = borderRadiusProp ?? (isGhost ? BorderRadius.sm : BorderRadius.pill);

  const variantStyle = isNeutral ? styles.neutral : isGhost ? styles.ghost : styles.outlined;
  const labelVariantStyle = isNeutral ? styles.labelNeutral : isGhost ? styles.labelGhost : styles.labelOutlined;

  const containerStyle = [
    styles.base,
    variantStyle,
    { borderRadius: radius },
    disabled && styles.disabled,
    style,
  ];

  const iconColor = isNeutral ? Colors.base.textPrimary : Colors.base.accent;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || loading}
      style={containerStyle}
    >
      {Icon && (
        <Icon
          size={18}
          color={iconColor}
        />
      )}
      <Text style={[styles.label, labelVariantStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: Spacings.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacings.xs,
    height: 52,
  },

  outlined: {
    // Pencil DS: stroke 1.5px accent-blue, pill, no fill
    borderWidth: 1.5,
    borderColor: Colors.base.accent,
  },

  ghost: {
    // Pencil DS: no border, no fill, accent text weight 500
    borderWidth: 0,
  },

  neutral: {
    // Pencil DS: faint white bg + subtle white border — Cancel/Reset buttons
    backgroundColor: hexToRgba('#FFFFFF', 0.03),
    borderWidth: 1,
    borderColor: hexToRgba('#FFFFFF', 0.1),
  },

  disabled: {
    opacity: 0.4,
  },

  label: {
    ...Fonts.bodyTextBold,
    fontSize: ms(15),
    color: Colors.base.accent,
  },

  labelOutlined: {
    // accent color already set in base label
    fontWeight: '600',
  },

  labelGhost: {
    // Pencil DS Ghost: weight 500 (Inter-Medium)
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    color: Colors.base.accent,
  },

  labelNeutral: {
    // Pencil DS Neutral: white text, weight 500 (Inter-Medium)
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    color: Colors.base.textPrimary,
  },
});
