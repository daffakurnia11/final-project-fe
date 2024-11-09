export type Sensor = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  name: string;
  voltage: number;
  current: number;
  power: number;
  power_factor: number;
  frequency: number;
  energy: number;
  apparent_power: number;
  reactive_power: number;
};
