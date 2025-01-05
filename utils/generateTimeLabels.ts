// Helper function to generate time labels based on the total data points
export const generatePowerPredictionData = (data: number[]) => {
  if (!data) {
    return [];
  }
  
  const result: { power: number, created_at: string}[] = [];
  const totalSecondsInDay = 86400; // 24 hours * 60 minutes * 60 seconds = 86400 seconds in a full day
  const timeInterval = totalSecondsInDay / data.length; // Calculate the interval for each data point

  // Generate time labels based on the time interval (in seconds)
  for (let i = 0; i < data.length; i++) {
    const totalSeconds = i * timeInterval;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    // Format the time label as HH:MM:SS
    const timeLabel = `${String(
      hours
    ).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    result.push({power: data[i], created_at: timeLabel});
  }
  return result;
};