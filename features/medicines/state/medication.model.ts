import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MedicationService } from "@/services/medication.service";
import { type CreateMedicationForm } from "@/features/medicines/schemas/medication/create-medication-form.schema";

import { MEDICATION_QUERY_KEYS } from "./medication.queries.key";

export function useMedicationModel() {
  const queryClient = useQueryClient();

  const useGetMedications = () =>
    useQuery({
      queryKey: [MEDICATION_QUERY_KEYS.LIST_MEDICATIONS],
      queryFn: () => MedicationService.getAllMedications(),
    });

  const useGetMedicationById = (medicationId: string) =>
    useQuery({
      queryKey: ["medication-detail", medicationId],
      queryFn: () => MedicationService.getMedicationDetail(medicationId),
    });

  const createMedication = useMutation({
    mutationFn: (data: CreateMedicationForm) => {
      return MedicationService.createMedication({
        ...data,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [MEDICATION_QUERY_KEYS.LIST_MEDICATIONS],
      }),
  });

  const deleteMedication = useMutation({
    mutationFn: (medicationId: string) =>
      MedicationService.deleteMedication(medicationId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [MEDICATION_QUERY_KEYS.LIST_MEDICATIONS],
      }),
  });

  const useSearchMedications = (query: string) =>
    useQuery({
      queryKey: ["medication-search", query],
      queryFn: () => MedicationService.search(query),
    });

  return {
    useGetMedications,
    useGetMedicationById,
    createMedication,
    deleteMedication,
    useSearchMedications,
  };
}
