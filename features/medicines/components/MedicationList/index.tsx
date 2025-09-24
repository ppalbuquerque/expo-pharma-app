import React from "react";
import { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Link } from "expo-router";

import { Medication } from "@types";
import MedicationCard from "../MedicationCard";
import styles from "./styles";

type Props = {
  medicationList: Medication[] | undefined;
  onRefreshList: () => void;
  isLoading: boolean;
};

export default function MedicationList({
  medicationList,
  onRefreshList,
  isLoading,
}: Props) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await onRefreshList();
    setIsRefreshing(false);
  };

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
