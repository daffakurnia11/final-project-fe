import React from "react";
import RealTimeCard from "./real-time-card";

type Props = {
  sensor: string;
  value: number;
  recordedAt: string;
};

export default function CurrentCard(props: Props) {
  return <RealTimeCard type="Current" unit="A" {...props} />;
}
