import { atom } from 'jotai'
import { Medication, ListMedicationAtom } from '@types'

export const medicationsAtom = atom<ListMedicationAtom[]>([])
export const selectedMedicationAtom = atom<Medication>()
