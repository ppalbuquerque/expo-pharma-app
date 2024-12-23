import { useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";

import MedicationList from "@/components/MedicationList";
import styles from "./styles";

const DATA_MOCK = [
  {
    medicationTitle: "Dexason",
    chemicalComposition: "Dexametasona",
  },
  {
    medicationTitle: "Seki",
    chemicalComposition: "Fendizoato de cloperastina",
  },
  {
    medicationTitle: "Sinvastacor",
    chemicalComposition: "Sinvastantina 20mg",
  },
  {
    medicationTitle: "Novacort",
    chemicalComposition:
      "Cetoconazol 20mg, Dipropionato de betametasona 0.64mg, sulfato de neomicina 2.5mg",
  },
  {
    medicationTitle: "Lozeprel",
    chemicalComposition: "Omeprazol",
  },
  {
    medicationTitle: "Sinvastacor",
    chemicalComposition: "Sinvastantina 20mg",
  },
  {
    medicationTitle: "Novacort",
    chemicalComposition:
      "Cetoconazol 20mg, Dipropionato de betametasona 0.64mg, sulfato de neomicina 2.5mg",
  },
  {
    medicationTitle: "Lozeprel",
    chemicalComposition: "Omeprazol",
  },
];

export default function Index() {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Searchbar
          placeholder="Nome, composto ou função"
          value={searchValue}
          onChangeText={setSearchValue}
        />
        <MedicationList medicationList={DATA_MOCK} />
      </View>
    </View>
  );
}
