import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import BorderRadius from '@/ui/styles/BorderRadius';
import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';
import Shadows from '@/ui/styles/Shadows';
import Spacings from '@/ui/styles/Spacings';

type Variant = 'default' | 'search';

type Props = Omit<TextInputProps, 'style'> & {
  /**
   * - `default`: rectangular, for forms — supports label & error
   * - `search`: pill-shaped with a leading search icon
   */
  variant?: Variant;
  /** Label displayed above the input (default variant only) */
  label?: string;
  /** Inline error message displayed below the input (default variant only) */
  error?: string;
  /** Show success state (green border + check icon) — default variant only */
  success?: boolean;
  /** Leading Ionicons icon (overrides the default search icon for the search variant) */
  leadingIcon?: keyof typeof Ionicons.glyphMap;
};

// ── state resolvers (extracted to keep component cognitive complexity low) ───

function resolveInputBarState(opts: {
  isDisabled: boolean;
  hasError: boolean;
  success: boolean;
  isFocused: boolean;
}) {
  const { isDisabled, hasError, success, isFocused } = opts;
  if (isDisabled) {
    return {
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.05)',   // #FFFFFF0D
      backgroundColor: '#111F38',
    };
  }
  if (hasError) {
    return { borderWidth: 1.5, borderColor: Colors.base.inputErrorBorder, ...Shadows.inputError };
  }
  if (success) {
    return { borderWidth: 1.5, borderColor: Colors.base.inputSuccessBorder };
  }
  if (isFocused) {
    return { borderWidth: 2, borderColor: Colors.base.accent, ...Shadows.inputFocus };
  }
  return { borderWidth: 1, borderColor: Colors.base.inputBorder };
}

function resolveTrailingIcon(hasError: boolean, success: boolean) {
  if (hasError) return { name: 'warning-outline' as const, color: Colors.base.inputErrorBorder };
  if (success) return { name: 'checkmark-circle-outline' as const, color: Colors.base.inputSuccessBorder };
  return null;
}

// ── component ────────────────────────────────────────────────────────────────

const AppTextInput = ({
  variant = 'default',
  label,
  error,
  success = false,
  leadingIcon,
  placeholderTextColor,
  onFocus,
  onBlur,
  editable = true,
  ...rest
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const isSearch = variant === 'search';
  const iconName = leadingIcon ?? (isSearch ? 'search' : undefined);
  const isDisabled = !editable;

  // ── Search variant (pill search bar, no label/error/state) ─────────────
  if (isSearch) {
    return (
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          {iconName ? (
            <Ionicons name={iconName} size={18} color={Colors.base.iconMuted} />
          ) : null}
          <TextInput
            style={styles.searchInput}
            placeholderTextColor={placeholderTextColor ?? Colors.base.textMuted}
            autoCorrect={false}
            editable={editable}
            onFocus={onFocus}
            onBlur={onBlur}
            {...rest}
          />
        </View>
      </View>
    );
  }

  // ── Default form variant ───────────────────────────────────────────────
  const inputBarState = resolveInputBarState({ isDisabled, hasError: Boolean(error), success, isFocused });
  const trailingIcon = resolveTrailingIcon(Boolean(error), success);

  const handleFocus: typeof onFocus = (e) => { setIsFocused(true); onFocus?.(e); };
  const handleBlur: typeof onBlur = (e) => { setIsFocused(false); onBlur?.(e); };

  return (
    <View style={styles.fieldWrapper}>
      {label ? (
        <Text style={[styles.label, isDisabled && styles.labelDisabled]}>{label}</Text>
      ) : null}

      <View style={[styles.inputBar, inputBarState]}>
        {iconName ? (
          <Ionicons
            name={iconName}
            size={16}
            color={isDisabled ? Colors.base.textMuted : Colors.base.iconMuted}
          />
        ) : null}

        <TextInput
          style={[styles.input, isDisabled && styles.inputDisabled]}
          placeholderTextColor={placeholderTextColor ?? Colors.base.textMuted}
          autoCorrect={false}
          editable={editable}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />

        {trailingIcon ? (
          <Ionicons name={trailingIcon.name} size={18} color={trailingIcon.color} />
        ) : null}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  fieldWrapper: {
    gap: Spacings.xs,
    width: '100%',
  },

  label: {
    ...Fonts.links,
    color: Colors.base.textSecondary,
  },

  labelDisabled: {
    color: Colors.base.textMuted,
  },

  inputBar: {
    paddingHorizontal: Spacings.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacings.xs,
    width: '100%',
    height: 48,
    // Pencil DS: fill #1C2E4A, cornerRadius 12
    backgroundColor: Colors.base.inputBg,
    borderRadius: BorderRadius.sm,       // 12 — matches Pencil DS cornerRadius: 12
  },

  input: {
    flex: 1,
    ...Fonts.inputsNormal,
    color: Colors.base.textPrimary,
  },

  inputDisabled: {
    color: '#607D8B',
  },

  errorText: {
    ...Fonts.labelInputError,
  },

  searchWrapper: {
    width: '100%',
  },

  searchBar: {
    paddingHorizontal: Spacings.spacex2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacings.sm,
    width: '100%',
    height: 48,
    backgroundColor: Colors.base.bgSearchBar,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.base.bgSearchBarBorder,
  },

  searchInput: {
    flex: 1,
    ...Fonts.inputsNormal,
    color: Colors.base.textPrimary,
  },
});

