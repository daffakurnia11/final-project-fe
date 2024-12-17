import { useSensorByHour } from "@/services/swr/use-sensor";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const useGraphData = () => {
  const [filterValue, setFilterValue] = useState<string>("300 second");
  const { data: graphData, isLoading, mutate } = useSensorByHour(filterValue);

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_API}`);

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("update-data", (data) => {
      if (data.status) {
        mutate();
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    filterValue,
    setFilterValue,
    data: graphData?.data || [],
    isLoading,
  };
};

export default useGraphData;
