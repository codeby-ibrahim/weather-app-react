import React, { useState } from 'react';
import './Weatherapp.css';  

import {
  TextField,
  Button,
  Card, 
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Paper,
} from '@mui/material';

export default function Search() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const API_KEY = '123ab4c304119cfe41e2ee05762bf6be';

  const getWeatherInfo = async () => {
    try {
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      const jsonResponse = await response.json();

      if (jsonResponse.cod === 200) {
        setWeatherData(jsonResponse);
        setError(null);
      } else {
        setWeatherData(null);
        setError('City not found.');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather.');
      setWeatherData(null);
    }
  };

  const handleChange = (e) => setCity(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    getWeatherInfo();
    setCity('');
  };

  return (
    <>
    <div className="box">
    <Container maxWidth="sm" className="container">
      {/* Ad Banner */}
      <Paper elevation={3} className="ad-banner">
        <Typography variant="h6" color="primary">
          🌍 WeatherPro+ Sponsored
        </Typography>
        <Typography variant="body2">Place your ad here — boost your brand!</Typography>
      </Paper>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="form-container">
        <Typography variant="h4" color="primary">
          Weather Checker
        </Typography>
        <TextField
          id="city"
          label="Enter City Name"
          variant="outlined"
          fullWidth
          required
          value={city}
          onChange={handleChange}
        />
        <Button variant="contained" size="large" type="submit">
          Search
        </Button>
        {error && <span className="error-text">{error}</span>}
      </form>

      {/* Weather Card */}
      {weatherData && (
        <Card className="weather-card">
          <CardMedia
            component="img"
            height="200"
            image={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
            alt={weatherData.weather[0].description}
            className="weather-icon"
          />
          <CardContent>
            <Typography variant="h5">
              {weatherData.name}, {weatherData.sys.country}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Temperature:</strong> {weatherData.main.temp} °C<br />
              <strong>Feels Like:</strong> {weatherData.main.feels_like} °C<br />
              <strong>Humidity:</strong> {weatherData.main.humidity} %<br />
              <strong>Weather:</strong> {weatherData.weather[0].description}<br />
              <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => window.location.reload()}>
              🔁 Search Again
            </Button>
          </CardActions>
        </Card>
      )}
    </Container>
    </div>
    </>
  );
}
