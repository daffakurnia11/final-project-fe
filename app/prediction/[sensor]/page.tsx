"use client";

import { Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { usePredictionSensor } from "@/services/swr/use-prediction";
import { Prediction } from "@/types/prediction.type";

export default function PredictionList() {
  const { sensor } = useParams();

  const { data, isLoading } = usePredictionSensor(sensor as string);

  const sensorName = useMemo(() => {
    switch (sensor) {
      case "1":
        return "Sensor AC";
      case "2":
        return "Sensor Fan";
      case "3":
        return "Sensor Charger & Monitor";
      default:
        return "";
    }
  }, [sensor]);

  return (
    <>
      <div className="container">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl mb-4">
          {sensorName} Prediction
        </h1>
        <Separator className="my-4" />

        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Energy Prediction</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="h-10 w-[100px] animate-pulse rounded-md bg-muted p-0" />
                    <TableCell className="h-10 animate-pulse rounded-md bg-muted p-0" />
                    <TableCell className="h-10 animate-pulse rounded-md bg-muted p-0" />
                    <TableCell className="h-10 animate-pulse rounded-md bg-muted p-0" />
                  </TableRow>
                ))
              : data?.data.map((item: Prediction, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      {new Date(item.prediction_date).toLocaleDateString(
                        "en-CA"
                      )}
                    </TableCell>
                    <TableCell>
                      {item.prediction_power.toFixed(2)} kWh
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`${sensor}/${item.id}`}
                        className="flex items-center gap-1.5"
                      >
                        <span className="underline">Detail</span>
                        <Eye size={20} />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
