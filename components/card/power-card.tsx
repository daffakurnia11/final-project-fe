import React from "react";
import RealTimeCard from "./real-time-card";

type Props = {
  sensor: string;
  value: number;
  recordedAt: string;
  isLoading?: boolean;
};

export default function PowerCard({ value, ...props }: Props) {
  return (
    <RealTimeCard
      type="Power"
      unit="W"
      value={Number(value.toFixed(1))}
      {...props}
    />
  );
}
