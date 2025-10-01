import React from "react";
import { View } from "react-native";

import buildStyles from "./styles";

type Props = {
  backgroundColor?: string;
  marginTop?: number;
  marginBottom?: number;
};

export function SeparalionLine({
  backgroundColor,
  marginBottom,
  marginTop,
}: Props) {
  const styles = buildStyles({
    marginBottom,
    marginTop,
    backgroundColor,
  });

  return <View style={styles.container} />;
}
