export type Medication = {
  name: string;
  chemicalComposition: string;
  id: number;
  boxPrice: number;
  dosageInstructions: string;
  samplePhotoUrl: string;
  shelfLocation: string;
  stockAvailability: number;
  unitPrice: number;
  usefulness: string;
}

export type ListMedicationAtom = {
  id: number;
  name: string;
  chemicalComposition: string;
  samplePhotoUrl: string;
  samplePhotoUrl: string;
}