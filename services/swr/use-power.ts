import useSWR from "swr";
import { energyApi } from "../api/energy-api";
import { EnergyPayload } from "@/types/prediction.type";
import { powerApi } from "../api/power-api";

export const usePredicted = (filter: EnergyPayload) => {
  const response = useSWR(
    `${energyApi.prefix}/predicted?sensor=${filter.sensor}&date=${filter.date}`,
    () => powerApi.getPredicted(filter)
  );

  return response;
};

export const useMeasured = (filter: EnergyPayload) => {
  const response = useSWR(
    `${energyApi.prefix}/measured?sensor=${filter.sensor}&date=${filter.date}`,
    () => powerApi.getMeasured(filter)
  );

  return response;
};
