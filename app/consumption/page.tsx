"use client";

import { useEnergyList } from "@/services/swr/use-energy";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Prediction } from "@/types/prediction.type";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const { data: energyData, isLoading: energyLoading } = useEnergyList();

  return (
    <>
      <div className="container">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl mb-4">
          Consumption Data
        </h1>
        <Separator className="my-4" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>Sensor Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Predicted Energy</TableHead>
              <TableHead>Calculated Energy</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {energyLoading
              ? [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="h-10 w-[100px] animate-pulse rounded-md bg-muted p-0" />
                    <TableCell className="h-10 animate-pulse rounded-md bg-muted p-0" />
                    <TableCell className="h-10 animate-pulse rounded-md bg-muted p-0" />
                    <TableCell className="h-10 animate-pulse rounded-md bg-muted p-0" />
                    <TableCell className="h-10 animate-pulse rounded-md bg-muted p-0" />
                    <TableCell className="h-10 animate-pulse rounded-md bg-muted p-0" />
                  </TableRow>
                ))
              : energyData?.data.map((item: Prediction, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {new Date(item.date).toLocaleDateString("en-CA")}
                    </TableCell>
                    <TableCell>
                      {item.predicted_energy != null ? (
                        `${Math.abs(item.predicted_energy).toFixed(2)} kWh`
                      ) : (
                        <span className="text-gray-400 italic">
                          Not predicted
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.calculated_energy != null ? (
                        `${Math.abs(item.calculated_energy).toFixed(2)} kWh`
                      ) : (
                        <span className="text-gray-400 italic">
                          Not calculated
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/consumption/detail/${item.id}?sensor=${
                          item.name.split(" ")[1]
                        }&date=${item.date}`}
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
