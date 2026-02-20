import { Ionicons } from '@expo/vector-icons';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import BorderRadius from '@/ui/styles/BorderRadius';
import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';
import { ms } from '@/ui/styles/FontsScale';
import Spacings from '@/ui/styles/Spacings';
import { hexToRgba } from '@/ui/utils/colorUtils';

type Variant =
  /** Transparent bg + accent-blue border. Use for secondary actions (Edit, View). */
  | 'outlined'
  /** Transparent bg + white-25% border. Use for form actions (Reset, Cancel). */
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
          color={isGhost ? Colors.base.textSecondary : Colors.base.accent}
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
    borderWidth: 1,
  },

  outlined: {
    borderColor: Colors.base.accent,
  },

  ghost: {
    borderColor: hexToRgba('#FFFFFF', 0.25),
  },

  disabled: {
    opacity: 0.4,
  },

  label: {
    ...Fonts.bodyTextBold,
    fontSize: ms(15),
  },

  labelOutlined: {
    color: Colors.base.accent,
  },

  labelGhost: {
    color: Colors.base.textSecondary,
  },
});
