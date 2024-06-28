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
     
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1`;
      const response = await axios.get(url);
      const weather = response.data.daily;

      setWeatherData({
        minTemp: weather.temperature_2m_min[0],
        maxTemp: weather.temperature_2m_max[0],
        weatherCode: weather.weather_code[0],
      });
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, []);
  

 
  useEffect(() => {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
      const city = JSON.parse(savedCity) as City;
      setSelectedCity(city);
    }
  }, []);


  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity);
      localStorage.setItem('selectedCity', JSON.stringify(selectedCity));
    }
  }, [selectedCity]);

  
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedCity) {
        fetchWeatherData(selectedCity);
      }
    }, 1000); 

    return () => clearInterval(interval); 
  }, [selectedCity]);

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
