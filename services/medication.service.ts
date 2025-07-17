import axios from "axios";

import type {
  Medication,
  CreateMedicationDTO,
  GetMedicationResponse,
  SearchMedicationResponse,
} from "@types";

const BASE_URL = "http://localhost:3000";

export class MedicationService {
  static async getAllMedications(): Promise<Medication[]> {
    const response = await axios.get(`${BASE_URL}/medication`);
    //** TODO: Transformar esses dados de acordo com algum model local */
    return response.data;
  }

  static async createMedication(data: CreateMedicationDTO): Promise<void> {
    await axios.post(`${BASE_URL}/medication`, data);
  }

  static async getMedicationDetail(
    medicationId: string
  ): Promise<GetMedicationResponse> {
    const response = await axios.get(`${BASE_URL}/medication/${medicationId}`);
    return response.data;
  }

  static async deleteMedication(medicationId: string): Promise<void> {
    await axios.delete(`${BASE_URL}/medication/${medicationId}`);
  }

  static async search(query: string): Promise<SearchMedicationResponse[]> {
    const response = await axios.get(
      `${BASE_URL}/medication/search?q=${query}`
    );
    return response.data;
  }
}
