"use client";

import EnergyCard from "@/components/card/energy-card";
import { Separator } from "@/components/ui/separator";
import { useEnergyDetail } from "@/services/swr/use-energy";
import { useMeasured, usePredicted } from "@/services/swr/use-power";
import { EnergyPayload } from "@/types/prediction.type";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  predicted: {
    label: "Predicted Power",
    color: "hsl(var(--chart-1))",
  },
  measured: {
    label: "Measured Power",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function ConsumptionDetail() {
  const { id } = useParams();
  const queryParams = useSearchParams();
  const [stackedData, setStackedData] = useState<any[]>([]);

  const filter: EnergyPayload = {
    sensor: `Sensor ${queryParams.get("sensor")}`,
    date: queryParams.get("date")!,
  };

  const { data: energyDetail, isLoading: energyLoading } = useEnergyDetail(
    id as string
  );
  const { data: predicted, isLoading: predictedLoading } = usePredicted(filter);
  const { data: measured, isLoading: measuredLoading } = useMeasured(filter);

  useEffect(() => {
    if (!predictedLoading && !measuredLoading && predicted && measured) {
      const mergedData = measured.data.map(
        (measuredItem: any, index: number) => {
          const predictedItem = predicted.data[index]
            ? predicted.data[index]
            : { power: 0 };
          const measuredPower = measuredItem.power;
          const predictedPower = predictedItem.power;

          return {
            created_at: measuredItem.created_at,
            predicted: predictedPower,
            measured: measuredPower,
          };
        }
      );

      setStackedData(mergedData);
    }
  }, [predicted, measured, predictedLoading, measuredLoading]);

  return (
    <>
      <div className="container">
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight lg:text-3xl mb-4">
          Consumption Detail on {queryParams.get("date")}
        </h1>
        <Separator className="my-4" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EnergyCard
            isLoading={energyLoading}
            label="Predicted Energy"
            value={energyDetail?.data.predicted_energy}
            date={filter.date}
            sensor={filter.sensor}
          />
          <EnergyCard
            isLoading={energyLoading}
            label="Calculated Energy"
            value={energyDetail?.data.calculated_energy}
            date={filter.date}
            sensor={filter.sensor}
          />
        </div>
        <Separator className="my-4" />
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>
              <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Power Consumption and Prediction
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {predictedLoading || measuredLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : (
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={stackedData}
                  margin={{
                    left: 12,
                    right: 12,
                    bottom: 40,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="created_at"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    angle={90}
                    textAnchor="start"
                  />
                  <YAxis domain={[0, "auto"]} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Area
                    dataKey="predicted"
                    type="natural"
                    fill="var(--color-predicted)"
                    fillOpacity={0.3}
                    stroke="var(--color-predicted)"
                  />
                  <Area
                    dataKey="measured"
                    type="natural"
                    fill="var(--color-measured)"
                    fillOpacity={0.3}
                    stroke="var(--color-measured)"
                  />
                </AreaChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
