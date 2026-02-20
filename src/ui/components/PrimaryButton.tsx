import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import GradientView from '@/ui/components/GradientView';
import BorderRadius from '@/ui/styles/BorderRadius';
import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';
import { ms } from '@/ui/styles/FontsScale';
import Shadows from '@/ui/styles/Shadows';
import Spacings from '@/ui/styles/Spacings';

type Props = {
  label: string;
  onPress: () => void;
  /** Optional leading Ionicons icon */
  iconName?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  /** Override wrapper style (width, margin, etc.) */
  style?: StyleProp<ViewStyle>;
  /** Override border radius (default: BorderRadius.pill) */
  borderRadius?: number;
  /** Override button height (default: 52) */
  height?: number;
};

const PrimaryButton = ({
  label,
  onPress,
  iconName,
  loading = false,
  disabled = false,
  style,
  borderRadius: borderRadiusProp,
  height: heightProp,
}: Props) => {
  const radius = borderRadiusProp ?? BorderRadius.pill;
  const btnHeight = heightProp ?? 52;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.wrapper, disabled && styles.wrapperDisabled, { borderRadius: radius }, style]}
    >
      <GradientView
        preset="accent"
        style={[
          styles.gradient,
          disabled && styles.gradientDisabled,
          { borderRadius: radius, height: btnHeight },
        ]}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.base.textPrimary} />
        ) : (
          <>
            {iconName && <Ionicons name={iconName} size={20} color={Colors.base.textPrimary} />}
            <Text style={styles.label}>{label}</Text>
          </>
        )}
      </GradientView>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderRadius: BorderRadius.pill,
    ...Shadows.bankButton,
  },

  wrapperDisabled: {
    opacity: 0.5,
  },

  gradient: {
    paddingHorizontal: Spacings.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacings.xs,
    width: '100%',
    height: 52,
    borderRadius: BorderRadius.pill,
  },

  gradientDisabled: {
    opacity: 0.7,
  },

  label: {
    ...Fonts.bodyTextBold,
    fontSize: ms(16),
    color: Colors.base.textPrimary,
  },
});
