import { atom } from 'jotai'
import { Medication } from '@types'

export const medicationsAtom = atom<Medication[]>([])
