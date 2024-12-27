import * as yup from 'yup'

export const createMedicationFormSchema = yup.object({
  name: yup.string().required(),
  chemicalComposition: yup.string().required(),
  dosageInstructions: yup.string().required(),
  shelfLocation: yup.string().required(),
  boxPrice: yup.number(),
  unitPrice: yup.number().required(),
  usefulness: yup.string().required(),
  stockAvailability: yup.number().required()
})

export interface CreateMedicationForm extends yup.InferType<typeof createMedicationFormSchema>{}