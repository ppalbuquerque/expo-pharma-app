import { useState } from "react";

interface IUseMedicationList {
  isRefreshing: boolean;
  onRefresh: () => void;
  onEndReached:
    | ((info: { distanceFromEnd: number }) => void)
    | null
    | undefined;
}

export function useMedicationList(
  onRefreshList: () => void,
  fetchMoreMedications: () => void
): IUseMedicationList {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await onRefreshList();
    setIsRefreshing(false);
  };

  const onEndReached = (
    info: { distanceFromEnd: number } | null | undefined
  ) => {
    fetchMoreMedications();
  };

  return {
    isRefreshing,
    onRefresh,
    onEndReached,
  };
}
