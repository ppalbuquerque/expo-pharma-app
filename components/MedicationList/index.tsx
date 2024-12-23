import { FlatList, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import MedicationCard from "../MedicationCard";
import styles from "./styles";

const DATA_MOCK = [
  {
    title: "Dexason",
    chemicalComposition: "Dexametasona",
  },
  {
    title: "Seki",
    chemicalComposition: "Fendizoato de cloperastina",
  },
  {
    title: "Sinvastacor",
    chemicalComposition: "Sinvastantina 20mg",
  },
  {
    title: "Novacort",
    chemicalComposition:
      "Cetoconazol 20mg, Dipropionato de betametasona 0.64mg, sulfato de neomicina 2.5mg",
  },
  {
    title: "Lozeprel",
    chemicalComposition: "Omeprazol",
  },
  {
    title: "Sinvastacor",
    chemicalComposition: "Sinvastantina 20mg",
  },
  {
    title: "Novacort",
    chemicalComposition:
      "Cetoconazol 20mg, Dipropionato de betametasona 0.64mg, sulfato de neomicina 2.5mg",
  },
  {
    title: "Lozeprel",
    chemicalComposition: "Omeprazol",
  },
];

export default function MedicationList() {
  return (
    <FlatList
      data={DATA_MOCK}
      style={styles.listcontainer}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <MedicationCard
            medicationTitle={item.title}
            chemicalComposition={item.chemicalComposition}
          />
        </View>
      )}
    />
  );
}
