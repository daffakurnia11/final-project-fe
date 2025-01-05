import { EnergyPayload } from "@/types/prediction.type";
import axios from "axios";

class PowerApi {
  private baseUrl = process.env.NEXT_PUBLIC_BASEURL_API;
  public prefix = "/api/v1/power";

  async getPredicted(filter: EnergyPayload) {
    return axios
      .get(`${this.baseUrl}${this.prefix}/predicted`, {
        params: filter,
      })
      .then((res) => res.data)
      .catch((err) => err.response);
  }

  async getMeasured(filter: EnergyPayload) {
    return axios
      .get(`${this.baseUrl}${this.prefix}/measured`, {
        params: filter,
      })
      .then((res) => res.data)
      .catch((err) => err.response);
  }
}

export const powerApi = new PowerApi();
