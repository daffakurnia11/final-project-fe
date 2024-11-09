import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type Props = {
  type: "Voltage" | "Current" | "Power";
  sensor: string;
  value: number;
  unit: "V" | "A" | "W";
  recordedAt: string;
  isLoading?: boolean;
};

export default function RealTimeCard({
  type,
  sensor,
  value,
  unit,
  recordedAt,
  isLoading,
}: Props) {
  const sensorName = useMemo(() => {
    switch (sensor) {
      case "Sensor 1":
        return "Sensor AC";
      case "Sensor 2":
        return "Sensor Fan";
      case "Sensor 3":
        return "Sensor Charger & Monitor";
    }
  }, [sensor]);

  return (
    <Card className="!w-full">
      <CardHeader>
        <CardTitle>
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {type}
          </h2>
        </CardTitle>
        <CardDescription>
          {!isLoading ? sensorName : <Skeleton className="h-5 w-full" />}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-full border-b pb-2 tracking-tight" />
        ) : (
          <p className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            {value} {unit}
          </p>
        )}
      </CardContent>
      <CardFooter>
        {isLoading ? (
          <Skeleton className="h-5 w-full" />
        ) : (
          <p className="text-sm text-muted-foreground">
            Recorded at : {recordedAt}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
