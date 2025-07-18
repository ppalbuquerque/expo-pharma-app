import { useState } from "react";
import { useLocalSearchParams } from "expo-router";

import { useMedicationModel } from "@/medicines/medication.model";

export function useMedicationDetailViewModel() {
  const { useGetMedicationById } = useMedicationModel();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: medication, isLoading: getMedicationLoading } =
    useGetMedicationById(id);

  const handleDeleteMedicationToggle = () => {
    setIsDeleteDialogOpen((actualState) => !actualState);
  };

  return {
    isDeleteDialogOpen,
    handleDeleteMedicationToggle,
    medication,
    getMedicationLoading,
  };
}
