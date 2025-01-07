"use client";

import { useEnergyList } from "@/services/swr/use-energy";
import { EnergyType } from "@/types/prediction.type";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import DataTable, { DataTableLoader } from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";

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
  const { data, isLoading } = useEnergyList();

  return (
    <>
      <div className="container">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl mb-4">
          Consumption Data
        </h1>
        <Separator className="my-4" />
        {isLoading ? (
          <DataTableLoader columns={columns} />
        ) : (
          <DataTable columns={columns} data={data?.data} />
        )}
      </div>
    </>
  );
}
