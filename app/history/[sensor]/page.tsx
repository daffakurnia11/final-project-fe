"use client";

import CurrentCard from "@/components/card/current-card";
import PowerCard from "@/components/card/power-card";
import VoltageCard from "@/components/card/voltage-card";
import Chart from "@/components/chart";
import { ChartConfig } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
        return "Sensor 1";
      case "2":
        return "Sensor 2";
      case "3":
        return "Sensor 3";
    }
  }, [sensor]);

  const { data: realtimeData, isLoading, recordTime } = useRealtime();

  const {
    data: graphData,
    isLoading: graphLoading,
    filter,
    setFilter,
  } = useGraphData();

  const filteredData = useMemo(() => {
    return realtimeData.find((item: Sensor) => item.name === sensorName);
  }, [sensorName, realtimeData]);

  return (
    <>
      <div className="container">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl mb-4">
          {sensorName} Data
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
        <div className="flex md:flex-row flex-col items-center gap-3 mb-4 ms-auto w-fit">
          <p>Filter</p>
          <div className="w-fit">
            <ToggleGroup
              type="single"
              variant="outline"
              defaultValue={filter.toString()}
              onValueChange={(value) => setFilter(Number(value))}
            >
              <ToggleGroupItem value="60">1 Hour</ToggleGroupItem>
              <ToggleGroupItem value="30">30 Minutes</ToggleGroupItem>
              <ToggleGroupItem value="15">15 Minutes</ToggleGroupItem>
              <ToggleGroupItem value="5">5 Minutes</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Chart
            isLoading={graphLoading}
            title="Voltage"
            data={graphData.filter((data: Sensor) => data.name === sensorName)}
            dataKey="voltage"
            config={voltageConfig}
          />
          <Chart
            isLoading={graphLoading}
            title="Current"
            data={graphData.filter((data: Sensor) => data.name === sensorName)}
            dataKey="current"
            config={currentConfig}
          />
          <Chart
            isLoading={graphLoading}
            title="Power"
            data={graphData.filter((data: Sensor) => data.name === sensorName)}
            dataKey="power"
            config={powerConfig}
          />
        </div>
      </div>
    </>
  );
}
