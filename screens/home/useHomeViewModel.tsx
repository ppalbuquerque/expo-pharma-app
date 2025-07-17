import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "expo-router";

import useDebounce from "@/hooks/common/useDebounce";
import { useMedicationModel } from "@/medicines/medication.model";

export function useHomeViewModel() {
  const [searchValue, setSearchValue] = useState<string>("");
  const { medications, listMedications, searchMedications, isLoading } =
    useMedicationModel();

  const debouncedSearchTerm = useDebounce(searchValue);

  useEffect(() => {
    if (debouncedSearchTerm.length !== 0) {
      searchMedications(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, searchMedications]);

  useFocusEffect(
    useCallback(() => {
      listMedications();
    }, [listMedications])
  );

  const handleOnSearchInputChange = (term: string) => {
    if (term.length === 0) {
      listMedications();
    }
    setSearchValue(term);
  };

  const handleListMedications = () => {
    listMedications();
  };

  return {
    searchValue,
    medications,
    isLoading,
    setSearchValue,
    handleOnSearchInputChange,
    handleListMedications,
  };
}
