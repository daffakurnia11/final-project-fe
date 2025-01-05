import { EnergyPayload } from "@/types/prediction.type";
import axios from "axios";

class EnergyApi {
  private baseUrl = process.env.NEXT_PUBLIC_BASEURL_API;
  public prefix = "/api/v1/energy";

  async get(sensor: string) {
    return axios
      .get(`${this.baseUrl}${this.prefix}`, {
        params: {
          sensor: `Sensor ${sensor}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response);
  }

  async detail(id: string) {
    return axios
      .get(`${this.baseUrl}${this.prefix}/${id}`)
      .then((res) => res.data)
      .catch((err) => err.response);
  }

  async predict(data: EnergyPayload) {
    return axios
      .post(`${this.baseUrl}${this.prefix}/predict`, data)
      .then((res) => res.data)
      .catch((err) => err.response);
  }

  async calculate(data: EnergyPayload) {
    return axios
      .post(`${this.baseUrl}${this.prefix}/calculate`, data)
      .then((res) => res.data)
      .catch((err) => err.response);
  }
}

export const energyApi = new EnergyApi();
