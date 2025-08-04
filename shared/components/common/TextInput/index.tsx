import React from "react";
import { View } from "react-native";
import {
  TextInput as PaperTextInput,
  TextInputProps,
  Text,
  useTheme,
} from "react-native-paper";

import styles from "./styles";

interface Props extends TextInputProps {
  errorText?: string;
}

export default function TextInput({ errorText, ...props }: Props) {
  const { colors } = useTheme();

  return (
    <View>
      <PaperTextInput {...props} mode="outlined" />
      {props.error && (
        <Text style={[{ color: colors.error }, styles.errorMessage]}>
          {errorText}
        </Text>
      )}
    </View>
  );
}
