import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import BorderRadius from '@/ui/styles/BorderRadius';
import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';
import Spacings from '@/ui/styles/Spacings';

type FormInputProps = TextInputProps & {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  required?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export const FormInput = ({
  label,
  icon,
  error,
  required = false,
  containerStyle,
  style,
  placeholderTextColor,
  ...textInputProps
}: FormInputProps) => (
  <View style={[styles.container, containerStyle]}>
    <Text style={styles.label}>
      {label}
      {required ? <Text style={styles.required}> *</Text> : null}
    </Text>

    <View style={[styles.inputWrapper, !!error && styles.inputWrapperError]}>
      {icon && <Ionicons name={icon} size={16} color={Colors.base.iconMuted} style={styles.icon} />}

      <TextInput
        {...textInputProps}
        style={[styles.input, style]}
        placeholderTextColor={placeholderTextColor ?? Colors.base.textMuted}
      />
    </View>

    <Text style={[styles.errorText, !error && styles.errorTextHidden]}>{error ?? ' '}</Text>
  </View>
);

export default FormInput;

const styles = StyleSheet.create({
  container: {
    gap: 6,
    width: '100%',
  },

  label: {
    ...Fonts.bodyTextBold,
    fontSize: 13,
    color: Colors.base.textPrimary,
  },

  required: {
    color: Colors.alerts.error,
  },

  inputWrapper: {
    paddingRight: Spacings.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacings.xs,
    width: '100%',
    backgroundColor: Colors.base.inputBg,
    borderWidth: 1,
    borderColor: Colors.base.inputBorder,
    borderRadius: BorderRadius.sm,
  },

  inputWrapperError: {
    borderWidth: 1.5,
    borderColor: Colors.base.inputErrorBorder,
  },

  icon: {
    marginLeft: Spacings.md,
  },

  input: {
    paddingHorizontal: Spacings.md,
    height: 48,
    flex: 1,
    ...Fonts.inputsNormal,
    color: Colors.base.textPrimary,
  },

  errorText: {
    ...Fonts.labelInputError,
  },

  errorTextHidden: {
    opacity: 0,
  },
});
