import React from "react";
import {
  Button as PaperButton,
  ButtonProps,
  useTheme,
} from "react-native-paper";

interface Props extends ButtonProps {}

export default function Button({ children, ...props }: Props) {
  const { colors } = useTheme();
  return (
    <PaperButton
      {...props}
      textColor={colors.onSurface}
      buttonColor={colors.secondaryContainer}
    >
      {children}
    </PaperButton>
  );
}
