import { MedicationService } from "@/services/medication.service";
import { type CreateMedicationForm } from "@/features/medicines/schemas/medication/create-medication-form.schema";
import { useQuery, useMutation } from "@tanstack/react-query";

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
        samplePhotoUrl: "https://picsum.photos/200/300",
      });
    },
  });

  const deleteMedication = useMutation({
    mutationFn: (medicationId: string) =>
      MedicationService.deleteMedication(medicationId),
  });

  const searchMedications = async (query: string) => {
    try {
      // setIsLoading((state) => ({
      //   ...state,
      //   searchMedicationsLoading: true,
      // }));
      // const medications = await MedicationService.search(query);
      // setMedications(medications);
      // setIsLoading((state) => ({
      //   ...state,
      //   searchMedicationsLoading: false,
      // }));
    } catch (error) {
      console.log("searchMedications::error", error);
    }
  };

  return {
    useGetMedications,
    useGetMedicationById,
    createMedication,
    deleteMedication,
    searchMedications,
  };
}
