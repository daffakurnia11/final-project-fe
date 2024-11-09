import React from "react";
import RealTimeCard from "./real-time-card";

type Props = {
  sensor: string;
  value: number;
  recordedAt: string;
};

export default function PowerCard(props: Props) {
  return <RealTimeCard type="Power" unit="W" {...props} />;
}
