import { useSensorByHour } from "@/services/swr/use-sensor";
import { Sensor } from "@/types/sensor.type";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const useGraphData = () => {
  const [filter, setFilter] = useState<number>(5);
  const [emitter, setEmitter] = useState<string>("5-min-sensor-data");
  const [data, setData] = useState<Sensor[]>([])
  const {data: graphData, isLoading} = useSensorByHour(filter);

  useEffect(() => {
    if (filter === 5) {
      setEmitter("5-min-sensor-data");
    } else if (filter === 15) {
      setEmitter("15-min-sensor-data");
    } else if (filter === 30) {
      setEmitter("30-min-sensor-data");
    } else if (filter === 60) {
      setEmitter("60-min-sensor-data");
    }
  }, [filter]);

  useEffect(() => {
    if (graphData) {
      setData(graphData.data);
    }
  }, [graphData]);
  
  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_API}`);

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on(emitter, (data) => {
      setData(data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      socket.disconnect();
    };
  }, [filter, emitter]);

  return {
    filter,
    setFilter,
    data,
    isLoading,
  };
};

export default useGraphData;
