import React from "react";
import { Text, View } from "react-native";

import PharmaCard from "@/shared/components/common/Card";
import { SeparalionLine } from "@/shared/components/common/SeparationLine";
import { PriceBox } from "@/features/medicines/components/PriceBox";

import buildStyles from "./GeneralInfo.styles";

type Props = {
  medicationName: string;
  boxPrice: string;
  unitPrice: string;
  shelfLocation: string;
  stock: boolean;
  usefulness: string;
};

export function GeneralInfoSection({
  medicationName,
  stock,
  shelfLocation,
  boxPrice,
  unitPrice,
  usefulness,
}: Props) {
  const styles = buildStyles({ stockAvailability: stock });

  return (
    <PharmaCard style={styles.container}>
      <View>
        <Text style={styles.medicationName}>{medicationName}</Text>
        <View style={styles.subInfoContainer}>
          <View style={styles.stockAvailabilityContainer}>
            <View style={styles.stockAvailabilityDot} />
            <Text style={styles.stockAvailaibilityText}>Em estoque</Text>
          </View>
          <View style={styles.grayDot} />
          <Text>Prateleira A2</Text>
        </View>
      </View>
      <View style={styles.priceBoxContainer}>
        <PriceBox boxType="boxPrice" price={boxPrice} />
      </View>
      <PriceBox boxType="unitPrice" price={unitPrice} />
      <SeparalionLine marginBottom={24} marginTop={24} />
      <View>
        <Text style={styles.usefulnessTitle}>Uso do medicamento</Text>
        <Text style={styles.usefulnessTextArea}>
          Amoxicillin is a penicillin antibiotic used to treat bacterial
          infections including pneumonia, bronchitis, ear infections, urinary
          tract infections, and skin infections. It works by stopping the growth
          of bacteria.
        </Text>
      </View>
    </PharmaCard>
  );
}
