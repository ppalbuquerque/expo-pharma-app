import React from "react";
import {
  View,
  TextInput as RNTextInput,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  KeyboardTypeOptions,
} from "react-native";
import { useTheme } from "react-native-paper";

import styles from "./styles";

interface Props {
  errorText?: string;
  label: string;
  error: boolean;
  value: string | undefined;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  helperText?: string;
}

export default function TextInput({
  errorText,
  label,
  error,
  value,
  onBlur,
  onChangeText,
  keyboardType,
  helperText,
}: Props) {
  const { colors } = useTheme();

  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <RNTextInput
        value={value}
        onBlur={onBlur}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={styles.inputContainer}
      />
      {error && (
        <Text style={[{ color: colors.error }, styles.errorMessage]}>
          {errorText}
        </Text>
      )}
      <Text style={styles.helperText}>{helperText}</Text>
    </View>
  );
}
