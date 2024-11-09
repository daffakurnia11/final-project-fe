import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  type: "Voltage" | "Current" | "Power";
  sensor: string;
  value: number;
  unit: "V" | "A" | "W";
  recordedAt: string;
};

export default function RealTimeCard({
  type,
  sensor,
  value,
  unit,
  recordedAt,
}: Props) {
  return (
    <Card className="!w-full">
      <CardHeader>
        <CardTitle>
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {type}
          </h2>
        </CardTitle>
        <CardDescription>{sensor}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
          {value} {unit}
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Recorded at : {recordedAt}
        </p>
      </CardFooter>
    </Card>
  );
}
