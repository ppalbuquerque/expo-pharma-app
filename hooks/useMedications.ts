import { useAtom } from 'jotai'

import { MedicationService } from "@/services/medication.service";
import { medicationsAtom } from '@atoms/medication.atom'
import {
  type CreateMedicationForm,
} from "@schemas/medication/create-medication-form.schema";

export function useMedications() {
  const [medications, setMedications] = useAtom(medicationsAtom)

  const getMedications = async () => {
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
  
  return {
    medications,
    getMedications,
    createMedication,
  }
}