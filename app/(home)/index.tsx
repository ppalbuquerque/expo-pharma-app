import { useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";

import MedicationList from "@/components/MedicationList";
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
        <MedicationList />
      </View>
    </View>
  );
}
