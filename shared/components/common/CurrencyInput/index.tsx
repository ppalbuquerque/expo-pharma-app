import React from "react";
import { Text, View } from "react-native";
import {
  MoneyTextInput,
  MoneyTextInputProps,
} from "@alexzunik/react-native-money-input";

import styles from "./styles";

interface ICurrencyInputProps {
  value: string;
  label: string;
  helperText?: string;
  onChangeText: MoneyTextInputProps["onChangeText"];
}

export default function CurrencyInput({
  value,
  onChangeText,
  label,
  helperText,
}: ICurrencyInputProps) {
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
        />
      </View>
      <Text style={styles.helperText}>{helperText}</Text>
    </View>
  );
}
