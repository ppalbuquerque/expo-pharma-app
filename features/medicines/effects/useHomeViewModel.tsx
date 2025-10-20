import { useState } from "react";

import useDebounce from "@/shared/hooks/common/useDebounce";
import { useMedicationModel } from "../state/medication.model";

export function useHomeViewModel() {
  const [searchValue, setSearchValue] = useState<string>("");
  const { useGetMedications, useSearchMedications } = useMedicationModel();

  const {
    data: medicationsPages,
    refetch: refetchMedications,
    isLoading: isLoadingListMedications,
    fetchNextPage: fetchMoreMedications,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMedications();

  const debouncedSearchTerm = useDebounce(searchValue);

  const { data: searchResult, isFetching: isSearchFetching } =
    useSearchMedications(debouncedSearchTerm);

  const medicationPageFlattened =
    medicationsPages?.pages.flatMap((page) => page.medications) ?? [];

  const medicationList =
    debouncedSearchTerm.length > 0 ? searchResult : medicationPageFlattened;

  const isLoadingMedications = isLoadingListMedications || isSearchFetching;

  const isMedicationListEmpty =
    !isLoadingMedications &&
    medicationList !== undefined &&
    medicationList.length <= 0;

  const handleOnSearchInputChange = (term: string) => {
    setSearchValue(term);
  };

  const handleFetchMoreMedications = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchMoreMedications();
    }
  };

  return {
    searchValue,
    medicationList,
    isLoadingMedications,
    isMedicationListEmpty,
    setSearchValue,
    handleOnSearchInputChange,
    refetchMedications,
    fetchMoreMedications: handleFetchMoreMedications,
    isFetchingNextPage,
  };
}
