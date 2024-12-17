"use client";

import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { usePredictionDetail } from "@/services/swr/use-prediction";
import { Skeleton } from "@/components/ui/skeleton";
import Chart from "@/components/chart";
import { generatePowerPredictionData } from "@/utils/generateTimeLabels";

export default function GraphSensorDetail() {
  const { id } = useParams();

  const { data, isLoading } = usePredictionDetail(id as string);

  return (
    <>
      <div className="container">
        {isLoading ? (
          <Skeleton className="h-9 w-[450px] border-b pb-2 tracking-tight" />
        ) : (
          <h1 className="scroll-m-20 text-xl font-semibold tracking-tight lg:text-3xl mb-4">
            Prediction Detail on{" "}
            {new Date(data?.data.prediction_date).toLocaleDateString("en-CA")}
          </h1>
        )}
        <Separator className="my-4" />
        <Chart
          config={{
            poweR: {
              label: "Power",
              color: "hsl(var(--chart-1))",
            },
          }}
          dataKey="power"
          title="Power Prediction"
          data={generatePowerPredictionData(data?.data.prediction_data)}
        />
      </div>
    </>
  );
}
