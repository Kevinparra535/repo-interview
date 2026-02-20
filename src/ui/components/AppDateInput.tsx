import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import BorderRadius from '@/ui/styles/BorderRadius';
import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';
import Spacings from '@/ui/styles/Spacings';

type Props = {
  /** Controlled date value — keep undefined until first selection */
  value?: Date;
  /** Called when the user finishes typing a valid DD/MM/AAAA date, or undefined when cleared */
  onChangeDate: (date: Date | undefined) => void;
  /** Called when field is blurred (useful for react-hook-form's onBlur) */
  onBlur?: () => void;
  label?: string;
  error?: string;
  placeholder?: string;
};

// ── helpers ─────────────────────────────────────────────────────────────────

function formatDMY(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

function parseDMY(text: string): Date | null {
  const parts = text.split('/');
  if (parts.length !== 3) return null;

  const d = Number(parts[0]);
  const m = Number(parts[1]);
  const y = Number(parts[2]);

  if (!d || !m || !y || y < 1900 || y > 2200) return null;

  const date = new Date(y, m - 1, d);

  // Validate day and month overflow
  if (date.getDate() !== d || date.getMonth() !== m - 1) return null;

  return date;
}

// ── component ────────────────────────────────────────────────────────────────

const AppDateInput = ({ value, onChangeDate, onBlur, label, error, placeholder }: Props) => {
  const [localText, setLocalText] = useState(value ? formatDMY(value) : '');
  const [focused, setFocused] = useState(false);

  // Sync external value changes (e.g. reset)
  useEffect(() => {
    if (!focused) {
      setLocalText(value ? formatDMY(value) : '');
    }
  }, [value, focused]);

  const handleEndEditing = () => {
    setFocused(false);
    onBlur?.();

    const parsed = parseDMY(localText);
    if (parsed) {
      onChangeDate(parsed);
    }
  };

  const handleClear = () => {
    setLocalText('');
    onChangeDate(undefined);
    onBlur?.();
  };

  return (
    <View style={styles.fieldWrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={[styles.inputBar, error ? styles.inputBarError : null]}>
        <TextInput
          style={styles.input}
          value={localText}
          onChangeText={setLocalText}
          onFocus={() => setFocused(true)}
          onEndEditing={handleEndEditing}
          placeholder={placeholder ?? 'DD/MM/AAAA'}
          placeholderTextColor={Colors.base.textMuted}
          keyboardType="numbers-and-punctuation"
          maxLength={10}
          autoCorrect={false}
        />

        {localText.length > 0 ? (
          <TouchableOpacity onPress={handleClear} hitSlop={8}>
            <Ionicons name="close-circle" size={16} color={Colors.base.iconMuted} />
          </TouchableOpacity>
        ) : (
          <Ionicons name="calendar-outline" size={16} color={Colors.base.iconMuted} />
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default AppDateInput;

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
});
