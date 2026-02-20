import { Ionicons } from '@expo/vector-icons';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import BorderRadius from '@/ui/styles/BorderRadius';
import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';
import { ms } from '@/ui/styles/FontsScale';
import Spacings from '@/ui/styles/Spacings';

type Variant =
  /** Transparent bg + 1.5px accent-blue border. Use for secondary actions (Edit, View). */
  | 'outlined'
  /** No border, no fill, accent-blue text weight 500. Use for tertiary/ghost actions. */
  | 'ghost';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  /** Optional leading Ionicons icon */
  iconName?: keyof typeof Ionicons.glyphMap;
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
  iconName,
  loading = false,
  disabled = false,
  style,
  borderRadius: borderRadiusProp,
}: Props) => {
  const isGhost = variant === 'ghost';
  const radius = borderRadiusProp ?? (isGhost ? BorderRadius.sm : BorderRadius.pill);

  const containerStyle = [
    styles.base,
    isGhost ? styles.ghost : styles.outlined,
    { borderRadius: radius },
    disabled && styles.disabled,
    style,
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || loading}
      style={containerStyle}
    >
      {iconName && (
        <Ionicons
          name={iconName}
          size={18}
          color={Colors.base.accent}
        />
      )}
      <Text style={[styles.label, isGhost ? styles.labelGhost : styles.labelOutlined]}>
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
});
