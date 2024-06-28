// src/components/WeatherDisplay.tsx

import React, { useMemo } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { WeatherData } from '../utils/interfaces';

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
}

const WeatherDisplay = ({ weatherData }:WeatherDisplayProps) => {
  const averageTemp = useMemo(() => {
    if (weatherData) {
      return (weatherData.minTemp + weatherData.maxTemp) / 2;
    }
    return null;
  }, [weatherData]);

  if (!weatherData) {
    return <p>Select a city to see the weather information.</p>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Weather Information</Typography>
        <Typography>Weather Code: {weatherData.weatherCode}</Typography>
        <Typography>Min Temperature: {weatherData.minTemp}°C</Typography>
        <Typography>Max Temperature: {weatherData.maxTemp}°C</Typography>
        {averageTemp !== null && <Typography>Average Temperature: {averageTemp}°C</Typography>}
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
