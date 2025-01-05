import { statusApi } from "@/services/api/status-api";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useToast } from "./use-toast";

const useCalculation = () => {
  const { toast } = useToast();
  const [isCalculating, setIsCalculating] = useState<boolean>(true);

  useEffect(() => {
    statusApi.checkCalculationStatus().then((resp) => {
      setIsCalculating(resp.data.is_calculation_running);
      if (resp.data.is_calculation_running) {
        toast({
          title: "Calculation is running",
          description: "Please wait for calculation result",
        });
      } else {
        toast({
          title: "Calculation is ready",
          description: "You can now make a calculation.",
        });
      }
    });
  }, []);

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_API}`);

    socket.on("connect", () => {
      console.log("Connected to WebSocket server for prediction status");
    });

    socket.on("calculation-status", (data) => {
      setIsCalculating(data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server for prediction status");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    isCalculating,
  };
};

export default useCalculation;
