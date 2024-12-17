"use client";

import CurrentCard from "@/components/card/current-card";
import PowerCard from "@/components/card/power-card";
import VoltageCard from "@/components/card/voltage-card";
import Chart from "@/components/chart";
import { ChartConfig } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGraphData from "@/hooks/use-graph-data";
import useRealtime from "@/hooks/use-realtime";
import { Sensor } from "@/types/sensor.type";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const voltageConfig = {
  voltage: {
    label: "Voltage",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const currentConfig = {
  current: {
    label: "Current",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const powerConfig = {
  power: {
    label: "Power",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export default function GraphSensorDetail() {
  const { sensor } = useParams();

  const sensorName = useMemo(() => {
    switch (sensor) {
      case "1":
        return ["Sensor AC", "Sensor 1"];
      case "2":
        return ["Sensor Fan", "Sensor 2"];
      case "3":
        return ["Sensor Charger & Monitor", "Sensor 3"];
      default:
        return ["", ""];
    }
  }, [sensor]);

  const { data: realtimeData, isLoading, recordTime } = useRealtime();

  const {
    data: graphData,
    isLoading: graphLoading,
    filterValue,
    setFilterValue,
  } = useGraphData();

  const filteredData = useMemo(() => {
    return realtimeData.find((item: Sensor) => item.name === sensorName[1]);
  }, [sensorName, realtimeData]);

  return (
    <>
      <div className="container">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl mb-4">
          {sensorName[0]} Data
        </h1>
        <Separator className="my-4" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <VoltageCard
            isLoading={isLoading}
            value={filteredData?.voltage || 0}
            sensor={filteredData?.name || "Sensor 1"}
            recordedAt={recordTime}
          />
          <CurrentCard
            isLoading={isLoading}
            value={filteredData?.current || 0}
            sensor={filteredData?.name || "Sensor 1"}
            recordedAt={recordTime}
          />
          <PowerCard
            isLoading={isLoading}
            value={filteredData?.power || 0}
            sensor={filteredData?.name || "Sensor 1"}
            recordedAt={recordTime}
          />
        </div>
        <Separator className="my-4" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-row-reverse my-4 items-center gap-2">
              <Button variant="outline">Filter</Button>
              <p className="text-sm text-gray-600">
                Current filter: {filterValue}
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" side="bottom" align="end">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={filterValue}
              onValueChange={setFilterValue}
            >
              <DropdownMenuRadioItem value="24 hour">
                24 Hours
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="12 hour">
                12 Hours
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="360 minute">
                6 Hours
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="60 minute">
                1 Hour
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="30 minute">
                30 Minutes
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="300 second">
                5 Minutes
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="grid grid-cols-1 gap-4">
          <Chart
            isLoading={graphLoading}
            title="Voltage"
            data={graphData.filter(
              (data: Sensor) => data.name === sensorName[1]
            )}
            dataKey="voltage"
            config={voltageConfig}
          />
          <Chart
            isLoading={graphLoading}
            title="Current"
            data={graphData.filter(
              (data: Sensor) => data.name === sensorName[1]
            )}
            dataKey="current"
            config={currentConfig}
          />
          <Chart
            isLoading={graphLoading}
            title="Power"
            data={graphData.filter(
              (data: Sensor) => data.name === sensorName[1]
            )}
            dataKey="power"
            config={powerConfig}
          />
        </div>
      </div>
    </>
  );
}
