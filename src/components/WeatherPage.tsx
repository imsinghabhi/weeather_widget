// src/App.tsx

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CityDropdown from './CityDropdown';
import WeatherDisplay from './WeatherDisplay';
import { City, WeatherData } from '../utils/interfaces';
import { Container, Typography } from '@mui/material';

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);


  const fetchWeatherData = useCallback(async (city: City) => {
    try {
      // Manually constructing the URL with query parameters
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1`;
  
      // Making the GET request
      const response = await axios.get(url);
  
      // Extracting data
      const weather = response.data.daily;
  
      // Finding minimum and maximum temperatures from the arrays
      
  
      // Setting the state with the fetched weather data
      setWeatherData({
        minTemp: weather.temperature_2m_min[0],
        maxTemp: weather.temperature_2m_max[0],
        weatherCode: weather.weather_code[0],
      });
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, []);
  

 
//   useEffect(() => {
//     const savedCity = localStorage.getItem('selectedCity');
//     if (savedCity) {
//       const city = JSON.parse(savedCity) as City;
//       setSelectedCity(city);
//       fetchWeatherData(city);
//     }
//   }, [fetchWeatherData]);

  // Fetch weather data and save the selected city to local storage whenever it changes
  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity);
      localStorage.setItem('selectedCity', JSON.stringify(selectedCity));
    }
  }, [selectedCity, fetchWeatherData]);

  // Set up an interval to refresh the weather data every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedCity) {
        fetchWeatherData(selectedCity);
      }
    }, 600000); // 10 minutes in milliseconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [selectedCity, fetchWeatherData]);

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Weather Widget
      </Typography>
      <CityDropdown onSelectCity={setSelectedCity} />
      <WeatherDisplay weatherData={weatherData} />
    </Container>
  );
};

export default WeatherPage;
