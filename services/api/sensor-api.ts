import axios from "axios";

class SensorApi {
  private baseUrl = `${process.env.NEXT_PUBLIC_BASEURL_API}/api/v1`;

  async getSensorDataLatest() {
    return axios.get(`${this.baseUrl}/sensors`).then((res) => res.data);
  }

  async getSensorDataByHour(minute: number) {
    return axios
      .get(`${this.baseUrl}/sensors`, { params: { minutes: minute } })
      .then((res) => res.data);
  }
}

export const sensorApi = new SensorApi();
