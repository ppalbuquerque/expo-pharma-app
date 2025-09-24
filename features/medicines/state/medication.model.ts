import { useQuery, useMutation } from "@tanstack/react-query";
import { MedicationService } from "@/services/medication.service";
import { type CreateMedicationForm } from "@/features/medicines/schemas/medication/create-medication-form.schema";

export function useMedicationModel() {
  const useGetMedications = () =>
    useQuery({
      queryKey: ["list-medications"],
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
  });

  const deleteMedication = useMutation({
    mutationFn: (medicationId: string) =>
      MedicationService.deleteMedication(medicationId),
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
