import React from "react";
import "./HourlyWeather.css";
import { FaTemperatureHigh, FaTint, FaWind, FaCompass } from "react-icons/fa";

const HourlyWeather = ({ data, weatherInfo }) => {
  if (!data) return null;

  const getCompassDirection = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((degrees % 360) / 45) % 8;
    return directions[index];
  };

  return (
    <div className="hourly-weather-card">
      <div className="hourly-weather-card-header">
        {`${data.hour}:00`}
      </div>
      <img
        src={weatherInfo?.image}
        alt={weatherInfo?.description}
        className="hourly-weather-icon"
      />
      <p className="hourly-weather-description">
        {weatherInfo?.description || "N/A"}
      </p>
      <div className="hourly-weather-card-content">
        <p>
          <FaTemperatureHigh className="weather-icon-small" /> {data.temperature}°C{" "} 
          <span className="temp-low">(RealFeel: {data.apparent_temperature}°C)</span>
        </p>
        <p>
          <FaTint className="weather-icon-small" /> {data.humidity}% Humidity
        </p>
        <p>
          <FaWind className="weather-icon-small wind-speed" /> {data.wind_speed} km/h
        </p>
        <p>
          <FaCompass className="weather-icon-small wind-direction" /> {getCompassDirection(data.wind_direction)}{" "}
          ({data.wind_direction}°)
        </p>
      </div>
      <div className="hourly-weather-card-footer">
        Precipitation: <span className="precipitation">{data.precipitation} mm</span>
      </div>
    </div>
  );
};

export default HourlyWeather;
