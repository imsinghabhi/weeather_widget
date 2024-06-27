// src/utils/interfaces.ts

export interface City {
    city: string;
    lat: string;
    lng: string;
    country: string;
    iso2: string;
    admin_name: string;
    capital: string;
    population: string;
    population_proper: string;
  }
  
  export interface WeatherData {
    minTemp: number;
    maxTemp: number;
    weatherCode: number;
  }
  