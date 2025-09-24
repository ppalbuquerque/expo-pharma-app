import axios from "axios";

const BASE_URL = "http://10.0.2.2:3000";

export class FileService {
  static async uploadFile(data: FormData) {
    return axios.post(`${BASE_URL}/files`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
