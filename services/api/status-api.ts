import axios from "axios";

class StatusApi {
  private baseUrl = process.env.NEXT_PUBLIC_BASEURL_API;
  public prefix = "/api/v1/status";

  async checkPredictionStatus() {
    return axios
      .get(`${this.baseUrl}${this.prefix}/prediction`)
      .then((res) => res.data)
      .catch((err) => err.response);
    }
    
    async checkCalculationStatus() {
      return axios
      .get(`${this.baseUrl}${this.prefix}/calculation`)
      .then((res) => res.data)
      .catch((err) => err.response);
  }
}

export const statusApi = new StatusApi();
