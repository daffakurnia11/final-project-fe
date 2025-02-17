import { statusApi } from "@/services/api/status-api";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useToast } from "./use-toast";

const usePrediction = () => {
  const { toast } = useToast();
  const [isPredicting, setIsPredicting] = useState(false);

  useEffect(() => {
    statusApi.checkPredictionStatus().then((resp) => {
      setIsPredicting(resp.data.is_prediction_running);
      if (resp.data.is_prediction_running) {
        toast({
          title: "Prediction is running",
          description: "Please wait for prediction result",
        });
      } else {
        toast({
          title: "Prediction is ready",
          description: "You can now make a prediction.",
        });
      }
    });
  }, []);

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
  }, []);

  return {
    isPredicting,
  };
};

export default usePrediction;
