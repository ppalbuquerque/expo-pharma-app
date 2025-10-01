import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import styles from "./styles";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function Card({ children, style }: Props) {
  return <View style={[styles.cardContainer, style]}>{children}</View>;
}
