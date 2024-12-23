import { useState, useEffect } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";

import MedicationList from "@/components/MedicationList";
import styles from "./styles";

import { MedicationService } from "@/services/medication.service";

const DATA_MOCK = [
  {
    name: "Dexason",
    chemicalComposition: "Dexametasona",
  },
  {
    name: "Seki",
    chemicalComposition: "Fendizoato de cloperastina",
  },
  {
    name: "Sinvastacor",
    chemicalComposition: "Sinvastantina 20mg",
  },
  {
    name: "Novacort",
    chemicalComposition:
      "Cetoconazol 20mg, Dipropionato de betametasona 0.64mg, sulfato de neomicina 2.5mg",
  },
  {
    name: "Lozeprel",
    chemicalComposition: "Omeprazol",
  },
  {
    name: "Sinvastacor",
    chemicalComposition: "Sinvastantina 20mg",
  },
  {
    name: "Novacort",
    chemicalComposition:
      "Cetoconazol 20mg, Dipropionato de betametasona 0.64mg, sulfato de neomicina 2.5mg",
  },
  {
    name: "Lozeprel",
    chemicalComposition: "Omeprazol",
  },
];

export default function Index() {
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    MedicationService.getAllMedications();
  }, []);

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
