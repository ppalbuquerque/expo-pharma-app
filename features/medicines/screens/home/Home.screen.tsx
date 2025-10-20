import React from "react";
import { View, Text } from "react-native";
import { FAB } from "react-native-paper";
import { Link, Stack } from "expo-router";

import MedicationList from "@/features/medicines/components/MedicationList";
import HomeHeader from "../../components/HomeHeader";
import { useHomeViewModel } from "@/features/medicines/effects/useHomeViewModel";

import styles from "./styles";
import SearchBar from "@/shared/components/common/Searchbar";

export default function HomeScreen() {
  const {
    searchValue,
    handleOnSearchInputChange,
    medicationList,
    isLoadingMedications,
    isMedicationListEmpty,
    refetchMedications,
    fetchMoreMedications,
    isFetchingNextPage,
  } = useHomeViewModel();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ headerTitle: (props) => <HomeHeader {...props} /> }}
      />
      <View style={styles.content}>
        <View style={styles.searchBarContainer}>
          <SearchBar
            placeholder="Nome, composto ou função"
            value={searchValue}
            onChangeText={handleOnSearchInputChange}
          />
        </View>
        {isMedicationListEmpty && (
          <View style={styles.emptyMessageContainer}>
            <Text style={styles.emptyMessageText}>
              Não encontramos nenhum remédio
            </Text>
          </View>
        )}
        <MedicationList
          medicationList={medicationList}
          onRefreshList={refetchMedications}
          isLoading={isLoadingMedications}
          fetchMoreMedications={fetchMoreMedications}
          isFetchingMore={isFetchingNextPage}
        />
      </View>
      <Link href="/(medication)/register" style={styles.addNewButton}>
        <FAB icon="plus" size="medium" style={styles.fabButton} />
      </Link>
    </View>
  );
}
