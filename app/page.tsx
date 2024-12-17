"use client";

import CurrentCard from "@/components/card/current-card";
import PowerCard from "@/components/card/power-card";
import VoltageCard from "@/components/card/voltage-card";
import { Separator } from "@/components/ui/separator";
import useRealtime from "@/hooks/use-realtime";
import { Sensor } from "@/types/sensor.type";

export default function Home() {
  const { data, isLoading, recordTime } = useRealtime();

  const filteredData = (name: string) =>
    data.find((item: Sensor) => item.name === name);

  return (
    <>
      <div className="container">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl mb-4">
          Real-time Data
        </h1>
        <Separator className="my-4" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <VoltageCard
            isLoading={isLoading}
            value={filteredData("Sensor 1")?.voltage || 0}
            sensor={filteredData("Sensor 1")?.name || "Sensor 1"}
            recordedAt={recordTime}
          />
          <CurrentCard
            isLoading={isLoading}
            value={filteredData("Sensor 1")?.current || 0}
            sensor={filteredData("Sensor 1")?.name || "Sensor 1"}
            recordedAt={recordTime}
          />
          <PowerCard
            isLoading={isLoading}
            value={filteredData("Sensor 1")?.power || 0}
            sensor={filteredData("Sensor 1")?.name || "Sensor 1"}
            recordedAt={recordTime}
          />
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <VoltageCard
            isLoading={isLoading}
            value={filteredData("Sensor 2")?.voltage || 0}
            sensor={filteredData("Sensor 2")?.name || "Sensor 2"}
            recordedAt={recordTime}
          />
          <CurrentCard
            isLoading={isLoading}
            value={filteredData("Sensor 2")?.current || 0}
            sensor={filteredData("Sensor 2")?.name || "Sensor 2"}
            recordedAt={recordTime}
          />
          <PowerCard
            isLoading={isLoading}
            value={filteredData("Sensor 2")?.power || 0}
            sensor={filteredData("Sensor 2")?.name || "Sensor 2"}
            recordedAt={recordTime}
          />
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <VoltageCard
            isLoading={isLoading}
            value={filteredData("Sensor 3")?.voltage || 0}
            sensor={filteredData("Sensor 3")?.name || "Sensor 3"}
            recordedAt={recordTime}
          />
          <CurrentCard
            isLoading={isLoading}
            value={filteredData("Sensor 3")?.current || 0}
            sensor={filteredData("Sensor 3")?.name || "Sensor 3"}
            recordedAt={recordTime}
          />
          <PowerCard
            isLoading={isLoading}
            value={filteredData("Sensor 3")?.power || 0}
            sensor={filteredData("Sensor 3")?.name || "Sensor 3"}
            recordedAt={recordTime}
          />
        </div>
      </div>
    </>
  );
}
