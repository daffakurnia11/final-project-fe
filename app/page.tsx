"use client";

import CurrentCard from "@/components/card/current-card";
import PowerCard from "@/components/card/power-card";
import VoltageCard from "@/components/card/voltage-card";
import { Separator } from "@/components/ui/separator";
import useWebsocket from "@/hooks/use-websocket";

export default function Home() {
  const { isLoading, firstSensor, secondSensor, thirdSensor, recordTime } =
    useWebsocket();

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
            value={firstSensor?.voltage || 0}
            sensor={firstSensor?.name || "Sensor 1"}
            recordedAt={recordTime}
          />
          <CurrentCard
            isLoading={isLoading}
            value={firstSensor?.current || 0}
            sensor={firstSensor?.name || "Sensor 1"}
            recordedAt={recordTime}
          />
          <PowerCard
            isLoading={isLoading}
            value={firstSensor?.power || 0}
            sensor={firstSensor?.name || "Sensor 1"}
            recordedAt={recordTime}
          />
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <VoltageCard
            isLoading={isLoading}
            value={secondSensor?.voltage || 0}
            sensor={secondSensor?.name || "Sensor 2"}
            recordedAt={recordTime}
          />
          <CurrentCard
            isLoading={isLoading}
            value={secondSensor?.current || 0}
            sensor={secondSensor?.name || "Sensor 2"}
            recordedAt={recordTime}
          />
          <PowerCard
            isLoading={isLoading}
            value={secondSensor?.power || 0}
            sensor={secondSensor?.name || "Sensor 2"}
            recordedAt={recordTime}
          />
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <VoltageCard
            isLoading={isLoading}
            value={thirdSensor?.voltage || 0}
            sensor={thirdSensor?.name || "Sensor 3"}
            recordedAt={recordTime}
          />
          <CurrentCard
            isLoading={isLoading}
            value={thirdSensor?.current || 0}
            sensor={thirdSensor?.name || "Sensor 3"}
            recordedAt={recordTime}
          />
          <PowerCard
            isLoading={isLoading}
            value={thirdSensor?.power || 0}
            sensor={thirdSensor?.name || "Sensor 3"}
            recordedAt={recordTime}
          />
        </div>
      </div>
    </>
  );
}
