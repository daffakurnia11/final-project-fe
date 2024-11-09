import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Sensor } from "@/types/sensor.type";
import { Skeleton } from "../ui/skeleton";

type Props = {
  title: string;
  dataKey: string;
  data: Sensor[];
  config: ChartConfig;
  isLoading?: boolean;
};

export default function Chart({
  title,
  dataKey,
  data,
  config,
  isLoading,
}: Props) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {title}
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-44 w-full" />
        ) : (
          <ChartContainer config={config}>
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="created_at"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey={dataKey}
                type="linear"
                fill={`var(--color-${dataKey})`}
                fillOpacity={0.4}
                stroke={`var(--color-${dataKey})`}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
