import type { LucideIcon } from 'lucide-react-native';
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

type Variant = 'accent' | 'destructive';

type Props = {
  label: string;
  onPress: () => void;
  /**
   * Button color variant.
   * - `accent` (default): blue gradient `#2D7EF8 → #1A5FCC`
   * - `destructive`: red gradient `#E53935 → #C62828`
   */
  variant?: Variant;
  /** Optional leading Lucide icon component */
  icon?: LucideIcon;
  loading?: boolean;
  disabled?: boolean;
  /** Override wrapper style (width, margin, etc.) */
  style?: StyleProp<ViewStyle>;
  /** Override border radius (default: BorderRadius.pill) */
  borderRadius?: number;
  /** Override button height (default: 52) */
  height?: number;
};

const VARIANT_GRADIENT: Record<Variant, [string, string]> = {
  accent: [Colors.base.accentGradientStart, Colors.base.accentGradientEnd],
  destructive: [Colors.base.dangerPrimary, Colors.base.dangerDark],
};

const VARIANT_SHADOW: Record<Variant, object> = {
  accent: Shadows.bankButton,
  destructive: Shadows.destructiveButton,
};

const PrimaryButton = ({
  label,
  onPress,
  variant = 'accent',
  icon: Icon,
  loading = false,
  disabled = false,
  style,
  borderRadius: borderRadiusProp,
  height: heightProp,
}: Props) => {
  const radius = borderRadiusProp ?? BorderRadius.pill;
  const btnHeight = heightProp ?? 52;
  const [gradientStart, gradientEnd] = VARIANT_GRADIENT[variant];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.wrapper,
        VARIANT_SHADOW[variant],
        disabled && styles.wrapperDisabled,
        { borderRadius: radius },
        style,
      ]}
    >
      <GradientView
        colors={[gradientStart, gradientEnd]}
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
            {Icon && <Icon size={20} color={Colors.base.textPrimary} />}
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
