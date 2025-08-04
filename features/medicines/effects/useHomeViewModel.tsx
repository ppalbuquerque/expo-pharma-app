import { useState, useEffect } from "react";

import useDebounce from "@/shared/hooks/common/useDebounce";
import { useMedicationModel } from "../state/medication.model";

export function useHomeViewModel() {
  const [searchValue, setSearchValue] = useState<string>("");
  const { useGetMedications, searchMedications } = useMedicationModel();

  const {
    data: medications,
    refetch: refetchMedications,
    isLoading: isLoadingListMedications,
  } = useGetMedications();

  const debouncedSearchTerm = useDebounce(searchValue);

  useEffect(() => {
    if (debouncedSearchTerm.length !== 0) {
      searchMedications(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, searchMedications]);

  const handleOnSearchInputChange = (term: string) => {
    if (term.length === 0) {
      refetchMedications();
    }
    setSearchValue(term);
  };

  return {
    searchValue,
    medications,
    isLoadingListMedications,
    setSearchValue,
    handleOnSearchInputChange,
    refetchMedications,
  };
}
