import React from "react";
import {
  Button as PaperButton,
  ButtonProps,
  useTheme,
} from "react-native-paper";

import styles from "./styles";

interface Props extends ButtonProps {}

export default function Button({ children, ...props }: Props) {
  const { colors } = useTheme();
  return (
    <PaperButton
      textColor={colors.onSurface}
      buttonColor={colors.secondaryContainer}
      {...props}
      style={[styles.container, props.style]}
    >
      {children}
    </PaperButton>
  );
}
