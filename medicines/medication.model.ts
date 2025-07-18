// Model é responsável pelas regras de negócio, pela requests e pelas mudanças
// de estado

import { useState } from "react";

import { useAtom } from "jotai";

import { MedicationService } from "@/services/medication.service";
import {
  medicationsAtom,
  selectedMedicationAtom,
} from "@atoms/medication.atom";
import { type CreateMedicationForm } from "@schemas/medication/create-medication-form.schema";
import { useQuery } from "@tanstack/react-query";

interface LoadingState {
  listMedicationsLoading: boolean;
  deleteMedicationLoading: boolean;
  getMedicationLoading: boolean;
  createMedicationLoading: boolean;
  searchMedicationsLoading: boolean;
}

export function useMedicationModel() {
  const [isLoading, setIsLoading] = useState<LoadingState>({
    createMedicationLoading: false,
    deleteMedicationLoading: false,
    getMedicationLoading: false,
    listMedicationsLoading: false,
    searchMedicationsLoading: false,
  });

  const [medications, setMedications] = useAtom(medicationsAtom);
  const [selectedMedication, setSelectedMedication] = useAtom(
    selectedMedicationAtom
  );

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

  const createMedication = async (data: CreateMedicationForm) => {
    try {
      /** TODO: Remover o parâmetro samplePhotoUrl hardcoded */
      await MedicationService.createMedication({
        ...data,
        samplePhotoUrl: "https://picsum.photos/200/300",
      });
    } catch (error) {
      console.log("createMedicationError::error", error);
    }
  };

  const deleteMedication = async (medicationId: string) => {
    try {
      setIsLoading((state) => ({
        ...state,
        deleteMedicationLoading: true,
      }));
      await MedicationService.deleteMedication(medicationId);
      setIsLoading((state) => ({
        ...state,
        deleteMedicationLoading: false,
      }));
    } catch (error) {
      console.log("deleteMedicationError:error", error);
    }
  };

  const searchMedications = async (query: string) => {
    try {
      setIsLoading((state) => ({
        ...state,
        searchMedicationsLoading: true,
      }));
      const medications = await MedicationService.search(query);
      setMedications(medications);
      setIsLoading((state) => ({
        ...state,
        searchMedicationsLoading: false,
      }));
    } catch (error) {
      console.log("searchMedications::error", error);
    }
  };

  return {
    medications,
    selectedMedication,
    useGetMedications,
    useGetMedicationById,
    createMedication,
    deleteMedication,
    searchMedications,
    isLoading,
  };
}
