import { useSensorLatest } from "@/services/swr/use-sensor";
import { Sensor } from "@/types/sensor.type";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const useRealtime = () => {
  const [data, setData] = useState<Sensor[]>([]);
  const { data: latestData, isLoading } = useSensorLatest();

  useEffect(() => {
    if (latestData) {
      setData(latestData.data);
    }
  }, [latestData]);
  
  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_API}`);

    socket.on("connect", () => {
      console.log("Connected to WebSocket server for realtime data");
    });

    socket.on("realtime-sensor-data", (data) => {
      setData(data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server for realtime data");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    isLoading,
    data,
    recordTime: data.length > 0 ? new Date(data[0].created_at).toLocaleString() : '',
  };
};

export default useRealtime;
