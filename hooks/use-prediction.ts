import { usePredictionStatus } from "@/services/swr/use-prediction";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const usePrediction = () => {
  const [isPredicting, setIsPredicting] = useState(false);
  const { data: statusData } = usePredictionStatus();

  useEffect(() => {
    if (statusData && statusData.data) {
      setIsPredicting(statusData.data.is_prediction_running);
    }
  }, [statusData]);

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_API}`);

    socket.on("connect", () => {
      console.log("Connected to WebSocket server for prediction status");
    });

    socket.on("prediction-status", (data) => {
      setIsPredicting(data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server for prediction status");
    });

    return () => {
      socket.disconnect();
    };
  }, [statusData]);

  return {
    isPredicting,
  };
};

export default usePrediction;
