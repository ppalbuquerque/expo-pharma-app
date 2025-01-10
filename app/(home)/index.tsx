import { useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import { Searchbar, FAB } from "react-native-paper";
import { Link, Stack, useFocusEffect } from "expo-router";

import MedicationList from "@/components/Medications/MedicationList";
import { useMedications } from "@/hooks/useMedications";
import useDebounce from "@/hooks/common/useDebounce";

import styles from "./styles";

export default function Index() {
  const [searchValue, setSearchValue] = useState<string>("");
  const { medications, listMedications, isLoading, searchMedications } =
    useMedications();

  const debouncedSearchTerm = useDebounce(searchValue);

  useFocusEffect(
    useCallback(() => {
      listMedications();
    }, [])
  );

  useEffect(() => {
    if (debouncedSearchTerm.length !== 0) {
      searchMedications(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleOnSearchInputChange = (term: string) => {
    if (term.length === 0) {
      listMedications();
    }
    setSearchValue(term);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Lista de medicamentos" }} />
      <View style={styles.content}>
        <Searchbar
          placeholder="Nome, composto ou função"
          value={searchValue}
          onChangeText={handleOnSearchInputChange}
          onEndEditing={() => searchMedications(searchValue)}
        />
        <MedicationList
          medicationList={medications}
          onRefreshList={listMedications}
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
