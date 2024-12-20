import { useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";

import MedicationCard from "../../components/MedicationCard";
import styles from "./styles";

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
        <MedicationCard
          medicationTitle="Dexason"
          chemicalComposition="Dexametasona"
        />
      </View>
    </View>
  );
}
