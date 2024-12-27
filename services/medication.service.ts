import axios from "axios"

import type { Medication, CreateMedicationDTO } from '@types'

const BASE_URL = 'https://nestjs-pharmacy-api.onrender.com'

export class MedicationService {
  static async getAllMedications(): Promise<Medication[]> {
    const response = await axios.get(`${BASE_URL}/medication`)
    //** TODO: Transformar esses dados de acordo com algum model local */
    return response.data
  }

  static async createMedication(data: CreateMedicationDTO): Promise<void> {
    await axios.post(`${BASE_URL}/medication`, data)
  }
}