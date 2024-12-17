export type Prediction = {
  id: string;
  name: string;
  prediction_date: Date;
  prediction_power: number;
};

export type PredictPayload = {
  predicted_date: string;
  sensor: string;
}