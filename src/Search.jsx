import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Search() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "123ab4c304119cfe41e2ee05762bf6be";

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
      <h2 className="search">Search for Weather</h2>
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
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
          <h3>Weather in {weatherData.name}, {weatherData.sys.country}</h3>
          <p><strong>Temperature:</strong> {weatherData.main.temp} °C</p>
          <p><strong>Feels Like:</strong> {weatherData.main.feels_like} °C</p>
          <p><strong>Humidity:</strong> {weatherData.main.humidity} %</p>
          <p><strong>Weather:</strong> {weatherData.weather[0].description}</p>
          <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}