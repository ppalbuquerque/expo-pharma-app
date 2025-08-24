import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

type Props = {
  children: string;
  tintColor?: string;
};

export default function HomeHeader({ children, tintColor }: Props) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Miss France</Text>
      <Text style={styles.medicationCounter}>544 Medicamentos</Text>
    </View>
  );
}
