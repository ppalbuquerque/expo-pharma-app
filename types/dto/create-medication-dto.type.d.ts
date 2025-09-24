export type CreateMedicationDTO = {
  name: string;
  chemicalComposition: string;
  dosageInstructions: string;
  shelfLocation: string;
  boxPrice?: number;
  unitPrice: number;
  usefulness: string;
  stockAvailability: number;
  samplePhotoUrl: string;
};
