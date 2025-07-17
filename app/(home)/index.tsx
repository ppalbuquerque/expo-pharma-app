import React from "react";
import { View } from "react-native";
import { Searchbar, FAB } from "react-native-paper";
import { Link, Stack } from "expo-router";

import MedicationList from "@/components/Medications/MedicationList";

import styles from "../../screens/home/styles";
import { useHomeViewModel } from "@/screens/home/useHomeViewModel";

export default function Index() {
  const {
    searchValue,
    handleOnSearchInputChange,
    medications,
    isLoading,
    handleListMedications,
  } = useHomeViewModel();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Lista de medicamentos" }} />
      <View style={styles.content}>
        <Searchbar
          placeholder="Nome, composto ou função"
          value={searchValue}
          onChangeText={handleOnSearchInputChange}
          // onEndEditing={() => searchMedications(searchValue)}
        />
        <MedicationList
          medicationList={medications}
          onRefreshList={handleListMedications}
          isLoading={
            isLoading.listMedicationsLoading ||
            isLoading.searchMedicationsLoading
          }
        />
      </View>
      <Link href="/(medication)/register" style={styles.addNewButton}>
        <FAB icon="plus" size="large" />
      </Link>
    </View>
  );
}
