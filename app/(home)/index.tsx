import { useState, useEffect } from "react";
import { View } from "react-native";
import { Searchbar, FAB } from "react-native-paper";
import { Link } from "expo-router";

import MedicationList from "@/components/MedicationList";
import { useMedications } from "@/hooks/useMedications";

import styles from "./styles";

export default function Index() {
  const [searchValue, setSearchValue] = useState<string>("");
  const { medications, getMedications } = useMedications();

  useEffect(() => {
    getMedications();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Searchbar
          placeholder="Nome, composto ou função"
          value={searchValue}
          onChangeText={setSearchValue}
        />
        <MedicationList medicationList={medications} />
      </View>
      <Link href="/(medication)/register" style={styles.addNewButton}>
        <FAB icon="plus" size="large" />
      </Link>
    </View>
  );
}
