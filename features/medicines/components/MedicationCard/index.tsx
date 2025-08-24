import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import styles from "./styles";

type Props = {
  medicationTitle: string;
  chemicalComposition: string;
};

export default function MedicationCard({
  chemicalComposition,
  medicationTitle,
}: Props) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.contentLeftContainer}>
          <Image style={styles.image} source="https://picsum.photos/200" />
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
    </View>
  );
}
