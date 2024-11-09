import CurrentCard from "@/components/card/current-card";
import PowerCard from "@/components/card/power-card";
import VoltageCard from "@/components/card/voltage-card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <div className="container">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl mb-4">
          Real-time Data
        </h1>
        <Separator className="my-4" />

        <div className="grid grid-cols-3 gap-4 mb-8">
          <VoltageCard value={220} sensor="Sensor 1" recordedAt="Now" />
          <CurrentCard value={220} sensor="Sensor 1" recordedAt="Now" />
          <PowerCard value={220} sensor="Sensor 1" recordedAt="Now" />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <VoltageCard value={220} sensor="Sensor 2" recordedAt="Now" />
          <CurrentCard value={220} sensor="Sensor 2" recordedAt="Now" />
          <PowerCard value={220} sensor="Sensor 2" recordedAt="Now" />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <VoltageCard value={220} sensor="Sensor 3" recordedAt="Now" />
          <CurrentCard value={220} sensor="Sensor 3" recordedAt="Now" />
          <PowerCard value={220} sensor="Sensor 3" recordedAt="Now" />
        </div>
      </div>
    </>
  );
}
