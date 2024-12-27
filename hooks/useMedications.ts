import { useAtom } from 'jotai'

import { MedicationService } from "@/services/medication.service";
import { medicationsAtom } from '@atoms/medication.atom'
import type { MedicationRegisterForm } from '@types'

export function useMedications() {
  const [medications, setMedications] = useAtom(medicationsAtom)

  const getMedications = async () => {
    const medications = await MedicationService.getAllMedications()
    setMedications(medications)
  }

  const createMedication = async (data: MedicationRegisterForm) => {
    console.log(data)
    const response = await MedicationService.createMedication(data);
  }
  
  return {
    medications,
    getMedications,
    createMedication,
  }
}