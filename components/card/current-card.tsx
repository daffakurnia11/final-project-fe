import React from "react";
import RealTimeCard from "./real-time-card";

type Props = {
  sensor: string;
  value: number;
  recordedAt: string;
  isLoading?: boolean;
};

export default function CurrentCard({ value, ...props }: Props) {
  return (
    <RealTimeCard
      type="Current"
      unit="A"
      value={Number(value.toFixed(3))}
      {...props}
    />
  );
}
