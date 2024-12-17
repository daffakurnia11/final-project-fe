import useSWR from "swr";
import { predictionApi } from "../api/prediction-api";

export const usePredictionSensor = (sensor: string) => {
  const response = useSWR(`/api/v1/predictions?sensor=Sensor ${sensor}`, () =>
    predictionApi.getPredictionBySensor(sensor)
  );

  return response;
};

export const usePredictionDetail = (id: string) => {
  const response = useSWR(`/api/v1/predictions/${id}`, () =>
    predictionApi.getPredictionById(id)
  );

  return response;
};

export const usePredictionStatus = () => {
  const response = useSWR("/api/v1/predictions/status", () =>
    predictionApi.checkPredictionStatus()
  );

  return response;
};
