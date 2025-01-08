import { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import MedicationCard from "../MedicationCard";
import styles from "./styles";
import { Medication } from "@types";

type Props = {
  medicationList: Medication[];
  onRefreshList: () => void;
};

export default function MedicationList({
  medicationList,
  onRefreshList,
}: Props) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await onRefreshList();
    setIsRefreshing(false);
  };

  return (
    <FlatList
      data={medicationList}
      style={styles.listcontainer}
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
          />
        </Link>
      )}
    />
  );
}
