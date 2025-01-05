import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Skeleton } from "../ui/skeleton";

type Props = {
  title: string;
  dataKey: string;
  data: Record<string, string | number>[];
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
  const isTimeFormat = (value: string) => {
    const timeFormat = /^\d{2}:\d{2}:\d{2}$/;
    return timeFormat.test(value);
  };

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
          <Skeleton className="h-80 w-full" />
        ) : (
          <ChartContainer config={config} className="h-80 w-full">
            <AreaChart
              accessibilityLayer
              data={data}
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
                tickFormatter={(value) => {
                  if (isTimeFormat(value)) {
                    return value;
                  }

                  const date = new Date(value);
                  const hours = date.getHours().toString().padStart(2, "0");
                  const minutes = date.getMinutes().toString().padStart(2, "0");
                  const seconds = date.getSeconds().toString().padStart(2, "0");
                  return `${hours}:${minutes}:${seconds}`;
                }}
                angle={90}
                textAnchor="start"
              />
              <YAxis domain={[0, "auto"]} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
                labelFormatter={(value) => {
                  if (isTimeFormat(value)) {
                    return value;
                  }
                  return new Date(value).toLocaleString();
                }}
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
