import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import BorderRadius from '@/ui/styles/BorderRadius';
import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';
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
  /** Leading Ionicons icon (overrides the default search icon for the search variant) */
  leadingIcon?: keyof typeof Ionicons.glyphMap;
};

const AppTextInput = ({
  variant = 'default',
  label,
  error,
  leadingIcon,
  placeholderTextColor,
  ...rest
}: Props) => {
  const isSearch = variant === 'search';
  const iconName = leadingIcon ?? (isSearch ? 'search' : undefined);

  return (
    <View style={isSearch ? styles.searchWrapper : styles.fieldWrapper}>
      {/* Label — default variant only */}
      {!isSearch && label ? <Text style={styles.label}>{label}</Text> : null}

      {/* Input row */}
      <View
        style={isSearch ? styles.searchBar : [styles.inputBar, error ? styles.inputBarError : null]}
      >
        {iconName ? (
          <Ionicons name={iconName} size={isSearch ? 18 : 16} color={Colors.base.iconMuted} />
        ) : null}

        <TextInput
          style={isSearch ? styles.searchInput : styles.input}
          placeholderTextColor={placeholderTextColor ?? Colors.base.textMuted}
          autoCorrect={false}
          {...rest}
        />
      </View>

      {/* Error — default variant only */}
      {!isSearch && error ? <Text style={styles.errorText}>{error}</Text> : null}
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

  inputBar: {
    paddingHorizontal: Spacings.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacings.xs,
    width: '100%',
    height: 48,
    backgroundColor: Colors.base.bgSearchBar,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.base.bgSearchBarBorder,
  },

  inputBarError: {
    borderColor: Colors.alerts.error,
  },

  input: {
    flex: 1,
    ...Fonts.inputsNormal,
    color: Colors.base.textPrimary,
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
