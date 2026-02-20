import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, {
  DateTimePickerAndroid,
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import BorderRadius from '@/ui/styles/BorderRadius';
import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';
import Shadows from '@/ui/styles/Shadows';
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
  const [showIosPicker, setShowIosPicker] = useState(false);

  const syncDate = (rawDate: Date) => {
    const normalizedDate = new Date(rawDate);
    normalizedDate.setHours(0, 0, 0, 0);

    setLocalText(formatDMY(normalizedDate));
    onChangeDate(normalizedDate);
    onBlur?.();
    setFocused(false);
  };

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

  const handleCalendarPress = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('No disponible en web', 'El selector de fecha está disponible en iOS y Android.');
      return;
    }

    const initialDate = value ?? parseDMY(localText) ?? new Date();

    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: initialDate,
        mode: 'date',
        is24Hour: true,
        onChange: (event, selectedDate) => {
          if (event.type === 'set' && selectedDate) {
            syncDate(selectedDate);
          }
        },
      });
      return;
    }

    setShowIosPicker(true);
  };

  const handleIosPickerChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      syncDate(selectedDate);
    }
  };

  return (
    <View style={styles.fieldWrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputBar,
          error
            ? { borderWidth: 1.5, borderColor: Colors.base.inputErrorBorder, ...Shadows.inputError }
            : focused
              ? { borderWidth: 2, borderColor: Colors.base.accent, ...Shadows.inputFocus }
              : { borderWidth: 1, borderColor: Colors.base.inputBorder },
        ]}
      >
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

        <View style={styles.actions}>
          {localText.length > 0 ? (
            <TouchableOpacity onPress={handleClear} hitSlop={8}>
              <Ionicons name="close-circle" size={16} color={Colors.base.iconMuted} />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity onPress={handleCalendarPress} hitSlop={8}>
            <Ionicons name="calendar-outline" size={16} color={Colors.base.iconMuted} />
          </TouchableOpacity>
        </View>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {Platform.OS === 'ios' && showIosPicker ? (
        <View style={styles.iosPickerContainer}>
          <DateTimePicker
            value={value ?? parseDMY(localText) ?? new Date()}
            mode="date"
            display="spinner"
            onChange={handleIosPickerChange}
            textColor={Colors.base.textPrimary}
          />

          <TouchableOpacity style={styles.iosDoneButton} onPress={() => setShowIosPicker(false)}>
            <Text style={styles.iosDoneText}>Listo</Text>
          </TouchableOpacity>
        </View>
      ) : null}
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
    backgroundColor: Colors.base.inputBg,
    borderRadius: BorderRadius.sm,
  },

  input: {
    flex: 1,
    ...Fonts.inputsNormal,
    color: Colors.base.textPrimary,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacings.sm,
  },

  errorText: {
    ...Fonts.labelInputError,
  },

  iosPickerContainer: {
    marginTop: Spacings.sm,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.base.inputBorder,
    backgroundColor: Colors.base.inputBg,
    overflow: 'hidden',
  },

  iosDoneButton: {
    borderTopWidth: 1,
    borderTopColor: Colors.base.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacings.sm,
  },

  iosDoneText: {
    ...Fonts.links,
    color: Colors.base.accent,
  },
});
