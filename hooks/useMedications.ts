import { useAtom } from 'jotai'
import { MedicationService } from "@/services/medication.service";
import { medicationsAtom } from '@atoms/medication.atom'

export function useMedications() {
  const [medications, setMedications] = useAtom(medicationsAtom)

  const getMedications = async () => {
    const medications = await MedicationService.getAllMedications()
    setMedications(medications)
  }
  
  return {
    medications,
    getMedications
  }
}