"use client";

import AllRealTimeCard from "@/components/card/all-real-time-card";
import { Separator } from "@/components/ui/separator";
import useRealtime from "@/hooks/use-realtime";
import { useEnergyList } from "@/services/swr/use-energy";
import { Sensor } from "@/types/sensor.type";
import { ColumnDef } from "@tanstack/react-table";
import { EnergyType } from "@/types/prediction.type";
import Link from "next/link";
import { Eye } from "lucide-react";
import DataTable, { DataTableLoader } from "@/components/table";

const columns: ColumnDef<EnergyType>[] = [
  {
    accessorKey: "index",
    header: "No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Sensor Name",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "predicted_energy",
    header: "Predicted Energy",
    cell: ({ row }) => {
      const value = row.original.predicted_energy;
      return value != null ? (
        <div>{`${Math.abs(value).toFixed(2)} kWh`}</div>
      ) : (
        <div className="text-gray-400 italic">Not predicted</div>
      );
    },
  },
  {
    accessorKey: "calculated_energy",
    header: "Calculated Energy",
    cell: ({ row }) => {
      const value = row.original.calculated_energy;
      return value != null ? (
        <div>{`${Math.abs(value).toFixed(2)} kWh`}</div>
      ) : (
        <div className="text-gray-400 italic">Not calculated</div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <Link
          href={`/consumption/detail/${row.original.id}?sensor=${
            row.original.name.split(" ")[1]
          }&date=${row.original.date}`}
          className="flex items-center gap-1.5"
        >
          <span className="underline">Detail</span>
          <Eye size={20} />
        </Link>
      );
    },
  },
];

export default function Home() {
  const { data, isLoading, recordTime } = useRealtime();

  const { data: energyData, isLoading: energyLoading } = useEnergyList();

  const filteredData = (name: string) =>
    data.find((item: Sensor) => item.name === name);

  return (
    <>
      <div className="container">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl mb-4">
          Dashboard
        </h1>

        <Separator className="my-4" />
        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl mb-4">
          Real-time Data
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <AllRealTimeCard
            isLoading={isLoading}
            voltageValue={filteredData("Sensor 1")?.voltage || 0}
            ampereValue={filteredData("Sensor 1")?.current || 0}
            wattValue={filteredData("Sensor 1")?.power || 0}
            sensor={filteredData("Sensor 1")?.name || "Sensor 1"}
            recordedAt={recordTime}
          />
          <AllRealTimeCard
            isLoading={isLoading}
            voltageValue={filteredData("Sensor 2")?.voltage || 0}
            ampereValue={filteredData("Sensor 2")?.current || 0}
            wattValue={filteredData("Sensor 2")?.power || 0}
            sensor={filteredData("Sensor 2")?.name || "Sensor 2"}
            recordedAt={recordTime}
          />
          <AllRealTimeCard
            isLoading={isLoading}
            voltageValue={filteredData("Sensor 3")?.voltage || 0}
            ampereValue={filteredData("Sensor 3")?.current || 0}
            wattValue={filteredData("Sensor 3")?.power || 0}
            sensor={filteredData("Sensor 3")?.name || "Sensor 3"}
            recordedAt={recordTime}
          />
        </div>

        <Separator className="my-4" />
        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl mb-4">
          Consumption Data
        </h2>
        {energyLoading ? (
          <DataTableLoader columns={columns} />
        ) : (
          <DataTable columns={columns} data={energyData?.data} />
        )}
      </div>
    </>
  );
}
