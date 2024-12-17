import { PredictPayload } from "@/types/prediction.type";
import axios from "axios";

class PredictionApi {
  private baseUrl = `${process.env.NEXT_PUBLIC_BASEURL_API}/api/v1`;

  async getPredictionBySensor(sensor: string) {
    return axios
      .get(`${this.baseUrl}/predictions`, {
        params: { sensor: `Sensor ${sensor}` },
      })
      .then((res) => res.data);
  }

  async getPredictionById(id: string) {
    return axios
      .get(`${this.baseUrl}/predictions/${id}`)
      .then((res) => res.data);
  }

  async predictByDate(data: PredictPayload) {
    return axios
      .post(`${this.baseUrl}/predictions`, data)
      .then((res) => res.data);
  }

  async checkPredictionStatus() {
    return axios
      .get(`${this.baseUrl}/predictions/status`)
      .then((res) => res.data);
  }
}

export const predictionApi = new PredictionApi();
