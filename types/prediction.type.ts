export type EnergyType = {
  id: string;
  name: string;
  date: Date;
  predicted_energy?: number | null;
  calculated_energy?: number | null;
};

export type EnergyPayload = {
  date: string;
  sensor: string;
}