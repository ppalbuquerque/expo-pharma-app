import React from "react";
import { TouchableOpacity } from "react-native";

import buildStyles, { ButtonType } from "./styles";

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  type?: ButtonType;
};

export function OutlinedButton({ children, onPress, type = "normal" }: Props) {
  const styles = buildStyles({
    buttonType: type,
  });

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}
