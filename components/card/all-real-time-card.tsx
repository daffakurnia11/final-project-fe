import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type Props = {
  sensor: string;
  voltageValue: number;
  ampereValue: number;
  wattValue: number;
  recordedAt: string;
  isLoading?: boolean;
};

export default function AllRealTimeCard({
  sensor,
  voltageValue,
  ampereValue,
  wattValue,
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
            {sensorName}
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-8 mb-2 w-full border-b pb-2 tracking-tight" />
            <Skeleton className="h-8 mb-2 w-full border-b pb-2 tracking-tight" />
            <Skeleton className="h-8 mb-2 w-full border-b pb-2 tracking-tight" />
          </>
        ) : (
          <>
            <p className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
              {voltageValue.toFixed(1)} V
            </p>
            <p className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
              {ampereValue.toFixed(3)} A
            </p>
            <p className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
              {wattValue.toFixed(1)} W
            </p>
          </>
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
