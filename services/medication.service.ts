import axios from "axios"

const BASE_URL = 'https://nestjs-pharmacy-api.onrender.com'

export class MedicationService {
  static async getAllMedications() {
    const response = await axios.get(`${BASE_URL}/medication`)
    //** TODO: Transformar esses dados de acordo com algum model local */
    return response.data
  }
}