import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import styles from "./styles";

import Card from "@/shared/components/common/Card";

type Props = {
  medicationTitle: string;
  chemicalComposition: string;
  coverPhoto: string;
};

export default function MedicationCard({
  chemicalComposition,
  medicationTitle,
  coverPhoto,
}: Props) {
  return (
    <Card>
      <View style={styles.contentContainer}>
        <View style={styles.contentLeftContainer}>
          <Image style={styles.image} source={coverPhoto} />
          <View style={styles.infoContainer}>
            <Text style={styles.medicationTitle}>{medicationTitle}</Text>
            <Text style={styles.medicationDescription}>
              {chemicalComposition}
            </Text>
            <View style={styles.shelfLocationContainer}>
              <EvilIcons name="location" size={20} color="black" />
              <Text style={styles.shelfLocationText}>Prateleira 3F</Text>
            </View>
          </View>
        </View>
        <View style={styles.stockIndicator} />
      </View>
    </Card>
  );
}
