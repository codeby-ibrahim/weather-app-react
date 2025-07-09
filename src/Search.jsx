import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function Search() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "123ab4c304119cfe41e2ee05762bf6be"; // Replace with your actual key

  const getWeatherInfo = async () => {
    try {
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      const jsonResponse = await response.json();

      if (jsonResponse.cod === 200) {
        setWeatherData(jsonResponse);
        setError(null);
      } else {
        setWeatherData(null);
        setError("City not found.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather.");
      setWeatherData(null);
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    getWeatherInfo();
    setCity("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Search for Weather</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br /><br />
        <Button variant="contained" type="submit">Search</Button>
      </form>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData && (
        <Card sx={{ maxWidth: 400, marginTop: 3 }}>
          <CardMedia
            component="img"
            height="200"
            image={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Weather in {weatherData.name}, {weatherData.sys.country}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Temperature:</strong> {weatherData.main.temp} °C<br />
              <strong>Feels Like:</strong> {weatherData.main.feels_like} °C<br />
              <strong>Humidity:</strong> {weatherData.main.humidity} %<br />
              <strong>Condition:</strong> {weatherData.weather[0].description}<br />
              <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => window.location.reload()}>Search Again</Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
}
