import React from "react";
import { View } from "react-native";

import { dialogActionsStyle as styles } from "./styles";
import { SeparalionLine } from "../SeparationLine";

type Props = {
  children: React.ReactNode;
};

export function DialogActions({ children }: Props) {
  return (
    <View>
      <SeparalionLine />
      <View style={styles.container}>{children}</View>
    </View>
  );
}
