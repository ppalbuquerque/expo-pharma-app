import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { MedicationService } from "@/services/medication.service";
import { type CreateMedicationForm } from "@/features/medicines/schemas/medication/create-medication-form.schema";

import { MEDICATION_QUERY_KEYS } from "./medication.queries.key";

const GET_MEDICATIONS_LIMIT = 5;

export function useMedicationModel() {
  const queryClient = useQueryClient();

  const useGetMedications = () =>
    useInfiniteQuery({
      queryKey: [MEDICATION_QUERY_KEYS.LIST_MEDICATIONS],
      initialPageParam: 0,
      queryFn: ({ pageParam = 0 }) =>
        MedicationService.getAllMedications(GET_MEDICATIONS_LIMIT, pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
    });

  const useGetMedicationById = (medicationId: string) =>
    useQuery({
      queryKey: [MEDICATION_QUERY_KEYS.MEDICATION_DETAIL, medicationId],
      queryFn: () => MedicationService.getMedicationDetail(medicationId),
    });

  const useSearchMedications = (query: string) =>
    useQuery({
      queryKey: [MEDICATION_QUERY_KEYS.MEDICATION_SEARCH, query],
      queryFn: () => MedicationService.search(query),
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

  const updateMedication = useMutation({
    mutationFn: (data: CreateMedicationForm) => {
      return MedicationService.updateMedication({
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate(query) {
          return [
            MEDICATION_QUERY_KEYS.LIST_MEDICATIONS,
            MEDICATION_QUERY_KEYS.MEDICATION_DETAIL,
          ].includes(query.queryKey[0] as string);
        },
      });
    },
  });

  const deleteMedication = useMutation({
    mutationFn: (medicationId: string) =>
      MedicationService.deleteMedication(medicationId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [MEDICATION_QUERY_KEYS.LIST_MEDICATIONS],
      }),
  });

  return {
    useGetMedications,
    useGetMedicationById,
    useSearchMedications,
    createMedication,
    deleteMedication,
    updateMedication,
  };
}
