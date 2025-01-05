"use client";

// import usePrediction from "@/hooks/use-prediction";
// import { useToast } from "@/hooks/use-toast";
// import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function ClientProvider({ children }: Props) {
  // const { isPredicting } = usePrediction();
  // const { toast } = useToast();

  // useEffect(() => {
  //   if (isPredicting) {
  //     toast({
  //       title: "Predicting..",
  //       description: "Please wait for prediction result",
  //     });
  //   }
  // }, [isPredicting]);

  return children;
}
