import React, { useState, useCallback } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Button, SelectChangeEvent } from '@mui/material';
import citiesData from '../utils/citiesData';
import { City } from '../utils/interfaces';

interface CityDropdownProps {
  onSelectCity: (city: City) => void;
}

const CityDropdown = ({ onSelectCity }:CityDropdownProps) => {
  const [selectedCity, setSelectedCity] = useState<string>('');

  const handleCityChange = useCallback((event: SelectChangeEvent<string>) => {
    setSelectedCity(event.target.value as string);
  }, []);

  const handleSubmit = useCallback(() => {
    const city = citiesData.find(city => city.city === selectedCity);
    if (city) {
      onSelectCity(city);
    }
  }, [selectedCity, onSelectCity]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <FormControl fullWidth>
        <InputLabel id="city-label">Select a City</InputLabel>
        <Select
          labelId="city-label"
          id="city"
          onChange={handleCityChange}
          value={selectedCity}
          label="Select a City"
          style={{ marginRight: '10px' }}
        >
          
          {citiesData.map(city => (
            <MenuItem key={city.city} value={city.city}>
              {city.city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Search!
      </Button>
    </div>
  );
};

export default CityDropdown;
