import * as yup from "yup";

export const createMedicationFormSchema = yup.object({
  name: yup.string().required(),
  chemicalComposition: yup.string().required(),
  dosageInstructions: yup.string().required(),
  shelfLocation: yup.string().required(),
  boxPrice: yup.number().required(),
  unitPrice: yup.number().required(),
  usefulness: yup.string().required(),
  stockAvailability: yup.number().required(),
  samplePhotoUrl: yup.string().url(),
});

export interface CreateMedicationForm
  extends yup.InferType<typeof createMedicationFormSchema> {}
