import { Sensor } from "@/types/sensor.type";
import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const useWebsocket = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sensorData, setSensorData] = useState<Sensor[]>([]);
  const [recordTime, setRecordTime] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BASEURL_API}/api/v1/sensors`)
      .then((response) => {
        setIsLoading(false);
        const recordTime = new Date(
          response.data.data[0].created_at
        ).toLocaleString();
        setRecordTime(recordTime);
        setSensorData(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching sensor data:", error);
      });
  }, []);

  useEffect(() => {
    // Replace with your WebSocket server URL
    const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_API);

    // Connect to WebSocket server
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    // Handle receiving real-time sensor data
    socket.on("sensor-data-current", (data) => {
      console.log("Real-time current data received:", data);

      // Update recordTime
      const recordTime = new Date(data[0].created_at).toLocaleString();
      setRecordTime(recordTime);

      // Update sensor data
      setSensorData(data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    // Cleanup WebSocket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    isLoading,
    firstSensor: sensorData.find((sensor) => sensor.name === "Sensor 1"),
    secondSensor: sensorData.find((sensor) => sensor.name === "Sensor 2"),
    thirdSensor: sensorData.find((sensor) => sensor.name === "Sensor 3"),
    recordTime,
  };
};

export default useWebsocket;
