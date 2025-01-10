import { useState } from 'react'

import { useAtom } from 'jotai'

import { MedicationService } from "@/services/medication.service";
import { medicationsAtom, selectedMedicationAtom } from '@atoms/medication.atom'
import {
  type CreateMedicationForm,
} from "@schemas/medication/create-medication-form.schema";

interface LoadingState  {
  listMedicationsLoading: boolean;
  deleteMedicationLoading: boolean;
  getMedicationLoading: boolean;
  createMedicationLoading: boolean;
  searchMedicationsLoading: boolean;
}

export function useMedications() {
  const [isLoading, setIsLoading] = useState<LoadingState>({
    createMedicationLoading: false,
    deleteMedicationLoading: false,
    getMedicationLoading: false,
    listMedicationsLoading: false,
    searchMedicationsLoading: false,
  })

  const [medications, setMedications] = useAtom(medicationsAtom)
  const [selectedMedication, setSelectedMedication] = useAtom(selectedMedicationAtom)

  const listMedications = async () => {
    try {
      const medications = await MedicationService.getAllMedications()
      setMedications(medications)
    } catch(error) {
      console.log('Error::error', error)
    }
  }

  const createMedication = async (data: CreateMedicationForm) => {
    try {
      /** TODO: Remover o parâmetro samplePhotoUrl hardcoded */
      await MedicationService.createMedication({ ...data, samplePhotoUrl: 'https://picsum.photos/200/300' });
    } catch (error) {
      console.log('createMedicationError::error', error)
    }
  }

  const getMedication = async (medicationId: string) => {
    try {
      setIsLoading((state) => ({
        ...state,
        getMedicationLoading: true,
      }))
      const medicationResponse = await MedicationService.getMedicationDetail(medicationId)
      /** TODO: Melhorar a forma como o parse das responses é feito para o objeto que a aplicação usa */
      setSelectedMedication({
        ...medicationResponse,
        boxPrice: parseFloat(medicationResponse.boxPrice),
        unitPrice: parseFloat(medicationResponse.unitPrice)
      })
      setIsLoading((state) => ({
        ...state,
        getMedicationLoading: false,
      }))
    } catch(error) {
      console.log('getMedicationError::error', error)
    }
  }

  const deleteMedication = async (medicationId: string) => {
    try {
      setIsLoading((state) => ({
        ...state,
        deleteMedicationLoading: true,
      }))
      await MedicationService.deleteMedication(medicationId)
      setIsLoading((state) => ({
        ...state,
        deleteMedicationLoading: false,
      }))
    } catch(error) {
      console.log('deleteMedicationError:error', error)
    }
  }

  const searchMedications = async (query: string) => {
    try {
      setIsLoading((state) => ({
        ...state,
        searchMedicationsLoading: true,
      }))
      const medications = await MedicationService.search(query)
      setMedications(medications);
      setIsLoading((state) => ({
        ...state,
        searchMedicationsLoading: false,
      }))
    } catch(error) {
      console.log('searchMedications::error', error)
    }
  }
  
  return {
    medications,
    selectedMedication,
    listMedications,
    createMedication,
    getMedication,
    deleteMedication,
    searchMedications,
    isLoading,
  }
}