import { useState } from "react";

import useDebounce from "@/shared/hooks/common/useDebounce";
import { useMedicationModel } from "../state/medication.model";

export function useHomeViewModel() {
  const [searchValue, setSearchValue] = useState<string>("");
  const { useGetMedications, useSearchMedications } = useMedicationModel();

  const {
    data: listMedications,
    refetch: refetchMedications,
    isLoading: isLoadingListMedications,
  } = useGetMedications();

  const debouncedSearchTerm = useDebounce(searchValue);

  const { data: searchResult, isFetching: isSearchFetching } =
    useSearchMedications(debouncedSearchTerm);

  const handleOnSearchInputChange = (term: string) => {
    setSearchValue(term);
  };

  const medicationList =
    debouncedSearchTerm.length > 0
      ? searchResult
      : listMedications?.medications;

  const isLoadingMedications = isLoadingListMedications || isSearchFetching;

  const isMedicationListEmpty =
    !isLoadingMedications &&
    medicationList !== undefined &&
    medicationList.length <= 0;

  return {
    searchValue,
    medicationList,
    isLoadingMedications,
    isMedicationListEmpty,
    setSearchValue,
    handleOnSearchInputChange,
    refetchMedications,
  };
}
