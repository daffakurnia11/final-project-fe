import React from "react";
import RealTimeCard from "./real-time-card";

type Props = {
  sensor: string;
  value: number;
  recordedAt: string;
};

export default function VoltageCard(props: Props) {
  return <RealTimeCard type="Voltage" unit="V" {...props} />;
}
