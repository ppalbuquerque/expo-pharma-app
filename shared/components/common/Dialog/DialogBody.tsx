import React from "react";
import { View } from "react-native";

import { dialogBodyStyles as styles } from "./styles";
import { SeparalionLine } from "../SeparationLine";

type Props = {
  children: React.ReactNode;
};

export function DialogBody({ children }: Props) {
  return (
    <View>
      <SeparalionLine marginTop={0} />
      <View style={styles.container}>{children}</View>
    </View>
  );
}
