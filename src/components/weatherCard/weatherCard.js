import React, {useEffect, useState} from "react";
import axios from "axios";

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({lat: null, lon: null});
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      err => {
        setError(err.message);
      }
    );
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      const fetchWeather = async () => {
        try {
          const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast`,
            {
              params: {
                latitude: location.lat,
                longitude: location.lon,
                hourly: "temperature_2m",
                current_weather: true
              }
            }
          );
          setWeather(response.data.current_weather);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchWeather();
    }
  }, [location]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Weather at Your Location</h1>
      <p>Temperature: {weather.temperature} °C</p>
      <p>Weather: {weather.weathercode}</p>
      <p>Wind Speed: {weather.windspeed} km/h</p>
    </div>
  );
};

export default WeatherCard;
