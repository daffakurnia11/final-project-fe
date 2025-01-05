import useSWR from "swr";
import { energyApi } from "../api/energy-api";

export const useEnergy = (sensor: string) => {
  const response = useSWR(`${energyApi.prefix}?sensor=Sensor ${sensor}`, () =>
    energyApi.get(sensor)
  );

  return response;
};

export const useEnergyDetail = (id: string) => {
  const response = useSWR(`${energyApi.prefix}/${id}`, () =>
    energyApi.detail(id)
  );

  return response;
}
