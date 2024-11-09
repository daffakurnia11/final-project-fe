import useSWR from "swr";
import { sensorApi } from "../api/sensor-api";

export const useSensorLatest = () => {
  const response = useSWR("/api/v1/sensors", () => sensorApi.getSensorDataLatest());

  return response;
};

export const useSensorByHour = (minute: number) => {
  const response = useSWR([`/api/v1/sensors`, { minutes: minute }], () =>
    sensorApi.getSensorDataByHour(minute)
  );

  return response;
};
