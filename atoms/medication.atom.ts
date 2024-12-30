import { atom } from 'jotai'
import { Medication } from '@types'

export const medicationsAtom = atom<Medication[]>([])
export const selectedMedicationAtom = atom<Medication>()
