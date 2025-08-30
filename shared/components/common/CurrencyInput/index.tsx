import React from "react";
import { Text, TextInputProps, View } from "react-native";
import {
  MoneyTextInput,
  MoneyTextInputProps,
} from "@alexzunik/react-native-money-input";

import buildStyles from "./styles";

interface ICurrencyInputProps {
  value: string;
  label: string;
  helperText?: string;
  onChangeText: MoneyTextInputProps["onChangeText"];
  hasError: boolean;
  onBlur: TextInputProps["onBlur"];
}

export default function CurrencyInput({
  value,
  onChangeText,
  label,
  helperText,
  hasError,
  onBlur,
}: ICurrencyInputProps) {
  const styles = buildStyles(hasError);

  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <MoneyTextInput
          value={value}
          onChangeText={(formatted: string, extracted?: string) =>
            onChangeText(extracted || "")
          }
          prefix="R$ "
          groupingSeparator="."
          fractionSeparator=","
          onBlur={onBlur}
        />
      </View>
      <Text style={styles.helperText}>{helperText}</Text>
    </View>
  );
}
