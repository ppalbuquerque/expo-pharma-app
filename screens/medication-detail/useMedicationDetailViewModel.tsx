import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

import { useMedicationModel } from "@/medicines/medication.model";

export function useMedicationDetailViewModel() {
  const { useGetMedicationById, deleteMedication } = useMedicationModel();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: medication, isLoading: getMedicationLoading } =
    useGetMedicationById(id);

  const handleDeleteMedicationToggle = () => {
    setIsDeleteDialogOpen((actualState) => !actualState);
  };

  const handleDeleteMedication = async () => {
    deleteMedication.mutate(id);
  };

  useEffect(() => {
    if (deleteMedication.isSuccess) {
      router.back();
    }
  }, [deleteMedication.isSuccess]);

  return {
    isDeleteDialogOpen,
    medication,
    getMedicationLoading,
    deleteMedicationLoading: deleteMedication.isPending,
    handleDeleteMedicationToggle,
    handleDeleteMedication,
  };
}
