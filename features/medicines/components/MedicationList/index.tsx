import React from "react";
import { FlatList, RefreshControl } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Link } from "expo-router";

import { Medication } from "@types";

import { useMedicationList } from "./useMedicationList";
import MedicationCard from "../MedicationCard";
import styles from "./styles";

type Props = {
  medicationList: Medication[] | undefined;
  onRefreshList: () => void;
  fetchMoreMedications: () => void;
  isLoading: boolean;
  isFetchingMore: boolean;
};

export default function MedicationList({
  medicationList,
  onRefreshList,
  isLoading,
  fetchMoreMedications,
  isFetchingMore,
}: Props) {
  const { isRefreshing, onRefresh, onEndReached } = useMedicationList(
    onRefreshList,
    fetchMoreMedications
  );

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ marginTop: 32 }} />;
  }

  return (
    <FlatList
      data={medicationList}
      contentContainerStyle={styles.listContentContainer}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      onEndReached={onEndReached}
      ListFooterComponent={() => {
        if (isFetchingMore) {
          return (
            <ActivityIndicator size="large" style={{ marginVertical: 32 }} />
          );
        }
      }}
      renderItem={({ item }) => (
        <Link
          style={styles.cardContainer}
          href={{
            pathname: "/(medication)/[id]",
            params: { id: item.id },
          }}
        >
          <MedicationCard
            medicationTitle={item.name}
            chemicalComposition={item.chemicalComposition}
            coverPhoto={item.samplePhotoUrl}
          />
        </Link>
      )}
    />
  );
}
