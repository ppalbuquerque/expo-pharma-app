import { FlatList, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import MedicationCard from "../MedicationCard";
import styles from "./styles";
import { Medication } from "@types";

type Props = {
  medicationList: Medication[];
};

export default function MedicationList({ medicationList }: Props) {
  return (
    <FlatList
      data={medicationList}
      style={styles.listcontainer}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <MedicationCard
            medicationTitle={item.name}
            chemicalComposition={item.chemicalComposition}
          />
        </View>
      )}
    />
  );
}
