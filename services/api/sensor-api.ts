import axios from "axios";

class SensorApi {
  private baseUrl = `${process.env.NEXT_PUBLIC_BASEURL_API}/api/v1`;

  async getSensorDataLatest() {
    return axios.get(`${this.baseUrl}/sensors`).then((res) => res.data);
  }

  async getSensorDataByHour(filter: string[]) {
    return axios
      .get(`${this.baseUrl}/sensors`, {
        params: { value: Number(filter[0]), filter: filter[1] },
      })
      .then((res) => res.data);
  }
}

export const sensorApi = new SensorApi();
