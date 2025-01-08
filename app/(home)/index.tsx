import { useState, useEffect } from "react";
import { View } from "react-native";
import { Searchbar, FAB } from "react-native-paper";
import { Link, Stack } from "expo-router";

import MedicationList from "@/components/Medications/MedicationList";
import { useMedications } from "@/hooks/useMedications";

import styles from "./styles";

export default function Index() {
  const [searchValue, setSearchValue] = useState<string>("");
  const { medications, listMedications } = useMedications();

  useEffect(() => {
    listMedications();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Lista de medicamentos" }} />
      <View style={styles.content}>
        <Searchbar
          placeholder="Nome, composto ou função"
          value={searchValue}
          onChangeText={setSearchValue}
        />
        <MedicationList
          medicationList={medications}
          onRefreshList={listMedications}
        />
      </View>
      <Link href="/(medication)/register" style={styles.addNewButton}>
        <FAB icon="plus" size="large" />
      </Link>
    </View>
  );
}
