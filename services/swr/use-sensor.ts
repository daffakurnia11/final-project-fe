import useSWR from "swr";
import { sensorApi } from "../api/sensor-api";

export const useSensorLatest = () => {
  const response = useSWR("/api/v1/sensors", () => sensorApi.getSensorDataLatest());

  return response;
};

export const useSensorByHour = (filter: string) => {
  const splittedFilter = filter.split(" ");
  const response = useSWR([`/api/v1/sensors`, { value: splittedFilter[0], filter: splittedFilter[1] }], () =>
    sensorApi.getSensorDataByHour(splittedFilter)
  );

  return response;
};
