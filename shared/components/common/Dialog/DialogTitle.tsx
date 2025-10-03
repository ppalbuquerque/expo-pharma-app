import React from "react";
import { Text, View } from "react-native";

import { dialogTitleStyles as styles } from "./styles";

type Props = {
  title: string;
  icon?: React.ReactNode;
};

export function DialogTitle({ title, icon }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
