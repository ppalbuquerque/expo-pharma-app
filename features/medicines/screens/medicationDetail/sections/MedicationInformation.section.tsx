import React from "react";
import { View, Text } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import PharmaCard from "@/shared/components/common/Card";

import styles from "./MedicationInformation.styles";

type Props = {
  posology: string;
  chemicalComposition: string;
  shelfLocation: string;
  stock: number;
};

export function MedicationInformationSection({
  posology,
  chemicalComposition,
  shelfLocation,
  stock,
}: Props) {
  return (
    <PharmaCard style={styles.container}>
      <Text style={styles.cardTitle}>Informação do Medicamento</Text>
      <View>
        <Text style={styles.attributeTitle}>Posologia</Text>
        <Text>{posology}</Text>
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.attributeTitle}>Composição Química</Text>
        <Text>{chemicalComposition}</Text>
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.attributeTitle}>Posição na prateleira</Text>
        <View style={styles.shelfLocationAttributeContainer}>
          <EvilIcons name="location" size={20} color="black" />
          <Text>{shelfLocation}</Text>
        </View>
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.attributeTitle}>Estoque</Text>
        <Text>{stock} unidades</Text>
      </View>
    </PharmaCard>
  );
}
